function entrar() {

    var emailVar = ipt_email.value
    var senhaVar = ipt_senha.value

    if (emailVar == "" || senhaVar == "") {
        alert('Mensagem de erro para todos os campos em branco');
        finalizarAguardar();
        return false;
    } else {

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID = json.idUsuario;
                    sessionStorage.NOME = json.nome;
                    sessionStorage.SOBRENOME = json.sobrenome;
                    sessionStorage.EMAIL = json.email;
                    sessionStorage.FK_EMPRESA = json.fkEmpresa;
                    sessionStorage.NOME_EMPRESA = json.nomeEmpresa;

                    window.location = "Dashboard_Plano_Padrao/index.html"

                    // setTimeout(function () {
                    //     window.location = "./dashboard/cards.html";
                    // }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}
