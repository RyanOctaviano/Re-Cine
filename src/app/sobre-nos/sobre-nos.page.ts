import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonIcon,
  ActionSheetController, 
  ToastController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personAddOutline, 
  cameraOutline, 
  imagesOutline, 
  trashOutline, 
  close 
} from 'ionicons/icons';

interface TeamMember {
  name: string;
  description: string;
  image?: string;
}

@Component({
  selector: 'app-sobre-nos', // Alterado de 'app-sobrenos' para 'app-sobre-nos'
  templateUrl: './sobre-nos.page.html', // Alterado para o novo nome do arquivo
  styleUrls: ['./sobre-nos.page.scss'], // Alterado para o novo nome do arquivo
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class SobreNosPage implements OnInit { // Alterado de SobrenosPage para SobreNosPage
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  
  teamMembers: TeamMember[] = [
    {
      name: 'Nome do Membro 1',
      description: 'Adicione uma descrição sobre este membro da equipe...',
      image: undefined
    },
    {
      name: 'Nome do Membro 2', 
      description: 'Adicione uma descrição sobre este membro da equipe...',
      image: undefined
    },
    {
      name: 'Nome do Membro 3',
      description: 'Adicione uma descrição sobre este membro da equipe...',
      image: undefined
    },
    {
      name: 'Nome do Membro 4',
      description: 'Adicione uma descrição sobre este membro da equipe...',
      image: undefined
    }
  ];
  
  teamPhoto?: string;
  private currentMemberIndex: number = -1;
  private isSelectingTeamPhoto: boolean = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) { 
    addIcons({
      'person-add-outline': personAddOutline,
      'camera-outline': cameraOutline,
      'images-outline': imagesOutline,
      'trash-outline': trashOutline,
      'close': close
    });
  }

  ngOnInit() {
    this.loadSavedData();
  }

  async selectImage(memberIndex: number) {
    this.currentMemberIndex = memberIndex;
    this.isSelectingTeamPhoto = false;
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher Foto',
      buttons: [
        {
          text: 'Galeria',
          icon: 'images-outline',
          handler: () => {
            this.openFileSelector();
          }
        },
        {
          text: 'Câmera',
          icon: 'camera-outline',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Remover Foto',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removeImage(memberIndex);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    
    await actionSheet.present();
  }

  async selectTeamPhoto() {
    this.isSelectingTeamPhoto = true;
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher Foto da Equipe',
      buttons: [
        {
          text: 'Galeria',
          icon: 'images-outline',
          handler: () => {
            this.openFileSelector();
          }
        },
        {
          text: 'Câmera',
          icon: 'camera-outline',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Remover Foto',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removeTeamPhoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    
    await actionSheet.present();
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageUrl = e.target.result;
          
          if (this.isSelectingTeamPhoto) {
            this.teamPhoto = imageUrl;
          } else if (this.currentMemberIndex >= 0) {
            this.teamMembers[this.currentMemberIndex].image = imageUrl;
          }
          
          this.saveData();
          this.showToast('Imagem adicionada com sucesso!');
        };
        reader.readAsDataURL(file);
      } else {
        this.showToast('Por favor, selecione um arquivo de imagem válido.', 'danger');
      }
    }
    
    event.target.value = '';
  }

  async openCamera() {
    this.showToast('Funcionalidade da câmera em desenvolvimento', 'warning');
  }

  removeImage(memberIndex: number) {
    this.teamMembers[memberIndex].image = undefined;
    this.saveData();
    this.showToast('Imagem removida');
  }

  removeTeamPhoto() {
    this.teamPhoto = undefined;
    this.saveData();
    this.showToast('Foto da equipe removida');
  }

  updateMemberName(memberIndex: number, event: any) {
    const newName = event.target.innerText.trim();
    if (newName) {
      this.teamMembers[memberIndex].name = newName;
      this.saveData();
    }
  }

  updateMemberDescription(memberIndex: number, event: any) {
    const newDescription = event.target.innerText.trim();
    if (newDescription) {
      this.teamMembers[memberIndex].description = newDescription;
      this.saveData();
    }
  }

  private saveData() {
    const data = {
      teamMembers: this.teamMembers,
      teamPhoto: this.teamPhoto
    };
    localStorage.setItem('sobre-nos-data', JSON.stringify(data)); // Alterado de 'sobre-nos-data' para manter consistência
  }

  private loadSavedData() {
    const savedData = localStorage.getItem('sobre-nos-data'); // Alterado de 'sobre-nos-data'
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.teamMembers) {
          this.teamMembers = data.teamMembers;
        }
        if (data.teamPhoto) {
          this.teamPhoto = data.teamPhoto;
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }

  private async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}