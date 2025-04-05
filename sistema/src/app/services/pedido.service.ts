import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Sacola } from '../model/sacola';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  gerarId(): number {
    return (new Date().getTime() / 1000) * Math.random();
  }

  calcularValor(sacola: Sacola): number {
    let total = 0;
    sacola.itens.forEach((item: Item) => {
      total += item.produto.preco * item.quantidade;
    });
    return total;
  }
}
