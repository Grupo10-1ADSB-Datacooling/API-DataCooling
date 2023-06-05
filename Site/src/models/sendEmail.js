const nodemailer = require("nodemailer");

function enviar(email, nome, texto, dadoRegistro){
// é necessário gerar uma appPassword a partir do seu e-mail Google para conseguir utilizar a API.
// tutorial -> https://support.google.com/accounts/answer/185833?hl=en
// cole a senha gerada pelo Google abaixo.

const appPassword = "pznpdvnbsrsclgkl"

async function main() {

    // Primeiro, criamos o 'transportador' de e-mail, um 'meio' para conseguirmos acessar o host do email e enviá-lo

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (normalmente: mail.your-domain.com -> acess for support(https://suppo"rt.google.com/mail/answer/7126229?hl=pt-BR#zippy=%2Cetapa-alterar-o-smtp-e-outras-configura%C3%A7%C3%B5es-no-seu-cliente-de-e-mail))
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: "datacooling1@gmail.com", // Your email address
            pass: appPassword, // Password (for gmail, your app password)
            // ⚠️ For better security, use environment variables set on the server for these values when deploying
        },
    });

    // Define o conteúdo da mensagem. O 'html' pode ser personalizado como quiser, criando uma variável string que recebe o valor do html que você desejar.

    let info = {
        from: '"Dadinho Júnior" <datacooling1@gmail.com>',
        to: email,
        subject: "Alerta de Risco no seu DataCenter",
        html: `
        <!DOCTYPE html>
<html>
<head>
  <title>E-mail Estilizado</title>
  <style>
    body {
      background-color: #f0f0f0;
      font-family: 'Poppins';
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #212121;
      padding: 20px;
      border: 5px solid #37c1ca;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #37c1ca;
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 20px;
    }

    p {
      color: #f0f0f0;
      font-size: 16px;
      margin-bottom: 20px;
    }

    a {
      color: #37c1ca;
      text-decoration: none;
    }

    .button:hover {
      background-color: #383;
    }
  </style>
</head>
<body>
  <div class="container" style="font-family: 'Arial'">
    <h1>ALERTA DE RISCO!</h1>
    <p>Olá ${nome},</p>
    <p>Seu Datacenter está em alerta de ${texto}: ${dadoRegistro}.</p>
    <p>Tente checar e ser mais atento quanto a sua situação.</p>
    <p>Atenciosamente,<br>Dadinho Jr.</p>
  </div>
</body>
</html>
        `,
    }
   
    // Aqui, fazemos o envio do e-mail com base nas informações que configuramos acima através do transporter que criamos lá em cima.
    let response = await transporter.sendMail(info);
   
    console.log("Mensagem enviada. messageId: " + response.messageId); // ID aleatório gerado por uma requisição feita com sucesso (optional)
   
}

// chamada da função
main()
    .catch(err => console.log(err));

}

module.exports = {
     enviar
 }