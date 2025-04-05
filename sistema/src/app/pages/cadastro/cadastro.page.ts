import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cliente: Cliente;
  formGroup: FormGroup;
  emailInvalido: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastController: ToastController,
    private navController: NavController,
    private cepService: CepService
  ) {
    this.emailInvalido = false;
    this.cliente = new Cliente();
    this.formGroup = this.formBuilder.group({
      'email': [this.cliente.email, Validators.compose([Validators.required, Validators.email])],
      'senha': [this.cliente.senha, Validators.compose([Validators.required])],
      'nome': [this.cliente.nome, Validators.compose([Validators.required])],
      'cep': ['', Validators.compose([Validators.required])],
      'bairro': [{ value: '', disabled: true }],
      'numero': [this.cliente.endereco.numero == 0 ? '' : this.cliente.endereco.numero, Validators.compose([Validators.required])],
      'logradouro': [{ value: '', disabled: true }],
      'cidade': [{ value: '', disabled: true }],
      'uf': [{ value: '', disabled: true }, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() { }

  salvar() {
    this.cliente.nome = this.formGroup.value.nome;
    this.cliente.email = this.formGroup.value.email;
    this.cliente.senha = this.formGroup.value.senha;
    this.cliente.endereco.numero = this.formGroup.value.numero;
    this.cliente.endereco.cep = this.formGroup.value.cep;
    this.cliente.endereco.bairro = this.formGroup.get('bairro')!.value;
    this.cliente.endereco.logradouro = this.formGroup.get('logradouro')!.value;
    this.cliente.endereco.cidade = this.formGroup.get('cidade')!.value;
    this.cliente.endereco.uf = this.formGroup.get('uf')!.value;

    this.emailInvalido = this.clienteService.verificarEmail(this.cliente);

    if (!this.emailInvalido) {
      this.clienteService.salvar(this.cliente);
      this.exibirMensagem('Conta cadastrada com sucesso!!!');
      this.navController.navigateBack('/login');
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
    toast.present();
  }
}
