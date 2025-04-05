import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cliente: Cliente;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private toastController: ToastController, private navController: NavController) { 
    this.cliente = new Cliente();    
    this.formGroup = this.formBuilder.group({ 
      'email': [this.cliente.email, Validators.compose([Validators.required])],
      'senha': [this.cliente.senha, Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.clienteService.encerrarAutenticacao();
  }

  autenticar(){   
    let email = this.formGroup.value.email;
    let senha = this.formGroup.value.senha;
    this.cliente = this.clienteService.autenticar(email, senha);

    if(this.cliente === undefined){
      this.exibirMensagem('Email e/ou senha inválidos!!!')
    }else{
      this.clienteService.registrarAutenticacao(this.cliente.id);
      this.navController.navigateBack('/tabs')
    }
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

}
