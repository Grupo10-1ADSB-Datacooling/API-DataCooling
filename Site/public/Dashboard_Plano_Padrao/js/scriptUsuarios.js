function exibirUsuarioCadastrado() {
    var fkAdmin = sessionStorage.ID_USUARIO;

    fetch(`/usuario/listarUsuario/${fkAdmin}`, { cache: 'no-store' }).then(function (response) {
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
    for(var contadorUsuario = 0; contadorUsuario < resposta.length; contadorUsuario++){
        users.innerHTML +=
        `<div class="card-users">
            <div class="profile">
                <img class="img-users" src="./../../assets/dadinho_perfil_3.png">
            </div>
            <span class="name-user">
                <h4 id="nameUser"> ${nome} ${sobrenome} </h4>
                <h5> ${email} </h5>
            </span>
        </div>`;
    }
}

function gerarStringAleatoria() {
    var fkEmpresa = sessionStorage.FK_EMPRESA;
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
            mensagem.innerHTML = `<input id="a" value="${valorToken}" style="width: 38vh;" readonly class="ipt_token">`
            btn_copiar.innerHTML = `<button onclick="copiar()" class="copy_bnt" readonly >Copiar</button>`
            
        } else {
            throw ("Houve um erro ao tentar gerar um token!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;

}

function copiar() {
    var b = document.getElementById("a").select();
    if (!(document.execCommand("paste"))) {
        document.execCommand("copy")
        mensagem.innerHTML += `<br><span style="color: #0bcd4d;">Token copiado.</span>`
    }
}
