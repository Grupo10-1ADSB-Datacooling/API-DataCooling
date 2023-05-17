var corAbaixoIdeal = '#FF7B29';
var corIdeal = '#0BCD4D';
var corAcimaIdeal = '#FF1A22';
var corAlerta = '#FFFF00';
var corManutencao = '#7D7D7D';

var dashboardContent = 
    `<div class="line">
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

const labels = [
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
]

////////////////////////////////////////////////////////////////////

// Dados do Setor A

    const dataTemperatureA = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: `${corIdeal}`,
            data: [25.4, 26, 26.8, 27, 26.5, 26],
        }]
    };

    const dataHumidityA = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `${corAcimaIdeal}`,
            data: [53.2, 53, 54, 55.65, 56.3, 57],
        }]
    };

    const dataMediaTemperatureA = {
        datasets: [{
            label: 'Média da Temperatura',
            data: [21.9, 26.37, 28.15],
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const dataMediaHumidityA = {
        datasets: [{
            label: 'Média em %',
            data: [42.3, 48.7, 56.2],
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const configTemperatureA = {
        type: 'line',
        data: dataTemperatureA,
    }
        
    const configHumidityA = {
        type: 'line',
        data: dataHumidityA,
    }

    const configMediaTemperatureA = {
        type: 'doughnut',
        data: dataMediaTemperatureA,
    };

    const configMediaHumidityA = {
        type: 'doughnut',
        data: dataMediaHumidityA,
    };

////////////////////////////////////////////////////////////////////

// Dados do Setor B

    const dataTemperatureB = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: `${corIdeal}`,
            data: [24, 24.9, 26, 27, 26.4, 25],
        }]
    };

    const dataHumidityB = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `${corIdeal}`,
            data: [46, 44.9, 45.7, 46, 46.6, 47],
        }]
    };

    const dataMediaTemperatureB = {
        datasets: [{
            label: 'Média da Temperatura',
            data: [22.5, 24.78, 28.23],
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const dataMediaHumidityB = {
        datasets: [{
            label: 'Média em %',
            data: [43.7, 48.45, 56.2],
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const configTemperatureB = {
        type: 'line',
        data: dataTemperatureB,
    }
        
    const configHumidityB = {
        type: 'line',
        data: dataHumidityB,
    }

    const configMediaTemperatureB = {
        type: 'doughnut',
        data: dataMediaTemperatureB,
    };

    const configMediaHumidityB = {
        type: 'doughnut',
        data: dataMediaHumidityB,
    };

////////////////////////////////////////////////////////////////////

// Dados do Setor C

    const dataTemperatureC = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: `${corAlerta}`,
            data: [25, 24, 23.4, 22.7, 22, 21.5],
        }]
    };

    const dataHumidityC = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `${corAlerta}`,
            data: [45.2, 45, 44, 44.5, 44, 43],
        }]
    };

    const dataMediaTemperatureC = {
        datasets: [{
            label: 'Média da Temperatura',
            data: [22.3, 25.7, 28.9],
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const dataMediaHumidityC = {
        datasets: [{
            label: 'Média em %',
            data: [42.4, 51.6, 57.1],        
            backgroundColor: [
                `${corAbaixoIdeal}`,
                `${corIdeal}`,
                `${corAcimaIdeal}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const configTemperatureC = {
        type: 'line',
        data: dataTemperatureC,
    }
        
    const configHumidityC = {
        type: 'line',
        data: dataHumidityC,
    }

    const configMediaTemperatureC = {
        type: 'doughnut',
        data: dataMediaTemperatureC,
    };

    const configMediaHumidityC = {
        type: 'doughnut',
        data: dataMediaHumidityC,
    };


////////////////////////////////////////////////////////////////////

// Dados do Setor D

    const dataTemperatureD = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: `${corManutencao}`,
            data: [0, 0, 0, 0, 0, 0],
        }]
    };

    const dataHumidityD = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `${corManutencao}`,
            data: [0, 0, 0, 0, 0, 0],
        }]
    };

    const dataMediaTemperatureD = {
        datasets: [{
            label: 'Média da Temperatura',
            data: [0, 0, 0],
            backgroundColor: [
                `${corManutencao}`,
                `${corManutencao}`,
                `${corManutencao}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const dataMediaHumidityD = {
        datasets: [{
            label: 'Média em %',
            data: [0, 0 , 0],
            backgroundColor: [
                `${corManutencao}`,
                `${corManutencao}`,
                `${corManutencao}`
                ],
            borderColor: 'transparent',
            
        }],

        labels: [
            'Abaixo do Ideal',
            'Ideal',
            'Acima do Ideal'
        ]
    };

    const configTemperatureD = {
        type: 'line',
        data: dataTemperatureD,
    }
        
    const configHumidityD = {
        type: 'line',
        data: dataHumidityD,
    }

    const configMediaTemperatureD = {
        type: 'doughnut',
        data: dataMediaTemperatureD,
    };

    const configMediaHumidityD = {
        type: 'doughnut',
        data: dataMediaHumidityD,
    };

////////////////////////////////////////////////////////////////////

function gerarGraficos(){
    // Armazenando o valor do select
        var setor = select_setor.value;
    // Selecionando o primeiro elemento do documento com a classe dashboard
        var dashboard = document.querySelector('.dashboard');
    // Selecionando o elemento HTML com o id titleStatus
        var titleStatus = document.getElementById('titleStatus');
    // Limpando o conteúdo HTML do titleStatus
        titleStatus.innerHTML = ``;
    // Limpando o conteúdo HTML do dashboard
        dashboard.innerHTML = "";

    if(setor!="null"){
        // Alterando o conteúdo HTML do titleStatus
            titleStatus.innerHTML = `Hoje seu DataCenter está: <span id="statusDatacenter"></span>`;
        // Alterando o conteúdo HTML do dashborad
            dashboard.innerHTML = dashboardContent;
        // Selecionando o elemento HTML com o id statusDatacenter
            var status = document.getElementById('statusDatacenter');

        // Configuração dos Gráficos DINÂMICOS
            if(setor == "A"){
                status.innerText = 'Acima do Ideal!';
                titleStatus.style.color = corAcimaIdeal;
                status.style.color = corAcimaIdeal;

                const chartTemperatureA = new Chart(
                    document.getElementById('chartTemperature'),
                    configTemperatureA
                    )
                    
                    const chartHumidityA = new Chart(
                        document.getElementById('chartHumidity'),
                        configHumidityA
                    )
                
                    const chartMediaTemperatureA = new Chart(
                        document.getElementById('chartMediaTemperature'),
                        configMediaTemperatureA
                    );
                
                    const chartMediaHumidityA = new Chart(
                        document.getElementById('chartMediaHumidity'),
                        configMediaHumidityA
                    );
            } else if(setor == "B"){
                status.innerText = 'Ideal!';
                titleStatus.style.color = corIdeal;
                status.style.color = corIdeal;

                const chartTemperatureB = new Chart(
                    document.getElementById('chartTemperature'),
                    configTemperatureB
                    )
                    
                    const chartHumidityB = new Chart(
                        document.getElementById('chartHumidity'),
                        configHumidityB
                    )
                
                    const chartMediaTemperatureB = new Chart(
                        document.getElementById('chartMediaTemperature'),
                        configMediaTemperatureB
                    );
                
                    const chartMediaHumidityB = new Chart(
                        document.getElementById('chartMediaHumidity'),
                        configMediaHumidityB
                    );
            } else if(setor == "C"){
                status.innerText = 'Abaixo do Ideal!';
                titleStatus.style.color = corAlerta;
                status.style.color = corAlerta;

                const chartTemperatureC = new Chart(
                    document.getElementById('chartTemperature'),
                    configTemperatureC
                    )
                    
                    const chartHumidityC = new Chart(
                        document.getElementById('chartHumidity'),
                        configHumidityC
                    )
                
                    const chartMediaTemperatureC = new Chart(
                        document.getElementById('chartMediaTemperature'),
                        configMediaTemperatureC
                    );
                
                    const chartMediaHumidityC = new Chart(
                        document.getElementById('chartMediaHumidity'),
                        configMediaHumidityC
                    );
            } else{
                status.innerText = 'Sem captura';
                titleStatus.style.color = corManutencao;
                status.style.color = corManutencao;

                const chartTemperatureD = new Chart(
                    document.getElementById('chartTemperature'),
                    configTemperatureD
                    )
                    
                    const chartHumidityD = new Chart(
                        document.getElementById('chartHumidity'),
                        configHumidityD
                    )
                
                    const chartMediaTemperatureD = new Chart(
                        document.getElementById('chartMediaTemperature'),
                        configMediaTemperatureD
                    );
                
                    const chartMediaHumidityD = new Chart(
                        document.getElementById('chartMediaHumidity'),
                        configMediaHumidityD
                    );
            }
    }
}

// ----------------------------------------------------------------------------

    nomeEmpresa.innerHTML = sessionStorage.RAZAO_SOCIAL;

    let proximaAtualizacao;

    window.onload = obterDadosGraficos();

    function obterDadosGraficos() {
        obterDadosGrafico(1)
        // obterDadosGrafico(2)
        // obterDadosGrafico(3)
        // obterDadosGrafico(4)
    }

    verificar_autenticacao();

    function alterarTitulo(idAquario) {
        var tituloAquario = document.getElementById(`tituloAquario${idAquario}`)
        tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #e6005a'>Aquário " + idAquario + "</span>"
    }

    function exibirAquario(idAquario) {
        let todosOsGraficos = document.getElementById("graficos")

        for (i = 1; i <= todosOsGraficos.childElementCount; i++) {
            // exibindo - ou não - o gráfico
            let elementoAtual = document.getElementById(`grafico${i}`)
            if (elementoAtual.classList.contains("display-block")) {
                elementoAtual.classList.remove("display-block")
            }
            elementoAtual.classList.add("display-none")
            
            // alterando estilo do botão
            let btnAtual = document.getElementById(`btnAquario${i}`)
            if (btnAtual.classList.contains("btn-pink")) {
                btnAtual.classList.remove("btn-pink")
            }
            btnAtual.classList.add("btn-white")
        }
        
        // exibindo - ou não - o gráfico
        let graficoExibir = document.getElementById(`grafico${idAquario}`)
        graficoExibir.classList.remove("display-none")
        graficoExibir.classList.add("display-block")
        
        // alterando estilo do botão
        let btnExibir = document.getElementById(`btnAquario${idAquario}`)
        btnExibir.classList.remove("btn-white")
        btnExibir.classList.add("btn-pink")
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
    function obterDadosGrafico(idAquario) {

        alterarTitulo(idAquario)

        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        fetch(`/medidas/ultimas/${idAquario}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, idAquario);
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
    function plotarGrafico(resposta, idAquario) {

        console.log('iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels
        let labels = [];

        // Criando estrutura para plotar gráfico - dados
        let dados = {
            labels: labels,
            datasets: [{
                label: 'Umidade',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Temperatura',
                data: [],
                fill: false,
                borderColor: 'rgb(199, 52, 52)',
                tension: 0.1
            }]
        };

        console.log('----------------------------------------------')
        console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
        console.log(resposta)

        // Inserindo valores recebidos em estrutura para plotar o gráfico
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            labels.push(registro.momento_grafico);
            dados.datasets[0].data.push(registro.umidade);
            dados.datasets[1].data.push(registro.temperatura);
        }

        console.log('----------------------------------------------')
        console.log('O gráfico será plotado com os respectivos valores:')
        console.log('Labels:')
        console.log(labels)
        console.log('Dados:')
        console.log(dados.datasets)
        console.log('----------------------------------------------')

        // Criando estrutura para plotar gráfico - config
        const config = {
            type: 'line',
            data: dados,
        };

        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(
            document.getElementById(`myChartCanvas${idAquario}`),
            config
        );

        setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
    }


    // Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
    // buscando a última medida inserida em tabela contendo as capturas, 

    //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
    //     Para ajustar o "select", ajuste o comando sql em src/models
    function atualizarGrafico(idAquario, dados, myChart) {

        fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico:`);
                    console.log(dados);

                    let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                    avisoCaptura.innerHTML = ""


                    if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                        console.log("---------------------------------------------------------------")
                        console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                        avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                        console.log("Horário do novo dado capturado:")
                        console.log(novoRegistro[0].momento_grafico)
                        console.log("Horário do último dado capturado:")
                        console.log(dados.labels[dados.labels.length - 1])
                        console.log("---------------------------------------------------------------")
                    } else {
                        // tirando e colocando valores no gráfico
                        dados.labels.shift(); // apagar o primeiro
                        dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                        dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                        dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                        dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                        dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                        myChart.update();
                    }

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }
