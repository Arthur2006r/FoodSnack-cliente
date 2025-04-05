import { Endereco } from "./endereco";
import { Pedido } from "./pedido";
import { Sacola } from "./sacola";

export class Cliente {
    id: number;
    email: string;
    senha: string;
    nome: string;
    endereco: Endereco;
    pedidos: Pedido[];
    sacola: Sacola;

    constructor() {
        this.id = 0;
        this.email = "";
        this.senha = "";
        this.nome = "";
        this.endereco = new Endereco();
        this.pedidos = [];
        this.sacola = new Sacola();
    }
}
