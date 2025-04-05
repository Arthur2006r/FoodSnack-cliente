export class Endereco {
    id: number;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    uf: string;

    constructor() {
        this.id = 0;
        this.cep = "";
        this.logradouro = "";
        this.numero = 0;
        this.bairro = "";
        this.cidade = "";
        this.uf = "";
    }
}
