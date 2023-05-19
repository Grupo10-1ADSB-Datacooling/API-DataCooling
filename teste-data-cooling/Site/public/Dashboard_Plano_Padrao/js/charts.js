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

