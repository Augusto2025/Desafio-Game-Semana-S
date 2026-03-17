class CodeRanking {
    constructor() {
        this.tempoInicio = null;
        this.timerInterval = null;
        this.usuarioAtual = null;
        this.desafioAtual = null;
        
        this.init();
    }

    async init() {
        await this.carregarDesafio();
        await this.atualizarRanking();
        this.setupEventListeners();
    }

    async carregarDesafio() {
        try {
            const response = await fetch('http://localhost:3000/api/desafios');
            const desafios = await response.json();
            this.desafioAtual = desafios[0]; // Pega o primeiro desafio
            
            document.getElementById('desafio-titulo').textContent = this.desafioAtual.titulo;
            document.getElementById('desafio-descricao').textContent = this.desafioAtual.descricao;
            document.getElementById('desafio-teste').textContent = this.desafioAtual.casoTeste;
        } catch (error) {
            console.error('Erro ao carregar desafio:', error);
        }
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.iniciarDesafio());
        document.getElementById('submitBtn').addEventListener('click', () => this.enviarSolucao());
        document.getElementById('cadastrarBtn').addEventListener('click', () => this.cadastrarUsuario());
    }

    iniciarDesafio() {
        if (!this.usuarioAtual) {
            alert('Por favor, cadastre-se primeiro!');
            return;
        }

        this.tempoInicio = Date.now();
        this.iniciarTimer();
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('submitBtn').disabled = false;
        document.getElementById('code').disabled = false;
        document.getElementById('code').value = '';
        document.getElementById('code').focus();
    }

    iniciarTimer() {
        this.timerInterval = setInterval(() => {
            const tempoAtual = Date.now();
            const tempoDecorrido = tempoAtual - this.tempoInicio;
            document.getElementById('timer').textContent = this.formatarTempo(tempoDecorrido);
        }, 10);
    }

    pararTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    formatarTempo(ms) {
        const minutos = Math.floor(ms / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        const milissegundos = ms % 1000;
        
        return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}.${milissegundos.toString().padStart(3, '0')}`;
    }

    async enviarSolucao() {
        const codigo = document.getElementById('code').value;
        
        if (!codigo.trim()) {
            alert('Por favor, escreva seu código!');
            return;
        }

        this.pararTimer();
        const tempoTotal = Date.now() - this.tempoInicio;

        try {
            // Aqui você pode adicionar validação do código
            // Por enquanto, vamos apenas registrar o tempo
            
            await this.registrarTempo(tempoTotal);
            
            alert(`Parabéns! Você resolveu em ${this.formatarTempo(tempoTotal)}`);
            
            document.getElementById('startBtn').disabled = false;
            document.getElementById('submitBtn').disabled = true;
            
            await this.atualizarRanking();
        } catch (error) {
            console.error('Erro ao enviar solução:', error);
            alert('Erro ao registrar sua solução. Tente novamente.');
        }
    }

    async registrarTempo(tempo) {
        const response = await fetch('http://localhost:3000/api/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.usuarioAtual,
                tempo: tempo,
                desafioId: this.desafioAtual.id
            })
        });
        
        return await response.json();
    }

    async atualizarRanking() {
        try {
            const response = await fetch('http://localhost:3000/api/ranking');
            const ranking = await response.json();
            this.renderizarRanking(ranking);
        } catch (error) {
            console.error('Erro ao atualizar ranking:', error);
        }
    }

    renderizarRanking(ranking) {
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';

        ranking.slice(0, 10).forEach((item, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = `ranking-item ${index < 3 ? `medal-${index + 1}` : ''}`;
            
            rankingItem.innerHTML = `
                <span>${index + 1}º</span>
                <span>${item.nome}</span>
                <span>${this.formatarTempo(item.tempo)}</span>
            `;
            
            rankingList.appendChild(rankingItem);
        });
    }

    cadastrarUsuario() {
        const nome = document.getElementById('nome').value.trim();
        
        if (!nome) {
            alert('Por favor, digite seu nome!');
            return;
        }

        this.usuarioAtual = nome;
        alert(`Usuário ${nome} cadastrado com sucesso!`);
        
        document.getElementById('nome').value = '';
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new CodeRanking();
});