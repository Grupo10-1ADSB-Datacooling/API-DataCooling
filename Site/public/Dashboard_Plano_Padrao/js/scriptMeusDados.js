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
    var razaoSocialEmpresa2 = document.getElementById("razaoSocialEmpresa");
    var planoEmpresa = document.getElementById('plano');
    var emailEmpresa = document.getElementById('email');
    var cnpjEmpresa = document.getElementById('cnpj');
    var cepEmpresa = document.getElementById('cep');
    var telFixoEmpresa = document.getElementById('telFixo');

    if (email != null && razaoSocial != null) {
        // window.alert(`Seja bem-vindo, ${razaoSocial}!`);
        
        razaoSocialEmpresa.innerHTML = razaoSocial;
        razaoSocialEmpresa2.innerHTML = razaoSocial;
        planoEmpresa.innerHTML = plano;
        emailEmpresa.innerHTML = email;
        cnpjEmpresa.innerHTML = cnpj; 
        cepEmpresa.innerHTML =  cep;
        telFixoEmpresa.innerHTML = telFixo;
        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}
