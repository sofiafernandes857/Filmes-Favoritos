const filmes = JSON.parse(localStorage.getItem('filmes')) || [
    {
      id: 0,
      nome: 'Harry Potter',
      genero: 'fantasia',
      lancamento: 2001
    },
    {
      id: 1,
      nome: 'Avatar',
      genero: 'fantasia',
      lancamento: 2010
    },
    {
      id: 2,
      nome: 'O senhor dos Anéis',
      genero: 'fantasia',
      lancamento: 2000,
    },
    {
      id: 3,
      nome: 'Branquelas',
      genero: 'comédia',
      lancamento: 2007
    },
    {
      id: 4,
      nome: 'A Lagoa Azul',
      genero: 'romance',
      lancamento: 1983
    }
  ];
  
  let filmesFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
  // Pegando Elementos HTML
  const btn1 = document.querySelector('button');
  const listaFilmes = document.querySelector('#listaFilmes');
  
  // Ao carregar a página, executa a função que renderiza os elementos na tela
  window.onload = () => {
    renderizarLista();
  }
  
  // Função para renderizar filmes na tela
  const renderizarLista = () => {
    listaFilmes.innerHTML = "";
    filmes.forEach((filme) => {
      const itemLista = document.createElement('li');
  
      // Cria um contêiner para o conteúdo do item
      const content = document.createElement('div');
      content.className = 'content';
      itemLista.append(content);
  
      // Adiciona o nome do filme ao contêiner
      const filmeNome = document.createElement('span');
      filmeNome.textContent = filme.nome;
      content.append(filmeNome);
  
      // Cria uma nova imagem para o ícone de favorito
      const favorito = document.createElement('img');
      favorito.src = filmesFavoritos.some(f => f.id === filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
      favorito.style.cursor = 'pointer';
      
      // Cria um contêiner para o ícone e o botão de remoção
      const actions = document.createElement('div');
      actions.className = 'actions';
      
      favorito.addEventListener('click', (e) => {
        favoritoClicado(e, filme);
      });
      
      actions.append(favorito);
  
      // Cria botão de remoção
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.className = 'remove-btn';
      removeBtn.addEventListener('click', () => {
        removerFilme(filme.id);
      });
      actions.append(removeBtn);
  
      // Adiciona o contêiner de ações ao item da lista
      itemLista.append(actions);
  
      // Adiciona o item à lista de filmes
      listaFilmes.append(itemLista);
    });
  }
  
  // Adiciona o evento de clique ao botão 
  btn1.addEventListener('click', () => {
    const inputUsuario = document.querySelector('#filmeInput');
    if (inputUsuario.value.trim() === '') {
      alert('Digite o nome do filme.');
      return;
    }
    const id = filmes.length ? filmes[filmes.length - 1].id + 1 : 0;
    const novoFilme = { id: id, nome: inputUsuario.value, genero: '', lancamento: '' };
    filmes.push(novoFilme);
    localStorage.setItem('filmes', JSON.stringify(filmes));
    renderizarLista();
    inputUsuario.value = '';
  });
  
  // Função que é executada quando o botão de favorito é clicado
  const favoritoClicado = (eventoDeClique, objetoFilme) => {
    const favoriteState = {
      favorited: 'img/heart-fill.svg',
      notFavorited: 'img/heart.svg'
    }
    if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
      eventoDeClique.target.src = favoriteState.favorited;
      saveToLocalStorage(objetoFilme);
    } else {
      eventoDeClique.target.src = favoriteState.notFavorited;
      removeFromLocalStorage(objetoFilme.id);
    }
  }
  
  // Função executada para salvar o filme no localStorage
  const saveToLocalStorage = (objetoFilme) => {
    filmesFavoritos.push(objetoFilme);
    localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
  }
  
  // Função executada para remover o filme no localStorage
  const removeFromLocalStorage = (id) => {
    filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
  }
  
  // Função para remover um filme da lista
  const removerFilme = (id) => {
    const index = filmes.findIndex(filme => filme.id === id);
    if (index !== -1) {
      filmes.splice(index, 1);
      localStorage.setItem('filmes', JSON.stringify(filmes));
      renderizarLista();
      removeFromLocalStorage(id);
    }
  }
  