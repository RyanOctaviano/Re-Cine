import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {

  buscaAtiva = false;
  termoBusca = '';
  carregando = false;
  categoriaAtual = 'Populares';
  filmesFiltrados: any[] = [];
  todoFilmes: any[] = [];

  categorias = [
    { nome: 'Populares', ativo: true },
    { nome: 'Ação', ativo: false },
    { nome: 'Comédia', ativo: false },
    { nome: 'Drama', ativo: false },
    { nome: 'Terror', ativo: false },
    { nome: 'Ficção', ativo: false }
  ];

  filmes = [
    {
      id: 1,
      titulo: 'Vingadores: Ultimato',
      ano: 2019,
      rating: 8.4,
      favorito: false,
      categoria: 'Ação'
    },
    {
      id: 2,
      titulo: 'Parasita',
      ano: 2019,
      rating: 8.6,
      favorito: true,
      categoria: 'Drama'
    },
    {
      id: 3,
      titulo: 'Coringa',
      ano: 2019,
      rating: 8.4,
      favorito: false,
      categoria: 'Drama'
    },
    {
      id: 4,
      titulo: 'Interestelar',
      ano: 2014,
      rating: 8.6,
      favorito: true,
      categoria: 'Ficção'
    },
    {
      id: 5,
      titulo: 'Pulp Fiction',
      ano: 1994,
      rating: 8.9,
      favorito: false,
      categoria: 'Drama'
    },
    {
      id: 6,
      titulo: 'O Poderoso Chefão',
      ano: 1972,
      rating: 9.2,
      favorito: false,
      categoria: 'Drama'
    },
    {
      id: 7,
      titulo: 'Matrix',
      ano: 1999,
      rating: 8.7,
      favorito: true,
      categoria: 'Ficção'
    },
    {
      id: 8,
      titulo: 'Forrest Gump',
      ano: 1994,
      rating: 8.8,
      favorito: false,
      categoria: 'Drama'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Página Principal carregada');
    // Inicializar arrays
    this.todoFilmes = [...this.filmes];
    this.filmesFiltrados = [...this.filmes];
  }

  abrirMenu() {
    console.log('Menu aberto');
    // Aqui você implementaria a abertura do menu lateral
  }

  abrirBusca() {
    this.buscaAtiva = !this.buscaAtiva;
    console.log('Busca ativada:', this.buscaAtiva);
    if (this.buscaAtiva && window.innerWidth <= 768) {
      setTimeout(() => {
        const searchBar = document.querySelector('.search-item');
        if (searchBar) searchBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  buscarFilmes(event: any) {
    const termo = event.detail.value.toLowerCase();
    console.log('Buscando por:', termo);
    
    if (termo.trim() === '') {
      // Resetar para filmes da categoria atual
      this.filtrarPorCategoria(this.categoriaAtual);
    } else {
      // Filtrar filmes por título
      this.filmesFiltrados = this.todoFilmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termo)
      );
    }
  }

  limparBusca() {
    this.termoBusca = ''; // Limpa o texto
    this.filtrarPorCategoria(this.categoriaAtual); // Reseta a lista
    console.log('Busca limpa');
  }

  selecionarCategoria(categoria: any) {
    // Desativar todas as categorias
    this.categorias.forEach(cat => cat.ativo = false);
    
    // Ativar a categoria selecionada
    categoria.ativo = true;
    this.categoriaAtual = categoria.nome;
    
    // Limpar busca quando trocar categoria
    this.termoBusca = '';
    this.buscaAtiva = false;
    
    console.log('Categoria selecionada:', categoria.nome);
    
    // Filtrar filmes por categoria
    this.filtrarPorCategoria(categoria.nome);
  }

  filtrarPorCategoria(categoria: string) {
    if (categoria === 'Populares') {
      this.filmesFiltrados = [...this.todoFilmes];
    } else {
      this.filmesFiltrados = this.todoFilmes.filter(filme => 
        filme.categoria === categoria
      );
    }
    console.log('Filmes filtrados:', this.filmesFiltrados);
  }

  carregarFilmesPorCategoria(categoria: string) {
    this.carregando = true;
    
    // Simular carregamento
    setTimeout(() => {
      if (categoria === 'Populares') {
        console.log('Carregando filmes populares');
      } else {
        console.log('Filtrando por categoria:', categoria);
      }
      this.carregando = false;
    }, 1000);
  }

  toggleFavorito(filme: any, event: Event) {
    event.stopPropagation();
    
    filme.favorito = !filme.favorito;
    console.log('Filme favoritado:', filme.titulo, filme.favorito);
    
    if (filme.favorito) {
      console.log('❤️ Adicionado aos favoritos:', filme.titulo);
    } else {
      console.log('💔 Removido dos favoritos:', filme.titulo);
    }
  }

  abrirDetalhes(filmeId: number) {
    console.log('Abrindo detalhes do filme:', filmeId);
    this.router.navigate(['/detalhes', filmeId]).catch(err => {
      console.log('Erro na navegação - Rota /detalhes não configurada ainda:', err);
      console.log('💡 Dica: Configure a rota /detalhes no app-routing.module.ts');
    });
  }

  irParaFavoritos() {
    console.log('Navegando para Favoritos');
    this.mostrarFavoritos();
  }

  irParaPerfil() {
    console.log('Navegando para Perfil');
  }

  mostrarFavoritos() {
    const favoritos = this.filmes.filter(filme => filme.favorito);
    console.log('Filmes favoritos:', favoritos);
  }
}