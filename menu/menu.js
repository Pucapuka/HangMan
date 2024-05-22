// let nomeJogador;
// document.addEventListener('DOMContentLoaded', function() {
//     const PALAVRAS_PADRAO = ["exemplo", "forca", "javascript", "projeto", "estudante"];
//     const LOCAL_STORAGE_PALAVRAS_KEY = 'palavrasForca';
//     const LOCAL_STORAGE_HISTORICO_KEY = 'historicoForca';

//     function carregarPalavras() {
//         const palavras = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PALAVRAS_KEY));
//         return palavras ? palavras : PALAVRAS_PADRAO;
//     }

//     function salvarPalavras(palavras) {
//         localStorage.setItem(LOCAL_STORAGE_PALAVRAS_KEY, JSON.stringify(palavras));
//     }

//     function carregarHistorico() {
//         const historico = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HISTORICO_KEY));
//         return historico ? historico : [];
//     }

//     function salvarHistorico(historico) {
//         localStorage.setItem(LOCAL_STORAGE_HISTORICO_KEY, JSON.stringify(historico));
//     }

//     let palavras = carregarPalavras();
//     let historico = carregarHistorico();

//     const displayPalavra = document.getElementById('display-palavra');
//     const mensagem = document.getElementById('mensagem');
//     const entradaLetra = document.getElementById('entrada-letra');
//     const botaoTentar = document.getElementById('botao-tentar');
//     const botaoAdicionarPalavra = document.getElementById('botao-adicionar-palavra');
//     const entradaNovaPalavra = document.getElementById('entrada-nova-palavra');
//     const botaoSair = document.getElementById('botao-sair');
//     const botaoRetornarMenu = document.getElementById('retornar-menu');

//     let palavra;
//     let letrasDescobertas = new Set();
//     let letrasTentadas = new Set();
//     let tentativas = 0;
//     const maxTentativas = 6;

//     function iniciarJogo() {
//         nomeJogador = prompt('Qual é o seu nome?');
//         palavra = palavras[Math.floor(Math.random() * palavras.length)];
//         letrasDescobertas.clear();
//         letrasTentadas.clear();
//         tentativas = 0;
//         atualizarDisplay();
//     }

//     function atualizarDisplay() {
//         let palavraExibida = '';
//         for (const letra of palavra) {
//             palavraExibida += letrasDescobertas.has(letra) ? letra : '_';
//             palavraExibida += ' ';
//         }
//         displayPalavra.textContent = palavraExibida.trim();
//         mensagem.textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;
//     }

//     function verificarVitoria() {
//         return palavra.split('').every(letra => letrasDescobertas.has(letra));
//     }

//     function verificarDerrota() {
//         return tentativas >= maxTentativas;
//     }

//     function exibirMensagem(msg, vitoria) {
//         const mensagemResultado = document.createElement('p');
//         mensagemResultado.textContent = msg;
//         mensagemResultado.classList.add(vitoria ? 'vitoria' : 'derrota');
//         mensagem.appendChild(mensagemResultado);
//     }

//     function salvarNoHistorico(nomeJogador, palavra, tentativas, venceu) {
//         const itemHistorico = {
//             nomeJogador,
//             palavra,
//             tentativas,
//             venceu
//         };
//         historico.push(itemHistorico);
//         salvarHistorico(historico);
//     }

//     function finalizarJogo(vitoria) {
//         const mensagemResultado = vitoria ? 'Você ganhou!' : `Você perdeu! A palavra era: ${palavra}`;
//         exibirMensagem(mensagemResultado, vitoria);
//         salvarNoHistorico('Jogador', palavra, tentativas, vitoria);
//         iniciarJogo();
//     }

    // botaoTentar.addEventListener('click', function() {
    //     const letra = entradaLetra.value.trim().toLowerCase();
    //     if (letra && letra.length === 1 && !letrasTentadas.has(letra)) {
    //         letrasTentadas.add(letra);
    //         if (!palavra.includes(letra)) {
    //             tentativas++;
    //         } else {
    //             letrasDescobertas.add(letra);
    //         }
    //         atualizarDisplay();
    //         if (verificarVitoria()) {
    //             finalizarJogo(true);
    //         } else if (verificarDerrota()) {
    //             finalizarJogo(false);
    //         }
    //     }
    //     entradaLetra.value = '';
    //     entradaLetra.focus();
    // });

    // botaoAdicionarPalavra.addEventListener('click', function() {
    //     const novaPalavra = entradaNovaPalavra.value.trim().toLowerCase();
    //     if (novaPalavra && !palavras.includes(novaPalavra)) {
    //         palavras.push(novaPalavra);
    //         salvarPalavras(palavras);
    //         entradaNovaPalavra.value = '';
    //         alert('Palavra adicionada com sucesso!');
    //     } else {
    //         alert('Palavra inválida ou já existente!');
    //     }
    // });

    // if (botaoSair) {
    //     botaoSair.addEventListener('click', function() {
    //         window.location.href = 'menu.html'; // Volta ao menu principal
    //     });
    // }

//     if(botaoRetornarMenu){
//         botaoRetornarMenu.addEventListener('click', function() {
//         window.location.href ='menu.html'; // Volta ao menu principal
//     });
//    }

//     iniciarJogo();
// });
