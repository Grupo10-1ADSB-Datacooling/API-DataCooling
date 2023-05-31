// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL;
    var razaoSocial = sessionStorage.RAZAO_SOCIAL;
    var plano = sessionStorage.PLANO;
    var email = sessionStorage.EMAIL;
    var cnpj = sessionStorage.CNPJ;
    var cep = sessionStorage.CEP; 
    var telFixo = sessionStorage.TEL_FIXO;

    var razaoSocialEmpresa = document.getElementById("razaoSocial");
    var planoEmpresa = document.getElementById('plano');
    var emailEmpresa = document.getElementById('email');
    var cnpjEmpresa = document.getElementById('cnpj');
    var cepEmpresa = document.getElementById('cep');
    var telFixoEmpresa = document.getElementById('telFixo');

    if (email != null && razaoSocial != null) {
        // window.alert(`Seja bem-vindo, ${razaoSocial}!`);
        
        razaoSocialEmpresa.innerHTML = razaoSocial;
        // planoEmpresa.innerHTML = plano;
        // emailEmpresa.innerHTML = email;
        // cnpjEmpresa.innerHTML = cnpj; 
        // cepEmpresa.innerHTML =  cep;
        // telFixoEmpresa.innerHTML = telFixo;
        // finalizarAguardar();
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

