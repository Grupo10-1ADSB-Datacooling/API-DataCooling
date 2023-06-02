var nome = "";
var sobrenome = "";
var email = "";
var senha = "";
var nomeEmpresa = "";
var token = "";

function finalizarCadastro() {
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
                nomeEmpresaServer: nomeEmpresa,
                tokenServer: token
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

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



    function cadastrarEmpresa() {
        nome = ipt_nome.value;
        sobrenome = ipt_sobrenome.value;
        nomeEmpresa = ipt_nome_empresa.value;
        if (nome == "" || sobrenome == "" || nomeEmpresa == "" ) {
            alert("Por favor, preencher todos os campos!");
        } else {
                window.location.href = "./cadastro_2.html";
        }
    
    };
    function cadastrarEmpresa2(){
        email = ipt_email.value;
        senha = ipt_senha.value;
        token = ipt_token.value;
        if (email == "" || token == "" || token == "" ) {
            alert("Por favor, preencher todos os campos!");
        }else {
            finalizarCadastro();
        }
    }
    // Criando um botão para ver a senha
    function mostrarOcultarSenha(){
        var mostrar_senha = document.getElementById("ipt_senha")
        if(mostrar_senha.type == "password"){
            mostrar_senha.type="text";
        }else{
            mostrar_senha.type="password";
        }
    
    }





