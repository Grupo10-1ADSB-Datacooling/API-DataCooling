function obterDadosGrafico(idSensor) {

    alterarTitulo(idSensor)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                gerarGrafico(resposta, idSensor);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function gerarGrafico(resposta, idSensor) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dataTemperature = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: `#f97989`,
            data: [],
        }]
    };

    let dataHumidity = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `#f97989`,
            data: [],
        }]
    };
    // let dados = {
    //     labels: labels,
    //     datasets: [{
    //         label: 'Umidade',
    //         data: [],
    //         fill: false,
    //         borderColor: 'rgb(75, 192, 192)',
    //         tension: 0.1
    //     },
    //     {
    //         label: 'Temperatura',
    //         data: [],
    //         fill: false,
    //         borderColor: 'rgb(199, 52, 52)',
    //         tension: 0.1
    //     }]
    // };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dataHumidity.datasets[0].data.push(registro.umidade);
        dataTemperature.datasets[0].data.push(registro.temperatura);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico de temperatura será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dataTemperature.datasets)
    console.log('----------------------------------------------')

    console.log('O gráfico de umidade será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dataHumidity.datasets)
    console.log('----------------------------------------------')


    // Criando estrutura para plotar gráfico - config
    const configTemperature = {
        type: 'line',
        data: dataTemperature,
    }
        
    const configHumidity = {
        type: 'line',
        data: dataHumidity,
    }

    // Adicionando gráfico criado em div na tela
    let chartTemperature = new Chart(
        document.getElementById(`chartTemperature`),
        configTemperature
    );

    
    // Adicionando gráfico criado em div na tela
    let chartHumidity = new Chart(
        document.getElementById(`chartHumidity`),
        configHumidity
    );

    setTimeout(() => atualizarGrafico(idSensor, dados, myChart), 2000);
}