var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        temperatura, umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from dadosSensor
                    join sensor on fkSensor = ${idSensor}
                    where fkSensor = ${idSensor}
                    order by dataHora desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
	        join sensor on sensor.fkSetor = setor.idSetor
		        join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
			        where fkSensor = ${idSensor} order by dataHora desc limit ${limite_linhas};`;
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
        instrucaoSql = `select temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
        join sensor on sensor.fkSetor = setor.idSetor
            join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
                where fkSensor = ${idSensor} order by dataHora desc limit 1;`;
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