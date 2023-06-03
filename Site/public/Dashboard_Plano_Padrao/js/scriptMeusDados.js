function exibirDados() {
    // aguardar();

    var id = sessionStorage.ID;
    var nome = sessionStorage.NOME;
    var sobrenome = sessionStorage.SOBRENOME;
    var email = sessionStorage.EMAIL;
    var empresa = sessionStorage.NOME_EMPRESA;
    var nomeResponsavel = sessionStorage.NOME_ADMIN;
    var sobrenomeResponsavel = sessionStorage.SOBRENOME_ADMIN;
    var fkAdmin = sessionStorage.FK_ADMIN;

    if (email != null && email != null) {
        idUsuario.innerHTML = id;
        nomeUser.innerHTML = nome;
        sobrenomeUsuario.innerHTML = sobrenome;
        emailUsuario.innerHTML = email;
        nomeEmpresa.innerHTML = empresa;

        if(id == fkAdmin){
            document.getElementById('dadosResponsavelEmpresa').remove();
        } else {
            responsavelEmpresa.innerHTML = `${nomeResponsavel} ${sobrenomeResponsavel}`;
        }

        
    } else {
        window.location = "../login.html";
    }
}
