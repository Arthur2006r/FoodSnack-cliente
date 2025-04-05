import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  menu = [
    { titulo: "Editar Perfil", rota: "/editar-perfil", icone: "person-circle", cor: "primary" },
    { titulo: 'Deslogar', rota: '/login', icone: 'create', cor: "danger" }
  ]

  constructor() { }

  ngOnInit() {
  }

}
