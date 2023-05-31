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

    setTimeout(() => atualizarGrafico(idSensor, dadosTemperatura, dadosUmidade, chartTemperatura, chartUmidade), 2000);
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