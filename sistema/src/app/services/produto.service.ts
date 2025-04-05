import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  listar(): Produto[] {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    return produtos;
  }

  buscarPorId(id: number): Produto {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    let produto = new Produto();
    produto = produtos.find((temp: Produto) => temp.id === id);
    return produto;
  }

  listarPorTipo(tipo: string): Produto[] {
    let produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || '[]');
    let produtosFiltrados: Produto[] = produtos.filter((produto: Produto) => produto.tipo === tipo);
    return produtosFiltrados;
  }
}
