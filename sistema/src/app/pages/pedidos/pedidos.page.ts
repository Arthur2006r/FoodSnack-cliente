import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/model/pedido';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: Pedido[];

  constructor(private clienteService: ClienteService, private toastController: ToastController) { 
    this.pedidos = [];
  }

  ngOnInit() {
    this.pedidos = this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao()).pedidos;
  }

  ionViewWillEnter(){
    this.pedidos = this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao()).pedidos;
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

}
