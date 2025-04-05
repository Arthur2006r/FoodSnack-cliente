import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { Item } from 'src/app/model/item';
import { Pedido } from 'src/app/model/pedido';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.page.html',
  styleUrls: ['./sacola.page.scss'],
})
export class SacolaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  canDismiss = true; 
  page: any;

  cliente: Cliente;
  itens: Item[];

  formGroup: FormGroup;

  constructor(private toastController: ToastController, private alertController: AlertController, private clienteService: ClienteService, private navController: NavController, private formBuilder: FormBuilder, private pedidoService: PedidoService) {
    this.itens = [];
    this.cliente = this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao());
    this.formGroup = this.formBuilder.group({
      'cpf': [null, Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.itens = this.cliente.sacola.itens;
  }

  ionViewWillEnter() {
    this.itens = this.cliente.sacola.itens;
  }

  incrementar(item: Item) {
    item.quantidade += 1;
    this.atualizarCliente();
  }

  decrementar(item: Item) {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this.atualizarCliente();
    }
  }

  async excluir(item: Item) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: item.produto.nome,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.clienteService.excluirItemDaSacola(item.id)
            this.exibirMensagem('Item excluído da sacola!');
          }
        }
      ]
    });
    await alert.present();
  }

  limparSacola() {
    this.clienteService.limparSacola();
    this.exibirMensagem('Sacola limpa!');
  }

  finalizarPedido() {
    let pedido = new Pedido();
    pedido.id = this.pedidoService.gerarId();
    pedido.cpf = this.formGroup.value.cpf;
    pedido.sacola = this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao()).sacola;
    pedido.valor = this.pedidoService.calcularValor(this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao()).sacola);

    this.clienteService.adiocionarPedido(pedido);
    this.clienteService.limparSacola();

    this.exibirMensagem('Pedido feito com sucesso!')
    this.modal.dismiss()
    this.navController.navigateBack('/tabs/pedidos')
  }

  async atualizarCliente() {
    this.clienteService.salvar(this.cliente);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
