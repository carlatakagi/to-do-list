// requisitos obrigatórios
// constantes utilizadas para acessar elementos do html
const botaoCriarTarefa = document.getElementById('criar-tarefa');
const botaoApagarTudo = document.getElementById('apaga-tudo');
const botaoApagarFinalizados = document.getElementById('remover-finalizados');
const botaoSalvarTarefa = document.getElementById('salvar-tarefa');
const inputNovaTarefa = document.getElementById('texto-tarefa');
// eslint-disable-next-line sonarjs/no-duplicate-string
const listaDeTarefas = document.getElementById('lista-tarefas');
const corCinza = 'rgb(128,128,128)';

// funcao para pintar as tarefas de cinza
function pintarTarefa(itemTarefa) {
  // eslint-disable-next-line no-param-reassign
  const todasAsTarefas = listaDeTarefas.children;

  for (let index = 0; index < todasAsTarefas.length; index += 1) {
    todasAsTarefas[index].style.backgroundColor = '';
  }
  // eslint-disable-next-line no-param-reassign
  itemTarefa.style.backgroundColor = corCinza;
}

// funcao de riscar tarefas realizadas e desfazer a ação
function riscarTarefa(itemTarefa) {
  if (itemTarefa.classList.contains('completed')) {
    itemTarefa.classList.remove('completed');
  } else {
    itemTarefa.classList.add('completed');
  }
}

// eslint-disable-next-line max-lines-per-function
// funcao de criar a tarefa e para adicionar os escutadores de evento
function criarTarefa() {
  const valorNovaTarefa = inputNovaTarefa.value;

  if (!valorNovaTarefa) { // ! nao
    window.alert('Digite nova tarefa');
  } else {
    const inputValorNode = document.createTextNode(valorNovaTarefa);
    const novoItemTarefa = document.createElement('li');

    novoItemTarefa.appendChild(inputValorNode);

    listaDeTarefas.appendChild(novoItemTarefa);

    inputNovaTarefa.value = '';

    novoItemTarefa.addEventListener('click', () => pintarTarefa(novoItemTarefa)); // () => funcao: criar função pai para poder passar argumento para uma função sem chama-la
    novoItemTarefa.addEventListener('dblclick', () => riscarTarefa(novoItemTarefa));
  }
}

// adiciona evento ao escutar o clique do botao e executa a funcao de criar tarefa
botaoCriarTarefa.addEventListener('click', criarTarefa);

// funcao para remover todas as tarefas
function removerTudo() {
  const todasAsTarefas = listaDeTarefas.children;
  while (todasAsTarefas.length) { // enquanto tiver filhos (li)
    listaDeTarefas.removeChild(listaDeTarefas.firstChild); // remove o primeiro filho (li)
  }
}
botaoApagarTudo.addEventListener('click', removerTudo);

// funcao para remover tarefas finalziadas (as que estão riscadas)
function removerFinalizados() {
  const tarefasCompletadas = document.querySelectorAll('.completed'); // queryselector porqqe retorna uma lista

  tarefasCompletadas.forEach((tarefa) => {
    tarefa.remove();
  });
}
botaoApagarFinalizados.addEventListener('click', removerFinalizados);

// requisitos bônus
// 12 - Adicione um botão com id="salvar-tarefas" que salve o conteúdo da lista
// Se você fechar e reabrir a página, a lista deve continuar no estado em que estava
