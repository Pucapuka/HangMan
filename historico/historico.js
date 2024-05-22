document.addEventListener('DOMContentLoaded', function() {
    const LOCAL_STORAGE_HISTORICO_KEY = 'historicoForca';
    const listaHistorico = document.getElementById('lista-historico');
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

    if (botaoRetornarMenu) {
        botaoRetornarMenu.addEventListener('click', function() {
            window.location.href = 'C:/Users/lilin/.vscode/IFMA/EngenhariaDeSoftware/web/HangMan/menu/menu.html'; // Volta ao menu principal
        });
    }

    exibirHistorico();
});
