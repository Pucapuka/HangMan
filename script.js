document.addEventListener('DOMContentLoaded', function() {
    const PALAVRAS = ["exemplo", "forca", "javascript", "projeto", "estudante"];
    const displayPalavra = document.getElementById('display-palavra');
    const mensagem = document.getElementById('mensagem');
    const entradaLetra = document.getElementById('entrada-letra');
    const botaoTentar = document.getElementById('botao-tentar');
    const tabelaHistorico = document.getElementById('tabela-historico');
    const listaHistorico = document.getElementById('lista-historico');

    let palavra;
    let letrasDescobertas = new Set();
    let letrasTentadas = new Set();
    let tentativas = 0;
    const maxTentativas = 6;

    function iniciarJogo() {
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
        salvarHistorico('Jogador', palavra, tentativas, vitoria);
        iniciarJogo();
    }

    botaoTentar.addEventListener('click', function() {
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
    });

    iniciarJogo();
});

document.addEventListener('DOMContentLoaded', function() {
    const botaoSair = document.getElementById('botao-sair');
    botaoSair.addEventListener('click', function() {
        window.close(); // Fecha a janela atual quando o botão Sair é clicado
    });
});
