import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { Item } from 'src/app/model/item';
import { Produto } from 'src/app/model/produto';
import { ClienteService } from 'src/app/services/cliente.service';
import { ItemService } from 'src/app/services/item.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  produto: Produto;
  formGroup: FormGroup;
  quantidade: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private itemService: ItemService,
    private clienteService: ClienteService
  ) {
    this.produto = new Produto();
    this.formGroup = this.formBuilder.group({
      'nome': [{ value: this.produto.nome, disabled: true }, Validators.required],
      'descricao': [{ value: this.produto.descricao, disabled: true }, Validators.required],
      'preco': [{ value: this.produto.preco, disabled: true }, Validators.required],
      'quantidade': [this.quantidade, Validators.compose([Validators.required, Validators.min(1)])]
    });
  }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.produto = this.produtoService.buscarPorId(id);
      this.formGroup.get('nome')?.setValue(this.produto.nome);
      this.formGroup.get('descricao')?.setValue(this.produto.descricao);
      this.formGroup.get('preco')?.setValue(this.produto.preco);
    }
  }

  incrementar() {
    this.quantidade++;
    this.formGroup.get('quantidade')?.setValue(this.quantidade);
  }

  decrementar() {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.formGroup.get('quantidade')?.setValue(this.quantidade);
    }
  }

  valorTotal() {
    return this.quantidade * this.produto.preco;
  }

  adicionarASacola() {
    let item = new Item();

    if (!this.clienteService.isProdutoSacola(this.produto)) {
      item.produto.id = this.produto.id;
      item.produto.nome = this.produto.nome;
      item.produto.descricao = this.produto.descricao;
      item.produto.preco = this.produto.preco;
      item.quantidade = this.formGroup.value.quantidade;
      item.id = this.itemService.gerarId(item);

      this.clienteService.adiocionarItemASacola(item);
    } else {
      this.clienteService.adicionarQuantidadeProduto(this.quantidade, this.produto);
    }

    this.exibirMensagem('O item foi adicionado à sacola');
    this.navController.navigateBack('/tabs/produtos');
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
}
