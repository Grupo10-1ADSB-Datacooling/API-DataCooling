var fkEmpresa = sessionStorage.FK_EMPRESA;
var fkAdmin = sessionStorage.ID;

function exibirUsuarioCadastrado() {

    fetch(`/usuarios/listarUsuarios/${fkAdmin}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                exibirUsuario(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function exibirUsuario(resposta){
    var users = document.querySelector('.users');
    users.innerHTML = "";
    console.log(resposta)
    for(var contadorUsuario = (resposta.length - 1); contadorUsuario >= 0; contadorUsuario--){
        users.innerHTML +=
        `<div class="card-users">
            <div class="profile">
                <img class="img-users" src="./../../assets/dadinho_perfil_3.png">
            </div>
            <span class="name-user">
                <h4 id="nameUser"> ${resposta[contadorUsuario].nome} ${resposta[contadorUsuario].sobrenome} </h4>
            </span>
        </div>`;
    }

    setTimeout(exibirUsuarioCadastrado, 2000);
}

function gerarStringAleatoria() {
    var valorToken = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 30; i++) {
        valorToken += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    fetch("../usuarios/gerarToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            valorServer: valorToken,
            fkEmpresaServer: fkEmpresa
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);
        
        if (resposta.ok) {
            mensagem.innerHTML = `<input id="a" value="${valorToken}" style="width: 38vh;" readonly class="ipt_token"> <div id="mensagem_copiar"></div>`
            btn_copiar.innerHTML = `<button onclick="copiar()" class="copy_bnt" readonly >Copiar</button>`
            swal("TOKEN CRIADO COM SUCESSO!", "Você possui 30 minutos para utilizar o token, após esse tempo ele será excluído!", "success");
            
            console.log(resposta)
            setTimeout(excluirToken, 60000);

        } else {
            if(resposta.status == 500){
                fetch(`/usuarios/listarToken/${fkEmpresa}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    if (response.ok) {
                        console.log(response)
                        response.json().then(function (resposta) {
                            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                            resposta.reverse();
                            swal(`Você já possui um Token ativo!`, `Seu Token em atividade é o: ${resposta[0].valor}, aguarde o tempo de exclusão para criar outro!`, "error");
                            setTimeout(excluirToken, 10000)
                        });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na API');
                    }
                })
                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados do token: ${error.message}`);
                    });
            }

            throw ("Houve um erro ao tentar gerar um token!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

        finalizarAguardar();
    });


}

function copiar() {
    var b = document.getElementById("a").select();
    if (!(document.execCommand("paste"))) {
        document.execCommand("copy")
        mensagem_copiar.innerHTML = `<br><span style="color: #0bcd4d;">Token copiado.</span>`
    }
}

function excluirToken(){
    fetch(`../usuarios/excluirToken/${fkEmpresa}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            swal("Agora você já pode criar outro token!");
            mensagem.innerHTML = ""
            btn_copiar.innerHTML = "";
            mensagem_copiar.innerHTML = "";

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar deletar o token! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;

}

