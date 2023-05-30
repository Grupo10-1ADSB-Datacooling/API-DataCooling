var razaoSocial = "";
var email = "";
var senha = "";
var cnpj = "";
var cep = "";
var telefoneFixo = "";

function alterarCampos() {

    // Armazenando os valores das inputs
    razaoSocial = ipt_razaoSocial.value;
    email = ipt_email.value;
    senha = ipt_senha.value;

    // Alterando as informações da Razão Social

    // Selecionando o elemento HTML com o id title_razaoSocial
    var titleCnpj = document.getElementById("title_razaoSocial");
    // Alterando o conteúdo HTML do elemento
    titleCnpj.innerHTML = "CNPJ";
    // Selecionando o elemento HTML com o id ipt_razaoSocial
    var inputCnpj = document.getElementById("ipt_razaoSocial");
    // Alterando o id do elemento INPUT
    inputCnpj.id = "ipt_cnpj";
    // Alterando o type do elemento INPUT
    inputCnpj.type = "text";
    // Limpando os valores do elemento INPUT
    inputCnpj.value = "";
    // Alterando a placeholder do elemento INPUT
    inputCnpj.placeholder = "00.000.000/0001-00";

    // Alterando as informações do Email

    // Selecionando o elemento HTML com o id title_email
    var titleCep = document.getElementById("title_email");
    // Alterando o conteúdo HTML do elemento
    titleCep.innerHTML = "CEP da Empresa";
    // Selecionando o elemento HTML com o id ipt_email
    var inputCep = document.getElementById("ipt_email");
    // Alterando o id da input
    inputCep.id = "ipt_cep";
    // Alterando o type da input
    inputCep.type = "text"
    // Limpando os valores do elemento INPUT
    inputCep.value = "";
    // Alterando a placeholder
    inputCep.placeholder = "00000-000";

    // Alterando as informações da Senha

    // Selecionando o elemento HTML com o id title_senha
    var titleTelFixo = document.getElementById("title_senha");
    // Alterando o conteúdo HTML do elemento
    titleTelFixo.innerHTML = "Telefone Fixo";
    // Selecionando o elemento HTML com o id title_senha
    var inputTelFixo = document.getElementById("ipt_senha");
    // Alterando o id da input do elemento INPUT
    inputTelFixo.id = "ipt_telFixo";
    // Alterando o type da input do elemento INPUT
    inputTelFixo.type = "text"
    // Limpando os valores do elemento INPUT
    inputTelFixo.value = "";
    // Alterando a placeholder do elemento INPUT
    inputTelFixo.placeholder = "11 0000-0000";

    // Alterando as informações do botão Continuar

    // Selecionando o elemento HTML com o id title_senha
    var buttonCadastrar = document.getElementById("btn_continuar");
    // Alterando o id do elemento HTML
    buttonCadastrar.id = "btn_cadastrar"
    // Alterando o conteúdo HTML do elemento
    buttonCadastrar.textContent = "Cadastrar";
    // Limpando onclick do elemento HTML
    buttonCadastrar.onclick = function cadastrar() {

        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
        cnpj = ipt_cnpj.value;
        cep = ipt_cep.value;
        telefoneFixo = ipt_telFixo.value;

        if (cnpj == "" || cep == "" || telefoneFixo == "" ) {
            alert("Por favor, preencher todos os campos!");

            return false;
        } else {

            // Enviando o valor da nova input
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
                    razaoSocialServer: razaoSocial,
                    emailServer: email,
                    senhaServer: senha,
                    cnpjServer: cnpj,
                    cepServer: cep,
                    telefoneFixoServer: telefoneFixo
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
    }
}

function exibirCadastroParte2() {
    razaoSocial = ipt_razaoSocial.value;
    email = ipt_email.value;
    senha = ipt_senha.value;
    if (razaoSocial == "" || email == "" || senha == "") {
        alert("Por favor, preencher todos os campos!");
    } else {
        alterarCampos();
    }

}





