var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Usuario 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsuarios(idAdmin){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsuarios()" + idAdmin);
    var instrucao = `
        SELECT * FROM Usuario 
        WHERE fkUsuarioAdmin = ${idAdmin};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarSensores(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSensores()", idEmpresa);
    var instrucao = `
        SELECT nome AS nomeSetor, idSensor, statusSensor FROM Setor RIGHT JOIN Sensor ON Sensor.fkSetor = Setor.idSetor  WHERE Setor.fkEmpresa = ${idEmpresa} ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDataRegistro(idEmpresa, idSensor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDataRegistro()", idEmpresa);
    var instrucao = `
    SELECT DATE_FORMAT(dataHora, '%Y-%m-%d') AS dataRegistro, DATE_FORMAT(dataHora,'%d/%m/%Y') AS dataFormatada, dataHora FROM dadosSensor
        JOIN Sensor ON dadosSensor.fkSensor = Sensor.idSensor
            JOIN Setor ON Sensor.fkSetor = Setor.idSetor
                WHERE Setor.fkEmpresa = ${idEmpresa} AND Sensor.idSensor = ${idSensor}
                   ORDER BY dataFormatada DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario 
            JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa
                WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, senha, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, fkEmpresa) VALUES ('${nome}','${sobrenome}','${email}','${senha}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function gerarToken(token, fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function gerarToken():", token, fkEmpresa);

    var instrucao = `       
        INSERT INTO Token (valor, fkEmpresa, dtCriacao) VALUES ('${token}', ${fkEmpresa}, now());

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarEmpresa(token, nomeEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarEmpresa():", token);
    
    var instrucao = `
        SELECT fkEmpresa FROM Token
        JOIN Empresa ON Empresa.idEmpresa = Token.fkEmpresa
        WHERE valor = '${token}' AND razaoSocial = '${nomeEmpresa}' ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

module.exports = {
    entrar,
    cadastrar,
    buscarEmpresa,
    listarUsuarios,
    listarSensores,
    listarDataRegistro,
    gerarToken
    
};