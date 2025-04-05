import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  salvar(cliente: Cliente): Cliente {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    if (cliente.id === 0) {
      cliente.id = (new Date().getTime() / 1000) * Math.random();
      clientes.push(cliente);
    } else {
      let posicao = clientes.findIndex((temp: Cliente) => temp.id === cliente.id);
      clientes[posicao] = cliente;
    }
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return cliente;
  }

  listar(): Cliente[] {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    return clientes;
  }

  buscarPorId(id: number): Cliente {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    let cliente = new Cliente();
    cliente = clientes.find((temp: Cliente) => temp.id === id);
    return cliente;
  }

  excluir(id: number): Cliente[] {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    clientes = clientes.filter((temp: Cliente) => temp.id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return clientes;
  }

  verificarEmail(cliente: Cliente): boolean {
    let resultado = false;
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    let posicao = clientes.findIndex((temp: Cliente) => temp.email === cliente.email && temp.id !== cliente.id);
    if (posicao >= 0) {
      resultado = true;
    }
    return resultado;
  }

  adiocionarPedido(pedido: Pedido) {
    let cliente = this.buscarPorId(this.recuperarAutenticacao());
    cliente.pedidos.push(pedido);

    this.salvar(cliente);
  }

  adiocionarItemASacola(item: Item) {
    let cliente = this.buscarPorId(this.recuperarAutenticacao());
    cliente.sacola.itens.push(item);

    this.salvar(cliente);
  }

  excluirItemDaSacola(id: number) {
    let cliente = this.buscarPorId(this.recuperarAutenticacao());

    const itemIndice = cliente.sacola.itens.findIndex((item: any) => item.id === id);
    if (itemIndice > -1) {
      cliente.sacola.itens.splice(itemIndice, 1);
    }

    this.salvar(cliente);
  }

  isProdutoSacola(produto: Produto): boolean {
    let resultado = false;
    let cliente = this.buscarPorId(this.recuperarAutenticacao());
    let posicao = cliente.sacola.itens.findIndex((temp: Item,) => temp.produto.id === produto.id);
    if (posicao >= 0) {
      resultado = true;
    }
    return resultado;
  }

  adicionarQuantidadeProduto(quantidade: number, produto: Produto) {
    let cliente = this.buscarPorId(this.recuperarAutenticacao());
    let posicao = cliente.sacola.itens.findIndex((temp: Item) => temp.produto.id === produto.id);
    cliente.sacola.itens[posicao].quantidade += quantidade;

    this.salvar(cliente);
  }

  limparSacola() {
    let cliente = this.buscarPorId(this.recuperarAutenticacao());

    cliente.sacola.itens = [];

    this.salvar(cliente);
  }

  autenticar(email: string, senha: string): Cliente {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    let cliente = new Cliente();
    cliente = clientes.find((temp: Cliente) => temp.email === email && temp.senha === senha);
    return cliente;
  }

  registrarAutenticacao(id: number) {
    localStorage.setItem('clienteAutenticado', JSON.stringify(id));
  }

  recuperarAutenticacao(): number {
    let id = 0;
    id = JSON.parse(localStorage.getItem('clienteAutenticado') || "{}");
    return id;
  }

  encerrarAutenticacao() {
    localStorage.removeItem('clienteAutenticado');
  }
}
