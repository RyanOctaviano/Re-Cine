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

  // Gêneros com ícones
  generos = [
    { nome: 'Ação', ativo: false, icone: 'flash' },
    { nome: 'Comédia', ativo: false, icone: 'happy' },
    { nome: 'Drama', ativo: false, icone: 'sad' },
    { nome: 'Terror', ativo: false, icone: 'skull' },
    { nome: 'Ficção', ativo: false, icone: 'planet' }
  ];

  // Dados dos filmes
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
    },
    {
      id: 9,
      titulo: 'John Wick',
      ano: 2014,
      rating: 7.4,
      favorito: false,
      categoria: 'Ação'
    },
    {
      id: 10,
      titulo: 'Superbad',
      ano: 2007,
      rating: 7.6,
      favorito: true,
      categoria: 'Comédia'
    },
    {
      id: 11,
      titulo: 'Invocação do Mal',
      ano: 2013,
      rating: 7.5,
      favorito: false,
      categoria: 'Terror'
    },
    {
      id: 12,
      titulo: 'Se Beber, Não Case',
      ano: 2009,
      rating: 7.7,
      favorito: true,
      categoria: 'Comédia'
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
    // Exemplo: this.menuController.open();
  }

  abrirBusca() {
    this.buscaAtiva = !this.buscaAtiva;
    console.log('Busca ativada:', this.buscaAtiva);
    
    // Focar no input de busca após ativação
    if (this.buscaAtiva) {
      setTimeout(() => {
        const inputElement = document.querySelector('.search-item ion-input') as HTMLIonInputElement;
        if (inputElement) {
          inputElement.setFocus();
        }
      }, 200);
    } else {
      // Limpar busca ao fechar
      this.termoBusca = '';
      this.filtrarPorCategoria(this.categoriaAtual);
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
    // Desativar todas as categorias de gênero
    this.generos.forEach(gen => gen.ativo = false);
    
    // Ativar a categoria selecionada se for um gênero
    if (categoria.nome !== 'Favoritos' && categoria.nome !== 'Populares') {
      const genero = this.generos.find(g => g.nome === categoria.nome);
      if (genero) {
        genero.ativo = true;
      }
    }
    
    this.categoriaAtual = categoria.nome;
    
    // Limpar busca quando trocar categoria
    this.termoBusca = '';
    this.buscaAtiva = false;
    
    console.log('Categoria selecionada:', categoria.nome);
    
    // Filtrar filmes por categoria
    this.filtrarPorCategoria(categoria.nome);
  }

  filtrarPorCategoria(categoria: string) {
    switch (categoria) {
      case 'Populares':
        this.filmesFiltrados = [...this.todoFilmes];
        break;
      case 'Favoritos':
        this.filmesFiltrados = this.todoFilmes.filter(filme => filme.favorito);
        break;
      default:
        this.filmesFiltrados = this.todoFilmes.filter(filme => 
          filme.categoria === categoria
        );
        break;
    }
    console.log(`Categoria ${categoria}: ${this.filmesFiltrados.length} filmes`);
  }

  // Método para contar favoritos
  getFavoritosCount(): number {
    return this.todoFilmes.filter(filme => filme.favorito).length;
  }

  carregarFilmesPorCategoria(categoria: string) {
    this.carregando = true;
    
    // Simular carregamento
    setTimeout(() => {
      console.log('Carregando categoria:', categoria);
      this.carregando = false;
    }, 1000);
  }

  toggleFavorito(filme: any, event: Event) {
    event.stopPropagation();
    
    filme.favorito = !filme.favorito;
    console.log('Filme favoritado:', filme.titulo, filme.favorito);
    
    // Se estamos na aba de favoritos, atualizar a lista
    if (this.categoriaAtual === 'Favoritos') {
      this.filtrarPorCategoria('Favoritos');
    }
    
    if (filme.favorito) {
      console.log('❤️ Adicionado aos favoritos:', filme.titulo);
      this.mostrarFeedbackFavorito(true);
    } else {
      console.log('💔 Removido dos favoritos:', filme.titulo);
      this.mostrarFeedbackFavorito(false);
    }
  }

  mostrarFeedbackFavorito(adicionado: boolean) {
    // Feedback visual simples
    console.log(adicionado ? '✨ Filme adicionado aos favoritos!' : '💔 Filme removido dos favoritos');
    
    // Aqui você pode adicionar toast, alert ou animação mais elaborada
    // Exemplo com toast (precisa importar ToastController):
    // const toast = await this.toastController.create({
    //   message: adicionado ? 'Adicionado aos favoritos!' : 'Removido dos favoritos',
    //   duration: 2000,
    //   position: 'bottom'
    // });
    // toast.present();
  }

  abrirDetalhes(filmeId: number) {
    console.log('Abrindo detalhes do filme:', filmeId);
    
    // Buscar o filme específico
    const filme = this.todoFilmes.find(f => f.id === filmeId);
    if (filme) {
      console.log('Filme selecionado:', filme.titulo);
    }
    
    // Navegar para página de detalhes
    this.router.navigate(['/detalhes', filmeId]).catch(err => {
      console.log('Erro na navegação - Rota /detalhes não configurada ainda:', err);
      console.log('💡 Dica: Configure a rota /detalhes no app-routing.module.ts');
    });
  }

  irParaFavoritos() {
    console.log('Navegando para seção Favoritos');
    // Selecionar automaticamente a categoria Favoritos
    this.selecionarCategoria({ nome: 'Favoritos', ativo: false });
  }

  irParaPerfil() {
    console.log('Navegando para Perfil');
    this.router.navigate(['/perfil']).catch(err => {
      console.log('Erro na navegação - Rota /perfil não configurada ainda:', err);
      console.log('💡 Dica: Configure a rota /perfil no app-routing.module.ts');
    });
  }

  // Métodos utilitários adicionais

  /**
   * Método para ordenar filmes por rating
   */
  ordenarPorRating() {
    this.filmesFiltrados.sort((a, b) => b.rating - a.rating);
    console.log('Filmes ordenados por rating');
  }

  /**
   * Método para ordenar filmes por ano
   */
  ordenarPorAno() {
    this.filmesFiltrados.sort((a, b) => b.ano - a.ano);
    console.log('Filmes ordenados por ano');
  }

  /**
   * Método para obter estatísticas
   */
  obterEstatisticas() {
    const stats = {
      totalFilmes: this.todoFilmes.length,
      totalFavoritos: this.getFavoritosCount(),
      porcentagemFavoritos: Math.round((this.getFavoritosCount() / this.todoFilmes.length) * 100),
      generoMaisFavorito: this.obterGeneroMaisFavorito(),
      ratingMedio: this.calcularRatingMedio()
    };
    
    console.log('📊 Estatísticas dos filmes:', stats);
    return stats;
  }

  /**
   * Método para encontrar o gênero com mais favoritos
   */
  private obterGeneroMaisFavorito(): string {
    const favoritos = this.todoFilmes.filter(f => f.favorito);
    const generoCount: { [key: string]: number } = {};
    
    favoritos.forEach(filme => {
      generoCount[filme.categoria] = (generoCount[filme.categoria] || 0) + 1;
    });
    
    return Object.keys(generoCount).reduce((a, b) => 
      generoCount[a] > generoCount[b] ? a : b, 'Nenhum'
    );
  }

  /**
   * Método para calcular rating médio
   */
  private calcularRatingMedio(): number {
    const soma = this.todoFilmes.reduce((acc, filme) => acc + filme.rating, 0);
    return Math.round((soma / this.todoFilmes.length) * 10) / 10;
  }
}