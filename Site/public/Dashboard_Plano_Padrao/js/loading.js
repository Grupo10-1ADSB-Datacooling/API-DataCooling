function exibirConteudo(){
    var loading = document.querySelector('#loading');
    var header = document.querySelector('header');
    var container = document.querySelector('.container');
    var dashboard = document.querySelector('.dashboard');

    // Estilo para que o loader fique invísivel
    loading.style.display = 'none';
    // Estilo para que o header e o container fiquem visíveis
    header.style.display = 'flex';
    container.style.display = 'flex';
    // Assim que a janela carregar chama a função validarSessao() que está no funcoes.js
    window.onload = validarSessao();
}

// Função para aparecer o loader nas páginas, ela recebe como parametro o tempo de espera para exibirConteudo()
function exibirLoader(delay){
    // Adicionando conteúdpo HTML ao elemento HEAD do html
    document.querySelector('head').innerHTML += `<link rel="stylesheet" type="text/css" href="../css/loading.css"/>`;
    // Adicionando conteúdpo HTML ao elemento BODY do html
    document.querySelector('body').innerHTML += `<div id="loading"> <img src="../assets/datacooling.png" class="ld ld-fade"/>  </div>`
    setTimeout(exibirConteudo, delay);
}
