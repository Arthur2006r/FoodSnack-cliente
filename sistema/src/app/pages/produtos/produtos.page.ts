import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: Produto[];

  constructor(private produtoservice: ProdutoService, private toastController: ToastController) { 
    this.produtos = [];
  }

  ngOnInit() {
    this.produtos = this.produtoservice.listar();
  }

  ionViewWillEnter(){
    this.produtos = this.produtoservice.listar();
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
