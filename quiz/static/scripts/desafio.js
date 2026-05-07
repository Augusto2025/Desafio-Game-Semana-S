// --- SISTEMA DE AJUDAS (Uso único) ---
let ajudasUsadas = {
    pular: false,
    remover: false,
    dica: false
};

function toggleImagem() {
    const img = document.getElementById("img-pergunta");
    img.style.display = (img.style.display === "none" || img.style.display === "") ? "block" : "none";
}

function ajudaPular() {
    if (ajudasUsadas.pular) return;

    // Filtra questões do banco que não estão no seu teste atual de 5 perguntas
    const disponiveis = bancoSelecionado.filter(q => !perguntas.includes(q));

    if (disponiveis.length > 0) {
        // Sorteia uma nova e substitui a questão no índice atual
        const novaQuestao = disponiveis[Math.floor(Math.random() * disponiveis.length)];
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
    let textoDica = "Analise bem a sintaxe do comando.";
    
    if(p.c.includes("()")) textoDica = "Esta resposta é uma função, observe os parênteses.";
    if(p.c === "cadeia") textoDica = "Pense em uma 'corrente' de caracteres unidos.";
    
    alert("💡 DICA: " + textoDica);
    ajudasUsadas.dica = true;
    document.getElementById("help-tip").disabled = true;
    document.getElementById("help-tip").style.opacity = "0.5";
}

const bancoFacil = [
    {
        q: "Qual comando mostra algo na tela?",
        a: ["leia()", "escreva()", "programa", "inicio"],
        c: "escreva()",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/1_tbpkoe.png"
    },
    {
        q: "Para guardar um nome usamos o tipo:",
        a: ["inteiro", "real", "cadeia", "logico"],
        c: "cadeia",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/2_bscfrm.png"
    },
    {
        q: "Como se inicia um comentário de uma linha?",
        a: ["//", "/*", "#", "--"],
        c: "//",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088533/3_jxnfdp.png"
    },
    {
        q: "Qual o símbolo para atribuir valor (receber)?",
        a: ["==", "=", "<-", "+"],
        c: "<-",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088535/4_z2xq0w.png"
    },
    {
        q: "Qual tipo usamos para números com vírgula?",
        a: ["inteiro", "real", "caracter", "vazio"],
        c: "real",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088534/5_ouxl3e.png",
    },
    {
        q: "O comando 'se' serve para:",
        a: ["Repetir", "Finalizar", "Decisão/Condição", "Ler dados"],
        c: "Decisão/Condição",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088535/6_gxdves.png"
    },
    {
        q: "Qual o resultado de 10 % 3 (resto)?",
        a: ["3", "1", "0", "10"],
        c: "1",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088536/7_lrlv35.png"
    },
    {
        q: "Como lemos algo do teclado?",
        a: ["escreva()", "leia()", "teclado()", "pegar()"],
        c: "leia()",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088537/8_tjbh70.png"
    },
    {
        q: "Um valor Verdadeiro ou Falso é do tipo:",
        a: ["inteiro", "cadeia", "caracter", "logico"],
        c: "logico",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088538/9_xbrf05.png",
    },
    {
        q: "Qual laço de repetição usamos com contador?",
        a: ["se", "escolha", "para", "pare"],
        c: "para",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088540/10_hzbbpq.png",
    },
];

const bancoMedio = [
    {
        q: "Qual o operador lógico para 'E' em Portugol?",
        a: ["&", "e", "and", "&&"],
        c: "e",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088602/1_xbsrxa.png",
    },
    {
        q: "Em um vetor de tamanho 5, qual o índice do último elemento?",
        a: ["5", "6", "4", "0"],
        c: "4",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088603/2_js58f5.png",
    },
    {
        q: "Qual o resultado da expressão (5 + 3 * 2)?",
        a: ["16", "11", "13", "10"],
        c: "11",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088604/3_padlrs.png",
    },
    {
        q: "O laço 'faca...enquanto' garante que o código execute:",
        a: ["Zero vezes", "No máximo 1 vez", "Pelo menos 1 vez", "Para sempre"],
        c: "Pelo menos 1 vez",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088608/4_orsub6.png",
    },
    {
        q: "Qual comando interrompe um laço imediatamente?",
        a: ["pare", "parar", "stop", "sair"],
        c: "pare",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088606/5_kaxbdz.png",
    },
    {
        q: "Como se declara um vetor de inteiros com 3 posições?",
        a: ["inteiro v[3]", "vetor v(3)", "inteiro v = 3", "v[3]: inteiro"],
        c: "inteiro v[3]",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088646/6_flaeui.png",
    },
    {
        q: "Qual o operador para 'OU' em Portugol?",
        a: ["||", "ou", "or", "|"],
        c: "ou",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088644/7_mm8lhw.png",
    },
    {
        q: "O que acontece se não usarmos 'pare' no 'caso' do 'escolha'?",
        a: ["Erro de sintaxe", "Executa o próximo caso", "O programa trava", "Fecha o programa"],
        c: "Executa o próximo caso",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088645/8_lamcbt.png",
    },
    {
        q: "A expressão (10 > 5 e 3 < 1) resulta em:",
        a: ["verdadeiro", "falso", "erro", "nulo"],
        c: "falso",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088646/9_ut40xa.png",
    },
    {
        q: "Qual função da biblioteca 'Util' gera números aleatórios?",
        a: ["aleatorio()", "sortear()", "random()", "gerar()"],
        c: "sortear()",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088650/10_zvhql8.png",
    },
];

const bancoDificil = [
    {
        q: "Em uma matriz mat[3][4], o primeiro número (3) refere-se a:",
        a: ["Colunas", "Linhas", "Elementos", "Páginas"],
        c: "Linhas",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088677/1_tzjqzi.png",
    },
    {
        q: "Qual o resultado de: nao(5 > 2 ou 3 == 3)?",
        a: ["verdadeiro", "falso", "erro", "1"],
        c: "falso",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088676/2_uae7us.png",
    },
    {
        q: "Como acessamos a quantidade de caracteres de uma cadeia?",
        a: ["tam()", "tamanho_texto()", "comp()", "extensao()"],
        c: "tamanho_texto()",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088678/3_mlonuy.png",
    },
    {
        q: "Para usar a função 'arredondar', como se importa a biblioteca?",
        a: ["import Matematica", "inclua biblioteca Matematica", "use Matematica", "load Matematica"],
        c: "inclua biblioteca Matematica",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088679/4_cpzmtz.png",
    },
    {
        q: "Qual o resultado de 15 / 2 em uma variável inteira?",
        a: ["7.5", "7", "8", "Erro"],
        c: "7",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088680/5_luu6a0.png",
    },
    {
        q: "Qual estrutura é melhor para percorrer uma matriz completa?",
        a: ["Um laço 'para'", "Dois laços 'para' aninhados", "Um 'se' e um 'para'", "Estrutura 'escolha'"],
        c: "Dois laços 'para' aninhados",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088682/6_hqftzt.png",
    },
    {
        q: "O que a função 'u.aguarde(1000)' faz (Util)?",
        a: ["Soma 1000", "Pausa por 1 segundo", "Pausa por 10 segundos", "Gera o número 1000"],
        c: "Pausa por 1 segundo",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088683/7_dwz5go.png",
    },
    {
        q: "Variáveis globais devem ser declaradas:",
        a: ["Dentro da função inicio", "Fora de qualquer função", "Dentro de um laço", "Ao final do programa"],
        c: "Fora de qualquer função",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088684/8_oufmge.png",
    },
    {
        q: "Qual o operador de negação lógica?",
        a: ["!", "not", "nao", "~"],
        c: "nao",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088685/9_jxrndd.png",
    },
    {
        q: "O que faz a função 'txt.extrair_subtexto(c, 0, 1)'?",
        a: ["Apaga o texto", "Pega a primeira letra", "Inverte o texto", "Pega a última letra"],
        c: "Pega a primeira letra",
        img: "https://res.cloudinary.com/dw0pxfap3/image/upload/v1778088686/10_vex57u.png",
    },
];

// --- CONFIGURAÇÃO INICIAL ---
const urlParams = new URLSearchParams(window.location.search);
const dificuldade = urlParams.get("nivel") || "facil";
const codigoSecreto = window.CONFIG_JOGO ? window.CONFIG_JOGO.codigoSecreto : "";
const LIMITE_TOTAL = 15 * 60 * 1000;

// Seleção do Banco (Certifique-se que os arrays bancoFacil, etc., estão aqui ou antes)
let bancoSelecionado = dificuldade === "dificil" ? bancoDificil : (dificuldade === "medio" ? bancoMedio : bancoFacil);
let perguntas = bancoSelecionado.sort(() => Math.random() - 0.5).slice(0, 5);

let indice = 0, acertos = 0;
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
    document.getElementById("num-questao").innerText = `Questão ${indice + 1} de 5`;
    document.getElementById("texto-pergunta").innerText = p.q;
    const container = document.getElementById("container-alternativas");
    container.innerHTML = "";
    [...p.a].sort(() => Math.random() - 0.5).forEach((txt) => {
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
        ["help-skip", "help-remove", "help-tip"].forEach(id => {
            const btn = document.getElementById(id);
            if(btn) { btn.disabled = true; btn.style.opacity = "0.5"; }
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
    const m = Math.floor(ms / 60000).toString().padStart(2, "0");
    const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
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