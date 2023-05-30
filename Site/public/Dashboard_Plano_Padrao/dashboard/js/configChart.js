// ----------------------------------------------------------------------------

let proximaAtualizacao;
var alertasTemperatura = [];
var alertasUmidade = [];

function obterDadosGraficos() {
    var dashboard = document.querySelector('.dashboard')
    dashboard.innerHTML =   `<div class="line">
            <div class="line-chart">
                <div class="title">
                    <h4> Temperatura </h4>
                </div>
                <div class="chart">
                    <canvas id="chartTemperature"></canvas>
                </div>
            </div>
            <div class="line-chart">
                <div class="title">
                    <h4> Umidade </h4>
                </div>
                <div class="chart">
                    <canvas id="chartHumidity"></canvas>
                </div>
            </div>
            </div>
            <div class="donut">
            <div class="donut-chart">
                <div class="title">
                    <h4> Média da Temperatura</h4>
                </div>
                <div class="chart">
                    <canvas class="chart-item" id="chartMediaTemperature"></canvas>
                </div>
            </div>
            <div class="donut-chart">
                <div class="title">
                    <h4> Média da Umidade</h4>
                </div>
                <div class="chart">
                    <canvas class="chart-item" id="chartMediaHumidity"></canvas>
                </div>
            </div>
        </div>`;
    var idSensor = Number(select_sensor.value);
    var dataRegistro = select_data.value;
    console.log(idSensor)
    obterDadosGrafico(idSensor, dataRegistro)
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models

function obterDadosGrafico(idSensor, dataRegistro) {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idSensor}/${dataRegistro}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idSensor, dataRegistro);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idSensor, dataRegistro) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosTemperatura = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
    let dadosUmidade = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
        

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    if(resposta.length == 0){
        labels.push(0);
        dadosTemperatura.datasets[0].data.push(0);
        dadosUmidade.datasets[0].data.push(0);
    } else {
        // Inserindo valores recebidos em estrutura para plotar o gráfico
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            labels.push(registro.momento_grafico);
            dadosTemperatura.datasets[0].data.push(registro.temperatura);
            dadosUmidade.datasets[0].data.push(registro.umidade);
        }
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados de Temperatura:')
    console.log(dadosTemperatura.datasets)
    console.log('Dados de Umidade:')
    console.log(dadosUmidade.datasets)
    console.log('----------------------------------------------')


    // Criando estrutura para plotar gráfico de temperatura - configTemperatura
    const configTemperatura = {
        type: 'line',
        data: dadosTemperatura,
    };

    
    // Criando estrutura para plotar gráfico de umidade- configUmidade
    const configUmidade = {
        type: 'line',
        data: dadosUmidade,
    };

    // Adicionando gráfico de temperatura criado em div na tela
    let chartTemperatura = new Chart(
        document.getElementById(`chartTemperature`),
        configTemperatura
    );

    
    // Adicionando gráfico de umidade criado em div na tela
    let chartUmidade = new Chart(
        document.getElementById(`chartHumidity`),
        configUmidade
    );

    setTimeout(() => atualizarGrafico(idSensor, dataRegistro, dadosTemperatura, dadosUmidade, chartTemperatura, chartUmidade), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idSensor, dadosTemperatura, dadosUmidade, chartTemperatura, chartUmidade) {

    fetch(`/medidas/tempo-real/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosTemperatura, dadosUmidade);
                alertar(novoRegistro, idSensor, novoRegistro[0].nome);


                if (novoRegistro[0].momento_grafico == dadosTemperatura.labels[dadosTemperatura.labels.length - 1] && novoRegistro[0].momento_grafico == dadosUmidade.labels[dadosUmidade.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado de temperatura capturado:")
                    console.log(dadosTemperatura.labels[dadosTemperatura.labels.length - 1])
                    console.log("Horário do último dado de umidade capturado:")
                    console.log(dadosUmidade.labels[dadosUmidade.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dadosTemperatura.labels.shift(); // apagar o primeiro dos dados temperatura
                    dadosUmidade.labels.shift(); // apagar o primeiro dos dados umidade
                    dadosTemperatura.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
                    dadosUmidade.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dadosTemperatura.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    dadosUmidade.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadosTemperatura.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura
                    dadosUmidade.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    chartTemperatura.update();
                    chartUmidade.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idSensor, dadosTemperatura, dadosUmidade, chartTemperatura, chartUmidade), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idSensor, dadosTemperatura, dadosUmidade, chartTemperatura, chartUmidade), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor, nomeSetor) {
    var temp = resposta[0].temperatura;
    var umid = resposta[0].umidade;
    console.log(resposta);

    console.log(idSensor  === resposta[0].fkSensor)
    
    var grauDeAvisoTemperatura ='';
    var grauDeAvisoUmidade ='';

    var limites_temperatura = {
        critico_quente: 30,
        alerta_quente: 28,
        ideal: 23,
        alerta_frio: 20,
        critico_frio: 18
    };
    
    var limites_umidade = {
        critico_umido: 60,
        alerta_umido: 57,
        ideal: 45,
        alerta_seco: 40,
        critico_seco: 35
    };

    // Alertas de temperatura
    var classe_temperatura = 'cor-alerta';

    if(temp != null){
        if (temp >= limites_temperatura.critico_quente) {
            classe_temperatura = 'critico';
            grauDeAvisoTemperatura = 'crítico muito quente';
            grauDeAvisoCor = 'critico-cor';
            exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
        }
        else if (temp < limites_temperatura.critico_quente && temp >= limites_temperatura.alerta_quente) {
            classe_temperatura = 'alerta';
            grauDeAvisoTemperatura = 'alerta quente'
            grauDeAvisoCor = 'alerta-quente'
            exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
        }
        else if (temp < limites_temperatura.alerta_quente && temp > limites_temperatura.alerta_frio) {
            classe_temperatura = 'ideal';
            removerAlerta(idSensor);
        }
        else if (temp <= limites_temperatura.alerta_frio && temp > limites_temperatura.critico_frio) {
            classe_temperatura = 'alerta';
            grauDeAvisoTemperatura = 'alerta frio'
            grauDeAvisoCor = 'alerta-cor'
            exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
        }
        else if (temp <= limites_temperatura.critico_frio) {
            classe_temperatura = 'critico';
            grauDeAvisoTemperatura = 'critíco frio'
            grauDeAvisoCor = 'critico-cor'
            exibirAlertaTemperatura(temp, idSensor, nomeSetor, grauDeAvisoTemperatura, grauDeAvisoCor)
        }
    }
    
      // Alertas de umidade
      var classe_umidade = 'cor-alerta'

      if(umid != null){
        if (umid >= limites_umidade.critico_umido) {
            classe_umidade = 'critico';
            grauDeAvisoUmidade = 'crítico muito úmido'
            grauDeAvisoCor = 'critico-cor'
            exibirAlertaUmidade(umid, idSensor, nomeSetor, grauDeAvisoUmidade, grauDeAvisoCor)
        }
        else if (umid < limites_umidade.critico_umido && umid >= limites_umidade.alerta_umido) {
            classe_umidade = 'alerta';
            grauDeAvisoUmidade = 'alerta úmido'
            grauDeAvisoCor = 'alerta-cor'
            exibirAlertaUmidade(umid, idSensor, nomeSetor, grauDeAvisoUmidade, grauDeAvisoCor)
        }
        else if (umid < limites_umidade.alerta_umido && umid > limites_umidade.alerta_seco) {
            classe_umidade = 'ideal';
            removerAlerta(idSensor);
        }
        else if (umid <= limites_umidade.alerta_seco && umid > limites_umidade.critico_seco) {
            classe_umidade = 'alerta';
            grauDeAvisoUmidade = 'alerta seco'
            grauDeAvisoCor = 'alerta-cor'
            exibirAlertaUmidade(umid, idSensor, nomeSetor , grauDeAvisoUmidade, grauDeAvisoCor)
        }
        else if (umid <= limites_umidade.critico_seco) {
            classe_umidade = 'critico';
            grauDeAvisoUmidade = 'crítico muito seco'
            grauDeAvisoCor = 'critico-cor'
            exibirAlertaUmidade(umid, idSensor, nomeSetor , grauDeAvisoUmidade, grauDeAvisoCor)
        }
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

    function transformarEmDivTemperatura({ idSensor, nomeSetor, temp, grauDeAvisoTemperatura, grauDeAvisoCor }) {
        return `<div class="mensagem-alarme">
        <div class="informacao">
        <div id="${grauDeAvisoCor}">&#12644;</div> 
         <h3 id="${grauDeAvisoCor}">${nomeSetor} está em estado de ${grauDeAvisoTemperatura}!</h3>
        <small>Temperatura: ${temp}°C  </small>   
        </div>`;
    }

    function transformarEmDivUmidade({ idSensor, nomeSetor, umid, grauDeAvisoUmidade, grauDeAvisoCor }) {
        return `<div class="mensagem-alarme">
        <div class="informacao">
        <div id="${grauDeAvisoCor}">&#12644;</div> 
         <h3 id="${grauDeAvisoCor}">${nomeSetor} está em estado de ${grauDeAvisoUmidade}!</h3>
        <small>Umidade: ${umid}%</small>   
        </div>`;
    }