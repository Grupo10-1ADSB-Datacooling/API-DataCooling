var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT Plano.nome AS nomePlano, idEmpresa, razaoSocial, email, cnpj, cep, telFixo FROM cadastroEmpresa JOIN Plano ON Plano.idPlano = cadastroEmpresa.fkPlano;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarSensores(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSensores()", idEmpresa);
    var instrucao = `
        SELECT nome AS nomeSetor, idSensor, tipo, statusSensor FROM Setor RIGHT JOIN Sensor ON Sensor.fkSetor = Setor.idSetor  WHERE fkEmpresa = ${idEmpresa} ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDataRegistro(idEmpresa, idSensor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDataRegistro()", idEmpresa);
    var instrucao = `
    SELECT DATE_FORMAT(dataHora, '%Y-%m-%d') AS dataRegistro, DATE_FORMAT(dataHora,'%d/%m/%Y') AS dataFormatada, dataHora FROM dadosSensor
    JOIN Sensor ON dadosSensor.fkSensor = Sensor.idSensor
        WHERE Sensor.fkEmpresa = ${idEmpresa} AND Sensor.idSensor = ${idSensor} GROUP BY dataRegistro ORDER BY dataFormatada DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Plano RIGHT JOIN cadastroEmpresa ON Plano.idPlano = cadastroEmpresa.fkPlano WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(razaoSocial, email, senha, cnpj, cep, telFixo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, email, senha, cnpj, cep, telFixo);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO cadastroEmpresa (razaoSocial, email, senha, cnpj, cep, telFixo) VALUES ('${razaoSocial}','${email}','${senha}','${cnpj}', '${cep}', '${telFixo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listarSensores,
    listarDataRegistro,
    listar
};