var database = require("../database/config");

function buscarUltimasMedidas(idSensor, dataRegistro, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        temperatura, umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from dadosSensor
                    join Sensor on fkSensor = ${idSensor}
                    where fkSensor = ${idSensor}
                    order by dataHora desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select statusSensor, temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from Setor
	        right join Sensor on Sensor.fkSetor = Setor.idSetor
		        right join dadosSensor on dadosSensor.fkSensor = Sensor.idSensor
			        where fkSensor = ${idSensor} AND dataHora LIKE '%${dataRegistro}%' group by dataHora order by dataHora desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        temperatura, umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fkSensor 
                        from dadosSensor where fkSensor = ${idSensor} 
                    order by dataHora desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select statusSensor, temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s'), nome, fkSensor from Setor
        right join Sensor on Sensor.fkSetor = Setor.idSetor
            right join dadosSensor on dadosSensor.fkSensor = Sensor.idSensor
                where fkSensor = ${idSensor} order by dataHora desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
