import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { CepService } from 'src/app/services/cep.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  cliente: Cliente;
  emailInvalido: boolean;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cepService: CepService, private clienteService: ClienteService, private toastController: ToastController, private navController: NavController) {
    this.emailInvalido = false;
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

  salvar() {
    this.cliente.nome = this.formGroup.value.nome;
    this.cliente.senha = this.formGroup.value.senha;

    this.emailInvalido = this.clienteService.verificarEmail(this.cliente);

    if (!this.emailInvalido) {
      this.clienteService.salvar(this.cliente);

      this.exibirMensagem('Dados atualizados com sucesso!!!')
      this.navController.navigateBack('/inicio')
    }
  }

  buscarEndereco() {
    const cep = this.formGroup.value.cep;
    if (cep) {
      this.cepService.buscarCep(cep).subscribe(
        data => {
          if (data) {
            console.log(data);
            this.formGroup.patchValue({
              bairro: data.bairro,
              logradouro: data.logradouro,
              cidade: data.localidade,
              uf: data.uf
            });
          }
        },
        error => {
          this.exibirMensagem('CEP não encontrado');
        }
      );
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
