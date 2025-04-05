import { Produto } from "./produto";

export class Item {
    id: number;
    produto: Produto;
    quantidade: number;

    constructor() {
        this.id = 0;
        this.produto = new Produto();
        this.quantidade = 0;
    }
}
