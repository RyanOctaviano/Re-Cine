import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonBackButton
} from '@ionic/angular/standalone';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonBackButton
  ]
})
export class LoginPage implements OnInit {

  // Propriedades para armazenar os dados do formulário
  email: string = '';
  senha: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  // Método principal para fazer login
  fazerLogin() {
    // Validação básica (opcional)
    if (this.email && this.senha) {
      // Aqui você pode adicionar sua lógica de autenticação
      console.log('Fazendo login com:', this.email);
      
      // Navega para a tela principal
      this.navCtrl.navigateRoot('/principal');
    } else {
      // Opcional: mostrar alerta se campos estão vazios
      console.log('Preencha todos os campos');
      // Você pode adicionar um toast ou alert aqui se quiser
    }
  }

  // Métodos para login com redes sociais
  loginComGoogle() {
    console.log('Login com Google');
    // Aqui você implementaria a autenticação com Google
    // Por enquanto, navega direto
    this.navCtrl.navigateRoot('/principal');
  }

  loginComApple() {
    console.log('Login com Apple');
    // Aqui você implementaria a autenticação com Apple
    // Por enquanto, navega direto
    this.navCtrl.navigateRoot('/principal');
  }
}