import { Cliente } from "./cliente";
import { Sacola } from "./sacola";

export class Pedido {
    id: number;
    valor: number;
    sacola: Sacola;
    cpf: string;

    constructor() {
        this.id = 0;
        this.valor = 0; 
        this.sacola = new Sacola();   
        this.cpf = "";
    }
}
