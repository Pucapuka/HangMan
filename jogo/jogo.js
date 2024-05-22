document.addEventListener('DOMContentLoaded', function() {
    const PALAVRAS = ["exemplo", "forca", "javascript", "projeto", "estudante"];
    const displayPalavra = document.getElementById('display-palavra');
    const mensagem = document.getElementById('mensagem');
    const entradaLetra = document.getElementById('entrada-letra');
    const botaoTentar = document.getElementById('botao-tentar');
    const listaHistorico = document.getElementById('lista-historico');
    let nomeJogador;
    const botaoRetornarMenu = document.getElementById('retorna-menu');

    let palavra;
    let letrasDescobertas = new Set();
    let letrasTentadas = new Set();
    let tentativas = 0;
    const maxTentativas = 6;

    function iniciarJogo() {
        nomeJogador = prompt('Qual é o seu nome?');
        palavra = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
        letrasDescobertas.clear();
        letrasTentadas.clear();
        tentativas = 0;
        atualizarDisplay();
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
        const itemHistorico = document.createElement('tr');
        itemHistorico.innerHTML = `
            <td>${nomeJogador}</td>
            <td>${palavra}</td>
            <td>${tentativas}</td>
            <td>${venceu ? 'Sim' : 'Não'}</td>
        `;
        listaHistorico.prepend(itemHistorico);
    }

    function finalizarJogo(vitoria) {
        const mensagemResultado = vitoria ? 'Você ganhou!' : `Você perdeu! A palavra era: ${palavra}`;
        exibirMensagem(mensagemResultado, vitoria);
        salvarHistorico(nomeJogador, palavra, tentativas, vitoria);
        iniciarJogo();
    }

    function tentarLetra() {
        const letra = entradaLetra.value.trim().toLowerCase();
        if (letra && letra.length === 1 && !letrasTentadas.has(letra)) {
            letrasTentadas.add(letra);
            if (!palavra.includes(letra)) {
                tentativas++;
            } else {
                letrasDescobertas.add(letra);
            }
            atualizarDisplay();
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
            window.location.href = 'C:/Users/lilin/.vscode/IFMA/EngenhariaDeSoftware/web/HangMan/menu/menu.html'; // Volta ao menu principal
        });
    }

    iniciarJogo();
});
