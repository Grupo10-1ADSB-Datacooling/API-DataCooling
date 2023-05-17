function gerarGraficos(){
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
