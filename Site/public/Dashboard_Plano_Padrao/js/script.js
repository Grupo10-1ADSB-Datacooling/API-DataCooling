var alertasTemperatura = [];
var alertasUmidade = [];


var limites_temperatura = {
    muito_quente: 30,
    quente: 28,
    ideal: 23,
    frio: 20,
    muito_frio: 18
};

var limites_umidade = {
    muito_umido: 60,
    umido: 57,
    ideal: 45,
    seco: 40,
    muito_seco: 35
};

function obterSensores() {

    var idEmpresaVar = sessionStorage.ID;

    console.log("Id da Empresa: ", idEmpresaVar);


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
                console.log(json.idSensor);
                console.log(JSON.stringify(json));

                json.forEach(sensor => {
                    obterDados(sensor.idSensor)
                })

                
                // setTimeout(function () {
                //     window.location = "./dashboard/cards.html";
                // }, 1000); // apenas para exibir o loading

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

function obterDados(idSensor) {

    fetch(`/medidas/tempo-real/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                exibirCardSensor(novoRegistro, novoRegistro[0].fkSensor);
                alertar(novoRegistro, novoRegistro[0].nome);

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => obterDados(), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => obterDados(), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}               

function exibirCardSensor(resposta, idSensor){
    console.log(idSensor + 'DEU CERTO BEBE')
    var nomeSetor = resposta[0].nome;
    var statusSensor = resposta[0].statusSensor
    var temperatura = resposta[0].temperatura;
    var umidade = resposta[0].umidade;
    
    div_sensores.innerHTML += 
    `<div class="card-sensor">
        <div class="informations-sensor">
            <div class="text-sensor">
                <h3> SENSOR ${idSensor} </h3>
                <span class="status-sensor" id="status-sensor-${idSensor}">
                    <label class="ball">
                        &bull;
                    </label>
                    ${statusSensor}
                </span>
            </div>
            <span class="setor-sensor">
                Está alocado no ${nomeSetor}
            </span>
        </div>
        <div class="data-sensor">
            <div class="information-data">
                <label class="icon-data">
                    <img src="./../../assets/temperatura.svg" />
                </label>
                <div class="text-data">
                    <h4> Temperatura </h4>
                    <span id="temperatura_sensor${idSensor}"> ${temperatura}°C, </span>
                </div>
            </div>
            <div class="information-data">
                <label class="icon-data">
                    <img src="./../../assets/umidade.svg" />
                </label>
                <div class="text-data">
                    <h4> Umidade </h4>
                    <span id="umidade_sensor${idSensor}"> ${umidade}%, </span>
                </div>
            </div>
        </div>
    </div>  
`
    classificarDados(temperatura, umidade, idSensor);

}

function classificarDados(temp, umid, idSensor){
    console.log(temp)
    var textoTemperatura = document.getElementById(`temperatura_sensor${idSensor}`);
    var textoUmidade = document.getElementById(`umidade_sensor${idSensor}`);

    if (temp >= limites_temperatura.muito_quente) {
        textoTemperatura.innerHTML += 'Acima do Ideal';
        textoTemperatura.id = 'critico';
    } else if (temp < limites_temperatura.muito_quente && temp >= limites_temperatura.quente) {
        textoTemperatura.innerHTML += 'Acima do Ideal';
        textoTemperatura.id = 'alerta';
    }
    else if (temp < limites_temperatura.quente && temp > limites_temperatura.frio) {
        textoTemperatura.innerHTML += 'Ideal';
        textoTemperatura.id = 'ideal';
    }
    else if (temp <= limites_temperatura.frio && temp > limites_temperatura.muito_frio) {
        textoTemperatura.innerHTML += 'Abaixo do Ideal';
        textoTemperatura.id = 'alerta';
    }
    else if (temp <= limites_temperatura.muito_frio) {
        textoTemperatura.innerHTML += 'Abaixo do Ideal';
        textoTemperatura.id = 'critico';
    }

    if (umid >= limites_umidade.muito_umido) {
        textoUmidade.innerHTML += 'Acima do Ideal';
        textoUmidade.id = 'critico';
      }
      else if (umid < limites_umidade.muito_umido && umid >= limites_umidade.umido) {
        textoUmidade.innerHTML += 'Acima do Ideal';
        textoUmidade.id = 'alerta';
      }
      else if (umid < limites_umidade.umido && umid > limites_umidade.seco) {
        textoUmidade.innerHTML += 'Ideal';
        textoUmidade.id = 'ideal';
      }
      else if (umid <= limites_umidade.seco && umid > limites_umidade.muito_seco) {
        textoUmidade.innerHTML += 'Abaixo do Ideal';
        textoUmidade.id = 'alerta';
      }
      else if (umid <= limites_umidade.muito_seco) {
        textoUmidade.innerHTML += 'Abaixo do Ideal';
        textoUmidade.id = 'critico';
      }
}

function alertar(resposta, nomeSetor) {
    var idSensor = resposta[0].fkSensor;
    var temp = resposta[0].temperatura;
    var umid = resposta[0].umidade;
    console.log(resposta);

    var grauDeAvisoTemperatura ='';
    var grauDeAvisoUmidade ='';
    
    if (temp >= limites_temperatura.muito_quente) {
        classe_temperatura = 'perigo-quente';
        grauDeAvisoTemperatura = 'perigo muito quente';
        grauDeAvisoCor = 'perigo-quente';
        exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
    }
    else if (temp < limites_temperatura.muito_quente && temp >= limites_temperatura.quente) {
        classe_temperatura = 'alerta-quente';
        grauDeAvisoTemperatura = 'alerta quente'
        grauDeAvisoCor = 'alerta-quente'
        exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
    }
    else if (temp < limites_temperatura.quente && temp > limites_temperatura.frio) {
        classe_temperatura = 'ideal';
        removerAlerta(idSensor);
    }
    else if (temp <= limites_temperatura.frio && temp > limites_temperatura.muito_frio) {
        classe_temperatura = 'alerta-frio';
        grauDeAvisoTemperatura = 'alerta frio'
        grauDeAvisoCor = 'alerta-frio'
        exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
    }
    else if (temp <= limites_temperatura.muito_frio) {
        classe_temperatura = 'perigo-frio';
        grauDeAvisoTemperatura = 'perigo frio'
        grauDeAvisoCor = 'perigo-frio'
        exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
    }

      if (umid >= limites_umidade.muito_umido) {
          classe_umidade = 'perigo-quente';
          grauDeAvisoUmidade = 'perigo muito úmido'
          grauDeAvisoCor = 'perigo-quente'
          exibirAlertaUmidade(umid, idSensor, nomeSetor, grauDeAvisoUmidade, grauDeAvisoCor)
      }
      else if (umid < limites_umidade.muito_umido && umid >= limites_umidade.umido) {
          classe_umidade = 'alerta-quente';
          grauDeAvisoUmidade = 'alerta úmido'
          grauDeAvisoCor = 'alerta-quente'
          exibirAlertaUmidade(umid, idSensor, nomeSetor, grauDeAvisoUmidade, grauDeAvisoCor)
      }
      else if (umid < limites_umidade.umido && umid > limites_umidade.seco) {
          classe_umidade = 'ideal';
          removerAlerta(idSensor);
      }
      else if (umid <= limites_umidade.seco && umid > limites_umidade.muito_seco) {
          classe_umidade = 'alerta-frio';
          grauDeAvisoUmidade = 'alerta seco'
          grauDeAvisoCor = 'alerta-frio'
          exibirAlertaUmidade(umid, idSensor, nomeSetor , grauDeAvisoUmidade, grauDeAvisoCor)
      }
      else if (umid <= limites_umidade.muito_seco) {
          classe_umidade = 'perigo-frio';
          grauDeAvisoUmidade = 'perigo muito seco'
          grauDeAvisoCor = 'perigo-frio'
          exibirAlertaUmidade(umid, idSensor, nomeSetor , grauDeAvisoUmidade, grauDeAvisoCor)
      }
}

     // alerta Temperatura
    function exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor) {
        var indice = alertasTemperatura.findIndex(item => item.idSensor == idSensor);
            
        if (indice >= 0) {
            alertasTemperatura[indice] = {idSensor, nomeSetor, temp, grauDeAvisoTemperatura, grauDeAvisoCor }
        } else {
            alertasTemperatura.push({idSensor, nomeSetor, temp, grauDeAvisoTemperatura, grauDeAvisoCor });
        }
    
        exibirCards();
    
    }

    // alerta Umidade
    function exibirAlertaUmidade(umid, idSensor, nomeSetor, grauDeAvisoUmidade, grauDeAvisoCor) {
        var indice = alertasUmidade.findIndex(item => item.idSensor == idSensor);
    
        if (indice >= 0) {
            alertasUmidade[indice] = { idSensor, nomeSetor, umid, grauDeAvisoUmidade, grauDeAvisoCor }
        } else {
            alertasUmidade.push({ idSensor, nomeSetor, umid, grauDeAvisoUmidade, grauDeAvisoCor });
        }
    
        exibirCards();
        
    }

    function removerAlerta(idSensor) {
        alertasTemperatura = alertasTemperatura.filter(item => item.idSensor != idSensor);
        alertasUmidade = alertasUmidade.filter(item => item.idSensor != idSensor);
        exibirCards();
    }
     
var b;

    function exibirCards() {
        div_alerta.innerHTML = '';
    
        for (var i = 0; i < alertasTemperatura.length; i++) {
            var mensagemTemperatura = alertasTemperatura[i];
            div_alerta.innerHTML += transformarEmDivTemperatura(mensagemTemperatura);
        }

        for (var i = 0; i < alertasUmidade.length; i++) {
            var mensagemUmidade = alertasUmidade[i];
            div_alerta.innerHTML += transformarEmDivUmidade(mensagemUmidade);
        }
        
    }

    function transformarEmDivTemperatura({ nomeSetor, temp, grauDeAvisoTemperatura, grauDeAvisoCor }) {
        return `<div class="mensagem-alarme">
        <div class="informacao">
        <div class="div_${grauDeAvisoCor}">&#12644;</div> 
         <h3>${nomeSetor} está em estado de ${grauDeAvisoTemperatura}!</h3>
        <small>Temperatura ${temp}.</small>   
        </div>`;
    }

    function transformarEmDivUmidade({ nomeSetor, umid, grauDeAvisoUmidade, grauDeAvisoCor }) {
        return `<div class="mensagem-alarme">
        <div class="informacao">
        <div class="div_${grauDeAvisoCor}">&#12644;</div> 
         <h3>${nomeSetor} está em estado de ${grauDeAvisoUmidade}!</h3>
        <small>Umidade ${umid}.</small>   
        </div>`;
    }