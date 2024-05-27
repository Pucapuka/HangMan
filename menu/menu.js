document.addEventListener('DOMContentLoaded', function() {
    const LOCAL_STORAGE_PALAVRAS_KEY = 'palavrasForca';
    const formAdicionarPalavra = document.getElementById('form-adicionar-palavra');
    const novaPalavraInput = document.getElementById('nova-palavra');
    const botaoSair = document.getElementById('sair-btn');

    function carregarPalavras() {
        const palavras = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PALAVRAS_KEY));
        return palavras ? palavras : [];
    }

    function salvarPalavras(palavras) {
        localStorage.setItem(LOCAL_STORAGE_PALAVRAS_KEY, JSON.stringify(palavras));
    }

    formAdicionarPalavra.addEventListener('submit', function(event) {
        event.preventDefault();
        const novaPalavra = novaPalavraInput.value.trim().toLowerCase();
        if (novaPalavra) {
            const palavras = carregarPalavras();
            palavras.push(novaPalavra);
            salvarPalavras(palavras);
            novaPalavraInput.value = '';
            alert('Palavra adicionada com sucesso!');
        }
    });

    botaoSair.addEventListener('click', function() {
        window.close(); // Fecha a janela atual quando o botão Sair é clicado
    });
});
