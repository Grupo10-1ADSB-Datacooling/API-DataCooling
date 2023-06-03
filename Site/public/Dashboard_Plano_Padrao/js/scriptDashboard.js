var idEmpresaVar = sessionStorage.FK_EMPRESA;

function listarSensores() {
    select_sensor.innerHTML = "";
    
    fetch("/usuarios/listarSensores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                json.forEach(sensor => {
                    select_sensor.innerHTML += `<option value="${sensor.idSensor}" onclick="obterDadosGrafico(sensor.idSensor)"> Sensor ${sensor.idSensor} </option>`
                })
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function listarDataRegistro() {
    var idSensorVar = Number(select_sensor.value);
    select_data.innerHTML = "";

    console.log("Id da Empresa: ", idEmpresaVar);
    
    fetch("/usuarios/listarDataRegistro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresaVar,
            idSensorServer: idSensorVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO listarDataRegistro()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.DATA_REGISTRO = json.dataRegistro;
                sessionStorage.DATA_FORMATADA = json.dataFormatada;

                json.forEach(datas => {
                    select_data.innerHTML += `<option value="${datas.dataRegistro}"> ${datas.dataFormatada} </option>`
                })

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

