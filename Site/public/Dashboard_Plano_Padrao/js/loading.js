function exibirConteudo(){
    var loading = document.querySelector('#loading');
    var header = document.querySelector('header');
    var container = document.querySelector('.container');
    var dashboard = document.querySelector('.dashboard');

    loading.style.display = 'none';
    header.style.display = 'flex';
    container.style.display = 'flex';
    window.onload = validarSessao(), obterSensores();
    window.onload = setTimeout(listarDataRegistro, 100);
    setTimeout(obterDadosGraficos, 150)


}

function exibirLoader(delay, urlCss, urlImg){
    document.querySelector('head').innerHTML += `<link rel="stylesheet" type="text/css" href="${urlCss}"/>`;
    document.querySelector('body').innerHTML += `<div id="loading"> <img src="${urlImg}" class="ld ld-fade"/>  </div>`
    setTimeout(exibirConteudo, delay);
}