import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalhesPage implements OnInit {
  
  isFavorito = false;
  
  // Dados mockados do filme
  filme = {
    id: 1,
    titulo: "Vingadores: Ultimato",
    ano: 2019,
    duracao: "3h 1min",
    rating: 8.4,
    generos: ["Ação", "Aventura", "Ficção Científica"],
    sinopse: "Após os eventos devastadores de 'Guerra Infinita', o universo está em ruínas devido às ações de Thanos. Com a ajuda dos aliados que restaram, os Vingadores devem se reunir mais uma vez para desfazer as ações de Thanos e restaurar a ordem no universo de uma vez por todas.",
    elenco: [
      { nome: "Robert Downey Jr.", personagem: "Tony Stark / Homem de Ferro" },
      { nome: "Chris Evans", personagem: "Steve Rogers / Capitão América" },
      { nome: "Scarlett Johansson", personagem: "Natasha Romanoff / Viúva Negra" },
      { nome: "Chris Hemsworth", personagem: "Thor" },
      { nome: "Mark Ruffalo", personagem: "Bruce Banner / Hulk" }
    ]
  };
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Aqui você pode pegar o ID do filme da URL quando vier da tela principal
    // const filmeId = this.route.snapshot.paramMap.get('id');
    // this.carregarFilme(filmeId);
  }
  
  toggleFavorito() {
    this.isFavorito = !this.isFavorito;
    console.log('Filme favoritado:', this.isFavorito);
    
    // Aqui você implementaria a lógica de favoritar
    // Exemplo: salvar no localStorage, enviar para API, etc.
    
    // Feedback no console para ver se está funcionando
    if (this.isFavorito) {
      console.log('❤️ Filme adicionado aos favoritos!');
    } else {
      console.log('💔 Filme removido dos favoritos!');
    }
  }
  
  getInitials(nome: string): string {
    return nome.split(' ')
      .map(palavra => palavra.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  
  // Método para carregar filme (usar quando integrar com API)
  // carregarFilme(id: string) {
  //   // Aqui você faria a chamada para a API
  //   // this.filmeService.getFilme(id).subscribe(filme => {
  //   //   this.filme = filme;
  //   // });
  // }
}