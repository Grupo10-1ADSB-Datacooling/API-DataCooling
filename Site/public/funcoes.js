// sessão
function validarSessao() {
    // aguardar();

    var nome = sessionStorage.NOME;
    var sobrenome = sessionStorage.SOBRENOME;
    var email = sessionStorage.EMAIL;
    var nomeEmpresa = sessionStorage.NOME_EMPRESA;

    var nomeUsuario = document.getElementById("nomeUsuario");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        
        nomeUsuario.innerHTML = `${nome} ${sobrenome}`;
        emailUsuario.innerHTML = email;
        nomeEmpresa.innerHTML = nome;
        finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    setTimeout(() => {window.location = "../login.html"}, 1000);
}

// // carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

function finalizarAguardar(texto) {
    if (texto) {
        alert(texto);
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

