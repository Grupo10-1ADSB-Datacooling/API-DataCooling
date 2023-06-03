var nome = "";
var sobrenome = "";
var email = "";
var senha = "";
var nomeEmpresa = "";
var token = "";

function exibirCadastroParte2() {
    nome = ipt_nome.value;
    sobrenome = ipt_sobrenome.value;
    nomeEmpresa = ipt_nome_empresa.value;
    
    if (nome == "" || sobrenome == "" || nomeEmpresa == "" ) {
        alert("Por favor, preencher todos os campos!");
    } else {
        sessionStorage.setItem('NOME', nome);
        sessionStorage.setItem('SOBRENOME', sobrenome)
        sessionStorage.setItem('NOME_EMPRESA', nomeEmpresa)

        window.location.href = "./cadastro_2.html";
    }

};

// Criando um botão para ver a senha
function mostrarOcultarSenha(){
    var mostrar_senha = document.getElementById("ipt_senha")
    
    if(mostrar_senha.type == "password"){
        mostrar_senha.type="text";
    } else {
        mostrar_senha.type="password";
    }
}

function cadastrarUsuario(){
    email = ipt_email.value;
    senha = ipt_senha.value;
    token = ipt_token.value;

    if (email == "" || senha == "" || token == "" ) {
        alert("Por favor, preencher todos os campos!");
    }else {
        nomeEmpresa = sessionStorage.NOME_EMPRESA;

        buscarEmpresa(token, nomeEmpresa);
    }
}

function buscarEmpresa(token, nomeEmpresa){
    fetch(`/usuarios/buscarEmpresa/${token}/${nomeEmpresa}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            if(resposta.status == 200){
                resposta.json().then(function (dadosEmpresa) {
                    console.log(`Dados recebidos: ${JSON.stringify(dadosEmpresa)}`)

                    finalizarCadastro(dadosEmpresa[0].fkEmpresa, dadosEmpresa[0].idUsuario);
                });
            } else {
                alert('Nao existe empresa com esses dados');
            }
        } else {
            throw ("Houve um erro ao tentar buscar a empresa!");
        } 
       
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });
}

function finalizarCadastro(fkEmpresa, fkUsuarioAdmin) {
        nome = sessionStorage.NOME;
        sobrenome = sessionStorage.SOBRENOME;

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                sobrenomeServer: sobrenome,
                emailServer: email,
                senhaServer: senha,
                fkEmpresaServer: fkEmpresa,
                fkUsuarioAdminServer: fkUsuarioAdmin
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                sessionStorage.clear();

                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")

                limparFormulario();
                finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;
    }



// function exibirCadastroParte2() {
//     razaoSocial = ipt_razaoSocial.value;
//     email = ipt_email.value;
//     senha = ipt_senha.value;
//     if (razaoSocial == "" || email == "" || senha == "") {
//         alert("Por favor, preencher todos os campos!");
//     } else {
//         alterarCampos();
//     }}





