// --- SISTEMA DE AJUDAS (Uso único) ---
let ajudasUsadas = {
  pular: false,
  remover: false,
  dica: false,
};

function toggleImagem() {
  const img = document.getElementById("img-pergunta");
  img.style.display =
    img.style.display === "none" || img.style.display === "" ? "block" : "none";
}

function ajudaPular() {
  if (ajudasUsadas.pular) return;

  // Filtra questões do banco que não estão no seu teste atual de 5 perguntas
  const disponiveis = bancoSelecionado.filter((q) => !perguntas.includes(q));

  if (disponiveis.length > 0) {
    // Sorteia uma nova e substitui a questão no índice atual
    const novaQuestao =
      disponiveis[Math.floor(Math.random() * disponiveis.length)];
    perguntas[indice] = novaQuestao;

    ajudasUsadas.pular = true;
    document.getElementById("help-skip").disabled = true;
    document.getElementById("help-skip").style.opacity = "0.5";

    mostrar(); // Atualiza a tela com a questão trocada
  } else {
    alert("Não há mais questões para troca.");
  }
}

function ajudaRemover() {
  if (ajudasUsadas.remover) return;
  const correta = perguntas[indice].c;
  const botoes = document.querySelectorAll(".btn-alt");

  for (let btn of botoes) {
    if (btn.innerText !== correta && !btn.disabled) {
      btn.disabled = true;
      btn.classList.add("removida");
      ajudasUsadas.remover = true;
      document.getElementById("help-remove").disabled = true;
      document.getElementById("help-remove").style.opacity = "0.5";
      break;
    }
  }
}

function ajudaDica() {
  if (ajudasUsadas.dica) return;

  const p = perguntas[indice];
  // Pega a dica personalizada do banco, ou uma padrão caso não exista
  const textoParaExibir = p.d || "Analise bem as alternativas antes de responder.";

  // Insere o texto no modal e exibe
  document.getElementById("texto-dica-modal").innerText = textoParaExibir;
  document.getElementById("modal-dica").style.display = "flex";

  // Marca como usada e desativa o botão
  ajudasUsadas.dica = true;
  const btn = document.getElementById("help-tip");
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  }
}

function fecharModalDica() {
  document.getElementById("modal-dica").style.display = "none";
}

const bancoFacil = [
  {
    q: "No Portugol, utilizamos comandos para interagir com o usuário. Quando queremos exibir uma mensagem na tela, usamos um comando específico. Qual comando é responsável por mostrar informações na tela?",
    a: ["leia()", "escreva()", "programa", "inicio"],
    c: "escreva()",
    d: "Pense no ato de registrar algo em um papel para que outros vejam.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778694620/Gemini_Generated_Image_swglleswglleswgl_kaafo7.png",
  },
  {
    q: "Todo código escrito em Portugol deve estar contido dentro de um bloco principal que define o início e o fim do código. Qual é o nome da estrutura obrigatória que 'abraça' todo o seu algoritmo?",
    a: ["leia()", "escreva()", "programa", "cadeia"],
    c: "programa",
    d: "É o bloco principal que engloba todo o código do programa.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778694620/Gemini_Generated_Image_swglleswglleswgl_kaafo7.png",
  },
  {
    q: "Você chegou ao fim de uma função no Portugol Studio. Qual símbolo fecha e encerra esse bloco de código?",
    a: ["}", ")", ">", "]"],
    c: "}",
    d: "É o símbolo que fecha o bloco de código da função.",
    // img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/1_tbpkoe.png",
  },
  {
    q: "A tela do console ficou cheia de informações. Qual será o efeito do comando limpa() no Portugol Studio?",
    a: ["O computador será desligado.", "O programa será excluído.", "Todas as mensagens exibidas anteriormente sumirão.", "As variáveis voltarão a valer zero."],
    c: "Todas as mensagens exibidas anteriormente sumirão.",
    d: "Pense no que acontece quando apagamos tudo que está escrito em um quadro para começar novamente.",
    // img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/1_tbpkoe.png",
  },



  {
    q: "No Portugol, cada variável precisa ter um tipo para armazenar informações corretamente. Quando queremos guardar textos, palavras ou nomes de pessoas, qual tipo devemos utilizar?",
    a: ["inteiro", "real", "cadeia", "escreva()"],
    c: "cadeia",
    d: "Imagine uma sequência ou 'corrente' de caracteres unidos.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/2_bscfrm.png",
  },
  {
    q: "No Portugol, os comentários são usados para adicionar explicações no código sem interferir na execução do programa. Qual símbolo é utilizado para iniciar um comentário de apenas uma linha?",
    a: ["//", "/*", "#", "///"],
    c: "//",
    d: "São dois sinais de divisão inclinados para a direita.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/3_jxnfdp.png",
  },
  {
    q: "No Portugol, utilizamos um símbolo de atribuição para guardar um valor dentro de uma variável. Qual símbolo é usado para fazer uma variável receber um valor?",
    a: ["==", "!=", "<-", "=>"],
    c: "<-",
    d: "É uma seta que indica o valor 'entrando' na variável.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088535/4_z2xq0w.png",
  },
  {
    q: "No Portugol, alguns tipos de variáveis são usados para armazenar números inteiros e outros para números com casas decimais. Qual tipo devemos utilizar para guardar números com vírgula?",
    a: ["inteiro", "real", "caracter", "vazio"],
    c: "real",
    d: "Refere-se ao conjunto dos números reais na matemática.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088534/5_ouxl3e.png",
  },
  // {
  //   q: "No Portugol, utilizamos estruturas de decisão para que o programa possa tomar decisões de acordo com uma condição. O comando 'se' serve para:",
  //   a: ["Repetir várias vezes", "Guardar valores", "Testar uma condição", "Encerrar o programa"],
  //   c: "Testar uma condição",
  //   d: "Funciona como uma pergunta: 'Isso é verdade?'.",
  //   img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088535/6_gxdves.png",
  // },
  {
    q: "No Portugol, o operador '%' é utilizado para calcular o resto de uma divisão inteira. Qual será o resultado da expressão 10 % 4?",
    a: ["3", "5", "2", "1"],
    c: "2",
    d: "Divida 10 por 4; o que sobrar dessa conta é a resposta.",
    // img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088536/7_lrlv35.png",
  },
  {
    q: "No Portugol, podemos permitir que o usuário digite informações pelo teclado durante a execução do programa. Qual comando é utilizado para ler dados digitados pelo usuário?",
    a: ["escreva()", "leia()", "teclado()", "pegar()"],
    c: "leia()",
    d: "É o comando oposto ao de mostrar informações na tela.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088537/8_tjbh70.png",
  },
  {
    q: "No Portugol, existe um tipo de variável utilizado para armazenar apenas dois valores possíveis: verdadeiro ou falso. Qual é o tipo usado para esse tipo de informação?",
    a: ["inteiro", "cadeia", "caracter", "logico"],
    c: "logico",
    d: "Baseia-se no raciocínio binário de sim ou não.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088538/9_xbrf05.png",
  },
  {
    q: "No Portugol, os laços de repetição são usados para executar várias vezes um mesmo bloco de código. Quando queremos repetir utilizando um contador com início, fim e incremento, qual laço devemos utilizar?",
    a: ["se", "escolha", "para", "pare"],
    c: "para",
    d: "É a estrutura ideal quando sabemos exatamente quantas vezes repetir.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088540/10_hzbbpq.png",
  },
];

const bancoMedio = [
  {
    q: "No Portugol, os operadores lógicos são usados para unir condições em testes e decisões. Qual operador representa a condição lógica 'E'?",
    a: ["&", "e", "and", "&&"],
    c: "e",
    d: "No Portugol o operador é escrito por extenso, igual à conjunção em português.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088602/1_xbsrxa.png",
  },
  {
    q: "No Portugol, os vetores começam no índice 0. Em um vetor com tamanho 5, qual será o índice da última posição?",
    a: ["5", "6", "4", "0"],
    c: "4",
    d: "Se começa em zero, o último é sempre o 'tamanho menos um'.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088603/2_js58f5.png",
  },
  {
    q: "Em lógica de programação, as operações matemáticas seguem uma ordem de prioridade. Qual será o resultado da expressão (5 + 3 * 2)?",
    a: ["16", "11", "13", "10"],
    c: "11",
    d: "A multiplicação deve ser resolvida antes da soma.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088604/3_padlrs.png",
  },
  {
    q: "No Portugol, o laço 'faca...enquanto' executa o bloco de código antes de verificar a condição. Isso garante que o código execute:",
    a: ["Zero vezes", "No máximo 1 vez", "Pelo menos 1 vez", "Para sempre"],
    c: "Pelo menos 1 vez",
    d: "A verificação só acontece no final da primeira volta.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088608/4_orsub6.png",
  },
  {
    q: "Durante um laço de repetição no Portugol, existe um comando utilizado para interromper a repetição imediatamente. Qual comando realiza essa ação?",
    a: ["pare", "parar", "stop", "sair"],
    c: "pare",
    d: "É a mesma palavra usada para encerrar um caso no comando 'escolha'.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088606/5_kaxbdz.png",
  },
  {
    q: "No Portugol, vetores são utilizados para armazenar vários valores do mesmo tipo. Como declaramos um vetor de inteiros com 3 posições?",
    a: ["inteiro v[3]", "vetor v(3)", "inteiro v = 3", "v[3]: inteiro"],
    c: "inteiro v[3]",
    d: "Usamos colchetes para definir o tamanho logo após o nome da variável.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088646/6_flaeui.png",
  },
  {
    q: "Os operadores lógicos também permitem testar alternativas em condições. Qual operador representa a condição lógica 'OU' no Portugol?",
    a: ["||", "ou", "or", "|"],
    c: "ou",
    d: "Assim como o operador 'e', este também é escrito por extenso.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088644/7_mm8lhw.png",
  },
  {
    q: "No comando 'escolha' do Portugol, utilizamos 'pare' para impedir que outros casos sejam executados. O que acontece se não utilizarmos 'pare' em um caso?",
    a: ["Erro de sintaxe", "Executa o próximo caso", "O programa trava", "Fecha o programa"],
    c: "Executa o próximo caso",
    d: "O programa continuará 'descendo' para as instruções abaixo.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088645/8_lamcbt.png",
  },
  {
    q: "No Portugol, expressões lógicas retornam verdadeiro ou falso. Qual será o resultado da expressão (10 > 5 e 3 < 1)?",
    a: ["verdadeiro", "falso", "erro", "nulo"],
    c: "falso",
    d: "Para o operador 'e' ser verdadeiro, AMBAS as condições precisam ser verdadeiras.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088646/9_ut40xa.png",
  },
  {
    q: "A biblioteca 'Util' do Portugol possui funções prontas para facilitar algumas tarefas. Qual função é utilizada para gerar números aleatórios?",
    a: ["aleatorio()", "sortear()", "random()", "gerar()"],
    c: "sortear()",
    d: "Pense em um sorteio de loteria ou de brindes.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088650/10_zvhql8.png",
  },
];

const bancoDificil = [
  {
    q: "Em uma matriz mat[3][4], o primeiro número (3) refere-se a:",
    a: ["Colunas", "Linhas", "Elementos", "Páginas"],
    c: "Linhas",
    d: "Em matrizes, a ordem padrão é sempre Linha primeiro, depois Coluna.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088677/1_tzjqzi.png",
  },
  {
    q: "Qual o resultado de: nao(5 > 2 ou 3 == 3)?",
    a: ["verdadeiro", "falso", "erro", "1"],
    c: "falso",
    d: "O comando 'nao' inverte o resultado final que está dentro dos parênteses.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088676/2_uae7us.png",
  },
  {
    q: "Como acessamos a quantidade de caracteres de uma cadeia?",
    a: ["tam()", "tamanho_texto()", "comp()", "extensao()"],
    c: "tamanho_texto()",
    d: "É uma função da biblioteca Texto; o nome é bem descritivo.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088678/3_mlonuy.png",
  },
  {
    q: "Para usar a função 'arredondar', como se importa a biblioteca?",
    a: ["import Matematica", "inclua biblioteca Matematica", "use Matematica", "load Matematica"],
    c: "inclua biblioteca Matematica",
    d: "A sintaxe padrão do Portugol Studio usa a palavra 'inclua'.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088679/4_cpzmtz.png",
  },
  {
    q: "Qual o resultado de 15 / 2 em uma variável inteira?",
    a: ["7.5", "7", "8", "Erro"],
    c: "7",
    d: "Variáveis inteiras descartam qualquer valor após a vírgula.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088680/5_luu6a0.png",
  },
  {
    q: "Qual estrutura é melhor para percorrer uma matriz completa?",
    a: ["Um laço 'para'", "Dois laços 'para' aninhados", "Um 'se' e um 'para'", "Estrutura 'escolha'"],
    c: "Dois laços 'para' aninhados",
    d: "Um laço controla as linhas e o outro as colunas.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088682/6_hqftzt.png",
  },
  {
    q: "O que a função 'u.aguarde(1000)' faz (Util)?",
    a: ["Soma 1000", "Pausa por 1 segundo", "Pausa por 10 segundos", "Gera o número 1000"],
    c: "Pausa por 1 segundo",
    d: "O valor dentro da função é medido em milissegundos.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088683/7_dwz5go.png",
  },
  {
    q: "Variáveis globais devem ser declaradas:",
    a: ["Dentro da função inicio", "Fora de qualquer função", "Dentro de um laço", "Ao final do programa"],
    c: "Fora de qualquer função",
    d: "Isso permite que todas as funções do programa acessem a variável.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088684/8_oufmge.png",
  },
  {
    q: "Qual o operador de negação lógica?",
    a: ["!", "not", "nao", "~"],
    c: "nao",
    d: "É a palavra que transforma verdadeiro em falso e vice-versa.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088685/9_jxrndd.png",
  },
  {
    q: "O que faz a função 'txt.extrair_subtexto(c, 0, 1)'?",
    a: ["Apaga o texto", "Pega a primeira letra", "Inverte o texto", "Pega a última letra"],
    c: "Pega a primeira letra",
    d: "Ela começa na posição 0 e termina antes da posição 1.",
    img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088686/10_vex57u.png",
  },
];

// --- CONFIGURAÇÃO INICIAL ---
const urlParams = new URLSearchParams(window.location.search);
const dificuldade = urlParams.get("nivel") || "facil";
const codigoSecreto = window.CONFIG_JOGO
  ? window.CONFIG_JOGO.codigoSecreto
  : "";
const LIMITE_TOTAL = 15 * 60 * 1000;

// Seleção do Banco (Certifique-se que os arrays bancoFacil, etc., estão aqui ou antes)
let bancoSelecionado =
  dificuldade === "dificil"
    ? bancoDificil
    : dificuldade === "medio"
      ? bancoMedio
      : bancoFacil;
let perguntas = bancoSelecionado.sort(() => Math.random() - 0.5).slice(0, 5);

let indice = 0,
  acertos = 0;
let timerRodando = true;
let tempoFinalSalvo = 0;
let podeSair = false;
const inicio = Date.now();

// Nova variável para rastrear quais dígitos foram liberados
let progressoCodigo = ["_", "_", "_", "_", "_"];

function mostrar() {
  // ... (sua função mostrar atual está correta)
  const p = perguntas[indice];
  const imgEl = document.getElementById("img-pergunta");
  imgEl.src = p.img;
  imgEl.style.display = "none";
  document.getElementById("num-questao").innerText =
    `Questão ${indice + 1} de 5`;
  document.getElementById("texto-pergunta").innerText = p.q;
  const container = document.getElementById("container-alternativas");
  container.innerHTML = "";
  [...p.a]
    .sort(() => Math.random() - 0.5)
    .forEach((txt) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-alt";
      btn.innerText = txt;
      btn.onclick = () => validar(txt, btn);
      container.appendChild(btn);
    });
}

function validar(escolha, btnClicado) {
  const correta = perguntas[indice].c;
  document.querySelectorAll(".btn-alt").forEach((b) => (b.disabled = true));

  if (escolha === correta) {
    btnClicado.classList.add("correta");
    acertos++;

    // LIBERA O DÍGITO CORRESPONDENTE AO ÍNDICE DA QUESTÃO
    // O código secreto vem do Django via CONFIG_JOGO
    if (codigoSecreto && codigoSecreto[indice]) {
      progressoCodigo[indice] = codigoSecreto[indice];
    }
  } else {
    btnClicado.classList.add("errada");
    document.querySelectorAll(".btn-alt").forEach((b) => {
      if (b.innerText === correta) b.classList.add("correta");
    });
    // Se errou, aquele índice continua como "_" no progressoCodigo
  }

  // DESATIVAR AJUDAS NA ÚLTIMA QUESTÃO
  if (indice === 4) {
    ["help-skip", "help-remove", "help-tip"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.5";
      }
    });
  }

  document.getElementById("btn-proxima").style.display = "block";
}

function proxima() {
  indice++;
  if (indice < 5) {
    document.getElementById("btn-proxima").style.display = "none";
    mostrar();
  } else {
    finalizar();
  }
}

function finalizar() {
  if (!timerRodando) return;
  timerRodando = false;
  tempoFinalSalvo = Date.now() - inicio;

  // EXIBE O CÓDIGO COLETADO NO MODAL
  // Junta o array ["1", "_", "3", "_", "5"] em "1 _ 3 _ 5"
  const revisaoEl = document.getElementById("revisao-codigo");
  if (revisaoEl) {
    revisaoEl.innerText = progressoCodigo.join(" ");
  }

  document.getElementById("modal-final").style.display = "flex";
}

async function confirmarIrParaCofre() {
  podeSair = true; // Libera o bloqueio de saída da página

  const dados = {
    nome: localStorage.getItem("usuarioAtual"),
    acertos: acertos,
    tempo: tempoFinalSalvo,
    tempoTexto: formatar(tempoFinalSalvo),
    nivel: dificuldade,
  };

  const urlSalvar = window.CONFIG_JOGO ? window.CONFIG_JOGO.urlSalvar : "";
  const urlCofre = window.CONFIG_JOGO ? window.CONFIG_JOGO.urlCofre : "";
  const token = window.CONFIG_JOGO ? window.CONFIG_JOGO.csrfToken : "";

  try {
    await fetch(urlSalvar, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      body: JSON.stringify(dados),
    });
  } catch (e) {
    console.error("Erro ao salvar dados:", e);
  }

  // Redirecionamento Final
  window.location.href = urlCofre;
}

function formatar(ms) {
  if (ms < 0) ms = 0;
  const m = Math.floor(ms / 60000)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const mil = (ms % 1000).toString().padStart(3, "0");
  return `${m}:${s}.${mil}`;
}

const loopTimer = setInterval(() => {
  if (timerRodando) {
    const decorrido = Date.now() - inicio;
    document.getElementById("timer").innerText = formatar(decorrido);
  } else {
    clearInterval(loopTimer);
  }
}, 50);

window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("beforeunload", (e) => {
  if (!podeSair) {
    e.preventDefault();
    e.returnValue = "";
  }
});

mostrar();
