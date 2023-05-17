var corAbaixoIdeal = '#FF7B29';
var corIdeal = '#0BCD4D';
var corAcimaIdeal = '#FF1A22';

    const dataMediaTemperature = {
        datasets: [{
            label: 'Média da Temperatura',
            data: [10, 85, 5],
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
            data: [7.5, 89.5, 3],
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
            borderColor: `${corAcimaIdeal}`,
            data: [26, 26, 27, 28, 29, 31],
        }]
    };
    
    const dataHumidity = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            borderColor: `${corIdeal}`,
            data: [46, 44, 45, 47, 48, 47],
        }]
    };
    
    const configTemperature = {
        type: 'line',
        data: dataTemperature,
    }
        
    const configHumidity = {
        type: 'line',
        data: dataHumidity,
    }
    
    const configMediaTemperature = {
        type: 'doughnut',
        data: dataMediaTemperature,
    };

    const configMediaHumidity = {
        type: 'doughnut',
        data: dataMediaHumidity,
    };
