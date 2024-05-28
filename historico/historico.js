 document.addEventListener('DOMContentLoaded', function() {
            const LOCAL_STORAGE_HISTORICO_KEY = 'historicoForca';
            const listaHistorico = document.getElementById('lista-historico');
            const botaoLimparHistorico = document.getElementById('limpar-historico');
	    const botaoRetornarMenu = document.getElementById('retornar-menu');

            function carregarHistorico() {
                const historico = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HISTORICO_KEY));
                return historico ? historico : [];
            }

            function exibirHistorico() {
                const historico = carregarHistorico();
                historico.forEach(item => {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                        <td>${item.nomeJogador}</td>
                        <td>${item.palavra}</td>
                        <td>${item.tentativas}</td>
                        <td>${item.venceu ? 'Sim' : 'Não'}</td>
                    `;
                    listaHistorico.appendChild(linha);
                });
            }

            function limparHistorico() {
                localStorage.removeItem(LOCAL_STORAGE_HISTORICO_KEY);
                listaHistorico.innerHTML = ''; // Limpa o conteúdo da lista na página
            }

            if (botaoLimparHistorico) {
                botaoLimparHistorico.addEventListener('click', limparHistorico);
            }

	    if (botaoRetornarMenu) {
        botaoRetornarMenu.addEventListener('click', function() {
            window.location.href = '../menu/menu.html'; // Volta ao menu principal
        		});
		}

            exibirHistorico();
        });
