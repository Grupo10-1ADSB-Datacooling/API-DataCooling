var medidaModel = require("../models/medidaModel");
var {enviar} = require("../models/sendEmail");
 

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idSensor = req.params.idSensor;
    var dataRegistro = req.params.dataRegistro;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idSensor, dataRegistro, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensor;
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor, idUsuario).then(function (resultado) {

        if (resultado.length > 0) {
            var temperatura = resultado[0].temperatura;
            var umidade = resultado[0].umidade; 
            var email = resultado[0].email;
            var nome = resultado[0].nomeUsuario;
            
            if( temperatura >= 28){
                enviar(email, nome, 'temperatura', temperatura + "°C");
            }
            if(umidade >= 56){
                enviar(email, nome, 'umidade', umidade + "%");
            }
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}