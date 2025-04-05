import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { CepService } from 'src/app/services/cep.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  canDismiss = true;
  page: any;
  cliente: Cliente;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cepService: CepService, private clienteService: ClienteService, private toastController: ToastController, private navController: NavController) {
    this.cliente = new Cliente();
    this.formGroup = this.formBuilder.group({
      'email': [this.cliente.email, Validators.compose([Validators.required, Validators.email])],
      'senha': [this.cliente.senha, Validators.compose([Validators.required])],
      'nome': [this.cliente.nome, Validators.compose([Validators.required])],
      'cep': ['', Validators.compose([Validators.required])],
      'bairro': [{ value: '', disabled: true }],
      'numero': [this.cliente.endereco.numero, Validators.compose([Validators.required])],
      'logradouro': [{ value: '', disabled: true }],
      'cidade': [{ value: '', disabled: true }],
      'uf': [{ value: '', disabled: true }]
    })
  }

  ngOnInit() {
    this.cliente = this.clienteService.buscarPorId(this.clienteService.recuperarAutenticacao());
    this.formGroup.get('nome')?.setValue(this.cliente.nome);
    this.formGroup.get('email')?.setValue(this.cliente.email);
    this.formGroup.get('senha')?.setValue(this.cliente.senha);
    this.formGroup.get('cep')?.setValue(this.cliente.endereco.cep);
    this.formGroup.get('bairro')?.setValue(this.cliente.endereco.bairro);
    this.formGroup.get('numero')?.setValue(this.cliente.endereco.numero);
    this.formGroup.get('logradouro')?.setValue(this.cliente.endereco.logradouro);
    this.formGroup.get('cidade')?.setValue(this.cliente.endereco.cidade);
    this.formGroup.get('uf')?.setValue(this.cliente.endereco.uf);
  }
}
