import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton // <- Importado para corrigir o erro
  ]
})
export class CadastroPage implements OnInit {
  cadastro = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor() {}

  ngOnInit() {}

  cadastrar() {
    if (this.cadastro.senha !== this.cadastro.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Cadastro realizado:', this.cadastro);
    alert('Cadastro realizado com sucesso!');
  }
}
