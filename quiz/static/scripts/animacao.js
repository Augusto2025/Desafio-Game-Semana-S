document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.animacao-fundo');
    const quantidade = 30;

    const caminhoImagem = container.getAttribute("data-img");

    function criarBolha() {
        const bolha = document.createElement("img");

        bolha.src = caminhoImagem;
        bolha.classList.add("bolha");

        // 🔥 PROFUNDIDADE
        const profundidade = Math.random();

        // 🔵 TAMANHO
        const tamanho = 30 + (profundidade * 90);
        bolha.style.width = tamanho + 'px';
        bolha.style.height = tamanho + 'px';

        // 📏 POSIÇÃO HORIZONTAL
        const larguraTela = window.innerWidth;
        const margem = 50;
        const posicaoX = margem + Math.random() * (larguraTela - tamanho - margem * 2);
        bolha.style.left = posicaoX + 'px';

        // ⏱️ VELOCIDADE
        const duracao = 18 - (profundidade * 10);
        bolha.style.animationDuration = duracao + 's';

        // 🔄 ROTAÇÃO INICIAL
        const rotacaoInicial = Math.random() * 360;
        bolha.style.setProperty('--rotacao-inicial', rotacaoInicial + 'deg');

        // 📍 POSIÇÃO INICIAL
        bolha.style.top = Math.random() * 100 + '%';

        // 🔥 COMEÇA NO MEIO
        bolha.style.animationDelay = -(Math.random() * duracao) + 's';

        // 🌫️ OPACIDADE
        bolha.style.opacity = 0.2 + (profundidade * 0.6);

        // 🧠 BLUR
        bolha.style.filter = `blur(${(1 - profundidade) * 2}px)`;

        container.appendChild(bolha);

        // ♾️ LOOP
        bolha.addEventListener("animationend", () => {
            bolha.remove();
            criarBolha();
        });
    }

    for (let i = 0; i < quantidade; i++) {
        criarBolha();
    }
});