document.addEventListener('DOMContentLoaded', function() {
    const PALAVRAS_PADRAO = ["exemplo", "forca", "javascript", "projeto", "estudante"];
    const LOCAL_STORAGE_PALAVRAS_KEY = 'palavrasForca';
    const LOCAL_STORAGE_HISTORICO_KEY = 'historicoForca';
    const displayPalavra = document.getElementById('display-palavra');
    const mensagem = document.getElementById('mensagem');
    const entradaLetra = document.getElementById('entrada-letra');
    const botaoTentar = document.getElementById('botao-tentar');
    const letrasTentadasDisplay = document.getElementById('letras-tentadas');
    const botaoRetornarMenu = document.getElementById('retorna-menu');
    const imagemForca = document.getElementById('imagem-forca');

    let nomeJogador;
    let palavra;
    let letrasDescobertas = new Set();
    let letrasTentadas = new Set();
    let tentativas = 0;
    const maxTentativas = 6;

    function carregarPalavras() {
        const palavras = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PALAVRAS_KEY));
        return palavras ? PALAVRAS_PADRAO.concat(palavras) : PALAVRAS_PADRAO;
    }

    function iniciarJogo() {
        nomeJogador = prompt('Qual é o seu nome?');
        const palavras = carregarPalavras();
        palavra = palavras[Math.floor(Math.random() * palavras.length)];
        letrasDescobertas.clear();
        letrasTentadas.clear();
        tentativas = 0;
        mensagem.textContent = '';
        atualizarDisplay();
        atualizarLetrasTentadas();
        atualizarImagemForca();
        entradaLetra.disabled = false;
        botaoTentar.disabled = false;
    }

    function atualizarDisplay() {
        let palavraExibida = '';
        for (const letra of palavra) {
            palavraExibida += letrasDescobertas.has(letra) ? letra : '_';
            palavraExibida += ' ';
        }
        displayPalavra.textContent = palavraExibida.trim();
        mensagem.textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;
    }

    function atualizarLetrasTentadas() {
        letrasTentadasDisplay.textContent = Array.from(letrasTentadas).join(', ');
    }

    function atualizarImagemForca() {
        const imgIndex = maxTentativas - tentativas;
        imagemForca.src = `../img/hangman${imgIndex}.jpg`;
    }

    function verificarVitoria() {
        return palavra.split('').every(letra => letrasDescobertas.has(letra));
    }

    function verificarDerrota() {
        return tentativas >= maxTentativas;
    }

    function exibirMensagem(msg, vitoria) {
        const mensagemResultado = document.createElement('p');
        mensagemResultado.textContent = msg;
        mensagemResultado.classList.add(vitoria ? 'vitoria' : 'derrota');
        mensagem.appendChild(mensagemResultado);
    }

    function salvarHistorico(nomeJogador, palavra, tentativas, venceu) {
        const historico = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HISTORICO_KEY)) || [];
        historico.unshift({ nomeJogador, palavra, tentativas, venceu });
        localStorage.setItem(LOCAL_STORAGE_HISTORICO_KEY, JSON.stringify(historico));
    }

    function finalizarJogo(vitoria) {
        const mensagemResultado = vitoria ? 'Você ganhou!' : `Você perdeu! A palavra era: ${palavra}`;
        exibirMensagem(mensagemResultado, vitoria);
        salvarHistorico(nomeJogador, palavra, tentativas, vitoria);

        // Desabilitar entrada e botões
        entradaLetra.disabled = true;
        botaoTentar.disabled = true;

        if (!vitoria) {
            const botaoReiniciar = document.createElement('button');
            botaoReiniciar.textContent = 'Tentar novamente';
            botaoReiniciar.classList.add('botao');
            botaoReiniciar.addEventListener('click', reiniciarJogo);
            mensagem.appendChild(botaoReiniciar);
        }
    }

    function reiniciarJogo() {
        iniciarJogo();
    }

    function tentarLetra() {
        const letra = entradaLetra.value.trim().toLowerCase();
        
        // Verifica se a entrada é uma letra válida
        if (!/^[a-z]$/.test(letra)) {
            mensagem.textContent = 'Por favor, insira apenas letras.';
            entradaLetra.value = '';
            entradaLetra.focus();
            return;
        }

        if (letrasTentadas.has(letra)) {
            mensagem.textContent = 'Você já tentou essa letra uma vez, tente outra!';
            entradaLetra.value = '';
            entradaLetra.focus();
            return;
        }

        if (letra && letra.length === 1) {
            letrasTentadas.add(letra);
            if (!palavra.includes(letra)) {
                tentativas++;
            } else {
                letrasDescobertas.add(letra);
            }
            atualizarDisplay();
            atualizarLetrasTentadas();
            atualizarImagemForca();
            if (verificarVitoria()) {
                finalizarJogo(true);
            } else if (verificarDerrota()) {
                finalizarJogo(false);
            }
        }
        entradaLetra.value = '';
        entradaLetra.focus();
    }

    botaoTentar.addEventListener('click', tentarLetra);

    entradaLetra.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            tentarLetra();
        }
    });

    if (botaoRetornarMenu) {
        botaoRetornarMenu.addEventListener('click', function() {
            window.location.href = '../menu/menu.html'; // Volta ao menu principal
        });
    }

    iniciarJogo();
});
