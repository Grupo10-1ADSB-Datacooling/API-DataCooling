var nome;
var sobrenome;
var email;
var senha;
var cargo;

function cadastrarUsuario(){
    nome = ipt_nome.value;
    sobrenome = ipt_sobrenome.value;
    email = ipt_email.value;
    senha = ipt_senha.value;
    cargo = select_cargo.value;

    if(nome == '' || sobrenome == '' || email == '' || senha == '' || cargo == ''){
        alert('Preencha os campos!');
    } else {
        localStorage.setItem('nomeCadastrado', nome);
        localStorage.setItem('sobrenomeCadastrado', sobrenome);
        localStorage.setItem('emailCadastrado', email);
        localStorage.setItem('senhaCadastrado', senha);
        localStorage.setItem('cargoCadastrado', cargo);
        window.location.href = './meusUsuarios.html';
    }
}

function exibirUsuarioCadastrado(){
    nome = localStorage.getItem('nomeCadastrado');
    sobrenome = localStorage.getItem('sobrenomeCadastrado');
    email = localStorage.getItem('emailCadastrado');
    senha = localStorage.getItem('senhaCadastrado');
    cargo = localStorage.getItem('cargoCadastrado');

    var users = document.querySelector('.users');
    if(nome != null){
        users.innerHTML += 
            `<div class="card-users">
                <div class="profile">
                    <img class="img-users" src="./../../assets/dadinho_perfil_3.png">
                    <div class="icon-pen" onclick="redirecionar('${nome}','${sobrenome}', '${email}', '${senha}', '${cargo}')">
                        <label class="icon">
                            <i class="fa-solid fa-pen"></i>
                        </label>
                    </div>
                </div>
                <span class="name-user">
                    <h4 id="nameUser"> ${nome} ${sobrenome} </h4>
                    <h5> ${cargo} </h5>
                </span>
            </div>`;
    }
}

function redirecionar(nome, sobrenome, email, senha, cargo){
    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('sobrenomeUsuario', sobrenome);
    localStorage.setItem('emailUsuario', email);
    localStorage.setItem('senhaUsuario', senha);
    localStorage.setItem('cargoUsuario', cargo);
    window.location.href = "./dadosUsuario.html";
}

function exibirDadosUsuario(){
    nome = localStorage.getItem('nomeUsuario');
    sobrenome = localStorage.getItem('sobrenomeUsuario');
    email = localStorage.getItem('emailUsuario');
    senha = localStorage.getItem('senhaUsuario');
    cargo = localStorage.getItem('cargoUsuario');

    var imgUser = document.querySelector('.img-profile-user')
    var inputNome = document.getElementById('ipt_nome');
    var inputSobrenome = document.getElementById('ipt_sobrenome');
    var inputEmail = document.getElementById('ipt_email');
    var inputSenha = document.getElementById('ipt_senha');
    var selectCargo = document.getElementById('select_cargo');

    imgUser.src = `./../../assets/${nome}.png`
    inputNome.value = nome;
    inputSobrenome.value = sobrenome;
    inputEmail.value = email;
    inputSenha.value = senha;
    selectCargo.value = cargo;
}
