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
            WHERE fkUsuarioAdmin = ${idAdmin}
                ORDER BY nome;
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
                    GROUP BY dataFormatada
                   ORDER BY dataFormatada DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT User.idUsuario, User.nome, User.sobrenome, User.email, User.fkEmpresa, User.fkUsuarioAdmin, Admin.nome nomeAdmin, Admin.sobrenome sobrenomeAdmin, razaoSocial FROM Usuario AS User
            LEFT JOIN Usuario AS Admin ON User.fkUsuarioAdmin = Admin.idUsuario
                JOIN Empresa ON user.fkEmpresa = Empresa.idEmpresa
                    WHERE User.email = '${email}' AND User.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, email, senha, fkEmpresa, fkUsuarioAdmin) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, senha, fkEmpresa, fkUsuarioAdmin);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, fkEmpresa, fkUsuarioAdmin) VALUES ('${nome}','${sobrenome}','${email}','${senha}', ${fkEmpresa}, ${fkUsuarioAdmin});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarToken(fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarToken():", fkEmpresa);

    var instrucao = `       
        SELECT valor FROM Token WHERE fkEmpresa = ${fkEmpresa};
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


function excluirToken(fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirToken():", fkEmpresa);

    var instrucao = `       
        DELETE FROM Token WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarEmpresa(token, nomeEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarEmpresa():", token);
    
    var instrucao = `
        SELECT Token.fkEmpresa, idUsuario FROM Token
            JOIN Empresa ON Empresa.idEmpresa = Token.fkEmpresa
                JOIN Usuario ON Empresa.idEmpresa = Usuario.fkEmpresa
                    WHERE valor = '${token}' AND razaoSocial = '${nomeEmpresa}'
                        ORDER BY idUsuario LIMIT 1;
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
    listarToken,
    gerarToken,
    excluirToken
    
};