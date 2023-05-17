var dadosTemperatura = [30, 29, 28, 25, 22, 33];
var dadosUmidade = [46, 44, 45, 47, 48, 47];
var dadosMediaTemperatura = [10, 85, 5];
var dadosMediaUmidade = [7.5, 89.5, 3]

function gerarGraficos() {
    function selecionarSetor() {
        var setorSelecionado = Number(select_setor.value);
    
        if (setorSelecionado == 1) {
            dadosTemperatura = [30, 29, 28, 25, 22, 33];
            dadosUmidade = [46, 44, 45, 47, 48, 47];
            dadosMediaTemperatura = [10, 85, 5];
            dadosMediaUmidade = [7.5, 89.5, 3]
    
        } else if (setorSelecionado == 2) {
            dadosTemperatura = [27, 26.4, 26, 26.9, 27.4, 28];
            dadosUmidade = [48, 47, 47.3, 44, 48, 47];
            dadosMediaTemperatura = [10, 85, 5];
            dadosMediaUmidade = [7.5, 89.5, 3]
        } else if (setorSelecionado == 3) {
            dadosTemperatura = [27, 26.4, 26, 26.9, 27.4, 28];
            dadosUmidade = [48, 47, 47.3, 44, 48, 47];
            dadosMediaTemperatura = [10, 85, 5];
            dadosMediaUmidade = [7.5, 89.5, 3]
        } else {
            dadosTemperatura = [27, 26.4, 26, 26.9, 27.4, 28];
            dadosUmidade = [48, 47, 47.3, 44, 48, 47];
            dadosMediaTemperatura = [10, 85, 5];
            dadosMediaUmidade = [7.5, 89.5, 3]
        }
    }

    var corAbaixoIdeal = '#FF7B29';
    var corIdeal = '#0BCD4D';
    var corAcimaIdeal = '#FF1A22';

    const labels = [
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00'
    ]

    const dataTemperature = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            borderColor: '#ff1A22',
            data: dadosTemperatura,
        }]
    };

    const dataHumidity = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: '#5E4DCD',
            data: dadosUmidade,
        }]
    };

    const dataMediaTemperature = {
        datasets: [{
            label: 'Média da Temperatura',
            data: dadosMediaTemperatura,
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

    const dataMediaHumidity = {
        datasets: [{
            label: 'Média em %',
            data: dadosMediaUmidade,
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

    const configTemperature = {
        type: 'line',
        data: dataTemperature,
    }

    const configHumidity = {
        type: 'line',
        data: dataHumidity,
    }

    configMediaTemperature = {
        type: 'doughnut',
        data: dataMediaTemperature,
    };

    configMediaHumidity = {
        type: 'doughnut',
        data: dataMediaHumidity,
    };

    const chartTemperature = new Chart(
        document.getElementById('chartTemperature'),
        configTemperature
    )

    const chartHumidity = new Chart(
        document.getElementById('chartHumidity'),
        configHumidity
    )

    const chartMediaTemperature = new Chart(
        document.getElementById('chartMediaTemperature'),
        configMediaTemperature
    );

    const chartMediaHumidity = new Chart(
        document.getElementById('chartMediaHumidity'),
        configMediaHumidity
    );

}

gerarGraficos();






