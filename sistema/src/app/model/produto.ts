export class Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo: string;

    constructor() {
        this.id = 0;
        this.nome = "";
        this.descricao = "";
        this.preco = 0;
        this.tipo = "";
    }
}
