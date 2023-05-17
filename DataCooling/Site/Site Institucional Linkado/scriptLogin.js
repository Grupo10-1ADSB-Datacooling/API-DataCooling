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