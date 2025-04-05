import { Injectable } from '@angular/core';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  gerarId(item: Item): number {
    if (item.id === 0) {
      return (new Date().getTime() / 1000) * Math.random();
    } 
    return 0;
  }
}
