var email = "";
var senha = "";

function validarEntrada() {
     email = ipt_email.value
     senha = ipt_senha.value
    if ( email == "" || senha == ""){
        alert("Por favor preencha tods os campos!")
    } else if ( email != "admin@bambam.datacenter" || senha != "#Kb0123"){
        alert("Email ou senha inválido.")
    }else {
        window.location.href = "Dashboard_Plano_Padrao/dashboard.html"
    }
};

function entrar() {
    aguardar();

    email = ipt_email.value
    senha = ipt_senha.value

    if (email == "" || senha == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    } else {

        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID = json.idEmpresa;
                    sessionStorage.RAZAO_SOCIAL = json.razaoSocial;
                    sessionStorage.EMAIL = json.email;
                    sessionStorage.CNPJ = json.cnpj;
                    sessionStorage.CEP = json.cep;
                    sessionStorage.TEL_FIXO = json.telFixo;
                    sessionStorage.PLANO = json.fkPlano;

                    window.location = "Dashboard_Plano_Padrao/dashboard.html"

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
