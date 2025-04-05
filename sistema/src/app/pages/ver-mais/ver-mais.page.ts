import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-ver-mais',
  templateUrl: './ver-mais.page.html',
  styleUrls: ['./ver-mais.page.scss'],
})
export class VerMaisPage implements OnInit {
  tipoPag: string;
  produtos: Produto[];

  constructor(private produtoservice: ProdutoService, private activatedRoute: ActivatedRoute) {
    this.produtos = [];
    this.tipoPag = "";
  }

  ngOnInit() {
    let tipo = this.activatedRoute.snapshot.params['tipo'];

    if (typeof tipo === 'string') {
      this.tipoPag = tipo;
      this.produtos = this.produtoservice.listarPorTipo(tipo);
    } else {
      this.tipoPag = "Todos produtos";
      this.produtos = this.produtoservice.listar();
    }
  }

  ionViewWillEnter() {
    let tipo = this.activatedRoute.snapshot.params['tipo'];

    if (typeof tipo === 'string') {
      if (tipo !== 'todos') {
        this.produtos = this.produtoservice.listarPorTipo(tipo);
      }
    } else {
      this.produtos = this.produtoservice.listar();
    }
  }
}
