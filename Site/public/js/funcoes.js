// sessão
function validarSessao() {
    // aguardar();

    var id = sessionStorage.ID;
    var fkAdmin = sessionStorage.FK_ADMIN;
    var nome = sessionStorage.NOME;
    var sobrenome = sessionStorage.SOBRENOME;
    var nomeUsuario = document.getElementById("nomeUsuario");

    if (sobrenome != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);

        
        if(id != fkAdmin){
            document.getElementById('meusUsuarios').innerHTML = "";
        }
        
        nomeUsuario.innerHTML = `${nome} ${sobrenome}`;

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

