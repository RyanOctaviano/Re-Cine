import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  person, 
  personOutline, 
  mailOutline, 
  logOutOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class PerfilPage implements OnInit {

  usuario = {
    nome: '',
    sobrenome: '',
    email: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({
      person,
      personOutline,
      mailOutline,
      logOutOutline
    });
  }

  ngOnInit() {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    // Aqui você vai buscar os dados do usuário
    // Pode ser do localStorage, de um service, etc.
    
    // Exemplo usando localStorage (você pode ajustar conforme sua implementação)
    const dadosUsuario = localStorage.getItem('usuario');
    if (dadosUsuario) {
      this.usuario = JSON.parse(dadosUsuario);
    }
    
    // Ou se você tiver um service de autenticação:
    // this.usuario = this.authService.getUsuarioLogado();
  }

  async confirmarSaida() {
    const alert = await this.alertController.create({
      header: 'Confirmar Saída',
      message: 'Tem certeza que deseja sair?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sair',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.sair();
          }
        }
      ]
    });

    await alert.present();
  }

  sair() {
    // Limpar dados do usuário
    localStorage.removeItem('usuario');
    // Ou se você tiver um service de autenticação:
    // this.authService.logout();
    
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}