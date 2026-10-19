// script.js
// Este é o JavaScript que roda DENTRO DO NAVEGADOR (front-end).
// Ele cuida da interface do quiz e conversa com o back-end (server.js)
// usando fetch() para salvar e consultar o ranking.

// ---------------------------------------------------------------
// 1. Banco de perguntas (fica só na memória do navegador)
// ---------------------------------------------------------------
const PERGUNTAS = [
  {
    pergunta: "Qual aplicativo é utilizado como principal ferramenta na produção e publicação de vídeos?",
    alternativas: ["Instagram", "TikTok", "Wathsapp", "X"],
    correta: 1,
  },
  {
    pergunta: "Qual é o princial sotware usado nos iPhones?",
    alternativas: ["iOS", "Android", "Microsoft", "Linux"],
    correta: 0,
  },
  {
    pergunta: "O que é inteligência artificial?",
    alternativas: ["Uma máquina de lavar", "Uma tecnologia capaz de realizar tarefas que envolvem inteligência humana", "Um jogo", "Uma inteligência disfarçada"],
    correta: 1,
  },
  {
    pergunta: "Para que serve um pendrive?",
    alternativas: [
      "Armazenar e transportar arquivos",
      "Aumentar o volume",
      "Baixar app",
      "Usar internet ",
    ],
    correta: 0,
  },
  {
    pergunta: "Qual é a finalidade de um print?",
    alternativas: ["Tirar uma foto ", "Fazer a captura de um site ", "Fazer a captura do monitor ", "Baixar um app"],
    correta: 2,
  },
  {
    pergunta: "O que é placa-mãe?",
    alternativas: ["É o coração do notbook", "É um hadware", "É um software ", "É uma parte do app"],
    correta: 1,
  },
  {
    pergunta: "Para que serve o mouse?",
    alternativas: ["Direcionar a tela", "Baixar  um app", "direcionar a seta na tela ", "Abrir sites"],
    correta: 2,
  },
  {
    pergunta: "O que é RAM em um computador?",
    alternativas: [
      "Memória permanente usada para armazenar arquivos",
      "Memória temporária usada durante a execução de programas",
      "Unidade responsável pelo processamento gráfico",
      "Memória usada exclusivamente para armazenar o sistema operacional",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual destes componentes é responsável principalmente pelo processamento de instruções?",
    alternativas: ["SDD", "SDD", "CPU", "REM"],
    correta: 2,
  },
  {
    pergunta: "Qual é a principal diferença entre HDD e SSD?",
    alternativas: [
      " SSD utiliza discos magnéticos, enquanto HDD utiliza memória flash",
      "Ambos utilizam exclusivamente memória flash",
      "SSD é usado apenas para sistemas operacionais",
      " HDD geralmente utiliza discos magnéticos, enquanto SSD utiliza memória flash",
    ],
    correta: 3,
  },
  {
    pergunta: "O que significa HTTPS em um endereço de internet?",
    alternativas: [
      "Um protocolo HTTP que utiliza uma camada de segurança/criptografia",
      "Uma versão do HTTP exclusiva para redes locais",
      "Um protocolo utilizado apenas para enviar e-mails",
      "Um sistema de armazenamento de páginas da web",
    ],
    correta: 0,
  },
  {
    pergunta: "Qual alternativa descreve melhor o phishing?",
    alternativas: [" Um método para aumentar a velocidade da internet", "Uma técnica de compressão de arquivos", "Uma tentativa de enganar alguém para obter informações ou induzir uma ação", " Um tipo de antivírus baseado em inteligência artificial"],
    correta: 2,
  },
  {
    pergunta: "O que significa a sigla HTTP?",
    alternativas: [
      "Hyper Text Transfer Protocol",
      "High Transfer Text Program",
      "Home Tool Transfer Page",
      "Hyper Terminal Transfer Process",
    ],
    correta: 0,
  },
  {
    pergunta: "O que significa fazer backup?",
    alternativas: ["Excluir arquivos antigos para liberar espaço", "Criar uma cópia de dados para possibilitar sua recuperação", "Criptografar todos os arquivos do computador", "Transferir obrigatoriamente arquivos para um pendrive"],
    correta: 1,
  },
  {
    pergunta: "Qual destas tecnologias é normalmente utilizada para comunicação sem fio de curto alcance entre dispositivos?",
    alternativas: ["Bluetooth", "SATA", "HDMI", "PCI Express"],
    correta: 0,
  },
  {
    pergunta: "Qual alternativa diferencia melhor Wi-Fi de Bluetooth?",
    alternativas: [
      "Wi-Fi é exclusivamente cabeado, enquanto Bluetooth é sem fio",
      "Bluetooth é usado principalmente para conexões de curto alcance, enquanto Wi-Fi é usado para conexão em redes sem fio",
      "Wi-Fi funciona apenas em celulares, enquanto Bluetooth funciona apenas em computadores",
      "Ambos são exatamente o mesmo protocolo, com nomes diferentes",
    ],
    correta: 1,
  },
  {
    pergunta: "O que acontece quando o servidor responde com o código de status 404?",
    alternativas: [
      "Tudo certo, requisição bem-sucedida",
      "O recurso pedido não foi encontrado",
      "O servidor está fora do ar",
      "Os dados foram salvos",
    ],
    correta: 1,
  },
  {
    pergunta: "Por que colocamos apenas index.html, style.css e script.js dentro da pasta public/?",
    alternativas: [
      "Por acaso, não faz diferença",
      "Porque são os únicos arquivos que o navegador pode acessar diretamente",
      "Porque arquivos .js só funcionam dentro de pastas chamadas public",
      "Para deixar o projeto mais bonito",
    ],
    correta: 1,
  },
  {
    pergunta: "O que caracteriza principalmente a inteligência artificial generativa?",
    alternativas: [
      "Apenas classificar arquivos existentes",
      "Gerar conteúdos novos a partir de padrões aprendidos",
      "Aumentar a velocidade do processador",
      "Criar exclusivamente imagens digitais",
    ],
    correta: 1,
  },
  {
    pergunta: "O que diferencia o front-end do back-end?",
    alternativas: [
      "Front-end roda no servidor, back-end no navegador",
      "Front-end roda no navegador, back-end no servidor",
      "Não existe diferença, são a mesma coisa",
      "Front-end só existe em aplicativos mobile",
    ],
    correta: 1,
  },
];

// ---------------------------------------------------------------
// 2. Estado do jogo (o que muda enquanto o jogador joga)
// ---------------------------------------------------------------
const estado = {
  nome: "",
  indiceAtual: 0,
  pontos: 0,
  respondeuAtual: false,
};

// ---------------------------------------------------------------
// 3. Referências aos elementos da tela
// ---------------------------------------------------------------
const telas = document.querySelectorAll("[data-tela]");

const inputNome = document.getElementById("input-nome");
const erroNome = document.getElementById("erro-nome");
const botaoIniciar = document.getElementById("botao-iniciar");
const botaoVerRankingInicio = document.getElementById("botao-ver-ranking-inicio");

const progressoBarra = document.getElementById("progresso-barra");
const progressoTexto = document.getElementById("progresso-texto");
const quizJogador = document.getElementById("quiz-jogador");
const quizPontos = document.getElementById("quiz-pontos");
const perguntaTexto = document.getElementById("pergunta-texto");
const alternativasContainer = document.getElementById("alternativas");

const resultadoJogador = document.getElementById("resultado-jogador");
const resultadoPontos = document.getElementById("resultado-pontos");
const resultadoLegenda = document.getElementById("resultado-legenda");
const botaoSalvar = document.getElementById("botao-salvar");
const erroSalvar = document.getElementById("erro-salvar");
const botaoJogarDeNovo = document.getElementById("botao-jogar-de-novo");

const rankingLista = document.getElementById("ranking-lista");
const rankingVazio = document.getElementById("ranking-vazio");
const botaoVoltarInicio = document.getElementById("botao-voltar-inicio");

const rankingPreviewLista = document.getElementById("ranking-preview-lista");
const rankingPreviewVazio = document.getElementById("ranking-preview-vazio");

// ---------------------------------------------------------------
// 4. Navegação entre telas
// ---------------------------------------------------------------
function mostrarTela(idTela) {
  telas.forEach((tela) => {
    tela.hidden = tela.id !== idTela;
  });
}

// ---------------------------------------------------------------
// 5. Fluxo do quiz
// ---------------------------------------------------------------
function iniciarQuiz() {
  const nomeDigitado = inputNome.value.trim();

  if (!nomeDigitado) {
    erroNome.textContent = "Digite um nome antes de começar.";
    return;
  }

  erroNome.textContent = "";
  estado.nome = nomeDigitado.slice(0, 20);
  estado.indiceAtual = 0;
  estado.pontos = 0;

  quizJogador.textContent = estado.nome;
  mostrarTela("tela-quiz");
  renderizarPergunta();
}

function renderizarPergunta() {
  const pergunta = PERGUNTAS[estado.indiceAtual];
  estado.respondeuAtual = false;

  // Atualiza barra e texto de progresso
  const percentual = ((estado.indiceAtual + 1) / PERGUNTAS.length) * 100;
  progressoBarra.style.width = percentual + "%";
  progressoTexto.textContent = `Pergunta ${estado.indiceAtual + 1} de ${PERGUNTAS.length}`;
  quizPontos.textContent = `${estado.pontos} pts`;

  perguntaTexto.textContent = pergunta.pergunta;
  alternativasContainer.innerHTML = "";

  pergunta.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";

    const letra = document.createElement("span");
    letra.className = "alternativa__letra";
    letra.textContent = "ABCD"[indice];

    const conteudo = document.createElement("span");
    conteudo.textContent = texto;

    botao.append(letra, conteudo);
    botao.addEventListener("click", () => responder(indice));
    alternativasContainer.appendChild(botao);
  });
}

// Tempo (em ms) que a resposta certa/errada fica destacada antes de avançar sozinha.
const TEMPO_TRANSICAO = 900;

function responder(indiceEscolhido) {
  if (estado.respondeuAtual) return; // impede clicar duas vezes
  estado.respondeuAtual = true;

  const pergunta = PERGUNTAS[estado.indiceAtual];
  const botoes = alternativasContainer.querySelectorAll(".alternativa");

  botoes.forEach((botao, indice) => {
    botao.disabled = true;
    if (indice === pergunta.correta) {
      botao.classList.add("correta");
    } else if (indice === indiceEscolhido) {
      botao.classList.add("errada");
    }
  });

  if (indiceEscolhido === pergunta.correta) {
    estado.pontos += 10;
    quizPontos.textContent = `${estado.pontos} pts`;
  }

  // Depois de mostrar qual era a resposta certa por um instante,
  // avança sozinho para a próxima pergunta (ou para o resultado, na última).
  setTimeout(avancar, TEMPO_TRANSICAO);
}

function avancar() {
  const ultimaPergunta = estado.indiceAtual === PERGUNTAS.length - 1;

  if (ultimaPergunta) {
    mostrarResultado();
    return;
  }

  estado.indiceAtual += 1;
  renderizarPergunta();
}

function mostrarResultado() {
  resultadoJogador.textContent = estado.nome;
  resultadoPontos.textContent = estado.pontos;

  const acertos = estado.pontos / 10;
  resultadoLegenda.textContent = `${acertos} de ${PERGUNTAS.length} perguntas corretas.`;

  botaoSalvar.disabled = false;
  botaoSalvar.textContent = "Salvar pontuação";
  erroSalvar.textContent = "";

  mostrarTela("tela-resultado");
}

// ---------------------------------------------------------------
// 6. Comunicação com o BACK-END (fetch)
// ---------------------------------------------------------------

// Envia a pontuação final para o servidor salvar em ranking.json.
async function salvarPontuacao() {
  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";
  erroSalvar.textContent = "";

  try {
    const resposta = await fetch("/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: estado.nome,
        pontos: estado.pontos,
      }),
    });

    if (!resposta.ok) {
      throw new Error("O servidor recusou os dados.");
    }

    botaoSalvar.textContent = "Pontuação salva!";
    await abrirRanking();
  } catch (erro) {
    erroSalvar.textContent = "Não foi possível salvar. O servidor está rodando?";
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Salvar pontuação";
  }
}

// Busca o ranking salvo no servidor (usado tanto pelo preview quanto pela tela cheia).
async function buscarRanking() {
  const resposta = await fetch("/ranking");
  if (!resposta.ok) {
    throw new Error("O servidor recusou a consulta.");
  }
  return resposta.json();
}

// Desenha uma lista de ranking dentro de um <ol> e controla a mensagem de "vazio".
// Recebe os elementos como parâmetro para poder ser reaproveitada em telas diferentes.
function desenharRanking(ranking, listaElemento, vazioElemento, mensagemVazio) {
  listaElemento.innerHTML = "";

  if (ranking.length === 0) {
    vazioElemento.hidden = false;
    vazioElemento.textContent = mensagemVazio;
    return;
  }

  vazioElemento.hidden = true;

  ranking.forEach((jogador, indice) => {
    const item = document.createElement("li");
    item.className = "ranking-item" + (indice < 3 ? ` ranking-item--top${indice + 1}` : "");
    item.innerHTML = `
      <span class="ranking-item__posicao">${indice + 1}º</span>
      <span class="ranking-item__nome">${escaparTexto(jogador.nome)}</span>
      <span class="ranking-item__pontos">${jogador.pontos} pts</span>
    `;
    listaElemento.appendChild(item);
  });
}

// Carrega o preview de ranking (top 5) na tela inicial.
// É chamada assim que a página termina de carregar, sem precisar de clique.
async function carregarRankingPreview() {
  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 5),
      rankingPreviewLista,
      rankingPreviewVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingPreviewLista, rankingPreviewVazio,
      "Não foi possível carregar o ranking agora."
    );
  }
}

// Abre a tela de ranking completo, sempre buscando os dados mais recentes.
async function abrirRanking() {
  mostrarTela("tela-ranking");

  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 10),
      rankingLista,
      rankingVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingLista, rankingVazio,
      "Não foi possível carregar o ranking. O servidor está rodando?"
    );
  }
}

// Evita que um nome de jogador com HTML dentro quebre a página.
function escaparTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// ---------------------------------------------------------------
// 7. Ligações dos botões (event listeners)
// ---------------------------------------------------------------
botaoIniciar.addEventListener("click", iniciarQuiz);
inputNome.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") iniciarQuiz();
});

botaoSalvar.addEventListener("click", salvarPontuacao);

botaoVerRankingInicio.addEventListener("click", abrirRanking);
botaoVoltarInicio.addEventListener("click", () => {
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

botaoJogarDeNovo.addEventListener("click", () => {
  inputNome.value = "";
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

// ---------------------------------------------------------------
// 8. Carrega o ranking automaticamente assim que a página abre
// ---------------------------------------------------------------
carregarRankingPreview();
