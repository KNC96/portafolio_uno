let workerContador;
//estas son las variables de la app del clima
let searchBtn = document.getElementById('search-btn');
let cityRef = document.getElementById('city');
let key = '69023853454b77bb14f59764b1216bff';
let resultado = document.getElementById("resultado");


function iniciar_contador(){
    workerContador = new Worker('./worker1.js');
    workerContador.onmessage = function (evento){
        document.getElementById('contador').innerText = evento.data;
        binance();
    }
}

//esta funcion pide datos de binance
function binance(){
    axios({
        method: 'GET' ,
        url: 'https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m&limit=2'
    }).then(res =>{
        let datos = (res.data)[1];
        let close = parseFloat(datos[4]).toFixed(2);
        document.getElementById('precio').innerText = (close)+" USD";
    })
}

//esta funcion pide datos del clima
function weather_App(){
    let cityValue = cityRef.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    fetch(url).then((resp) => resp.json()).then(data => {
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log('temperatura '+(data.main.temp)+'°');
        resultado.innerHTML = `<h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h2>${data.main.temp} &#176</h2>`;
    })
};
searchBtn.addEventListener('click', weather_App);