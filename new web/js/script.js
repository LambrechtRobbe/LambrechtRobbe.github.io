const endpoint = 'http://api.openweathermap.org/data/2.5/weather?id=2793858&APPID=c6c856dfe891c33e3c9cd3bf98d1a2f6';
let customheaders = new Headers();
customheaders.append('accept', 'application/json');
const endpointimg = 'http://openweathermap.org/img/wn/';

// Retrieve data

const getapidata = async function(){
    const response = await fetch(endpoint, {headers : customheaders});
    const data = await response.json();
    filterdata(data);
}

// Calculations

const calccelcius = function(kelvin){
    return String(Math.round((parseFloat(kelvin) - 273.15) * 100) / 100);
}

const calctime = function(utxtime){
    return new Date(utxtime*1000);
}

// Micro-transactions

const setborder = function(id){
    if (id == 1) {
        document.getElementById('slider').classList.add("o-slider__left");
        document.getElementById('slider').classList.remove("o-slider__center");
        document.getElementById('slider').classList.remove("o-slider__right");
    }
    if (id == 2) {
        document.getElementById('slider').classList.add("o-slider__center");
        document.getElementById('slider').classList.remove("o-slider__left");
        document.getElementById('slider').classList.remove("o-slider__right");
    }
    if (id == 3) {
        document.getElementById('slider').classList.add("o-slider__right");
        document.getElementById('slider').classList.remove("o-slider__left");
        document.getElementById('slider').classList.remove("o-slider__center");
    }
}

// change innerhtml

const filterdata = function(data){
    var datesunrise = calctime(data.sys.sunrise);
    let datesunset = calctime(data.sys.sunset);
    document.querySelector('#headimg').src = endpointimg + data.weather[0].icon + '@2x.png';
    document.querySelector('#lblimg').innerHTML = data.weather[0].main;
    document.querySelector('#lblcity').innerHTML = data.name;
    document.querySelector('#lbltemp').innerHTML = calccelcius(data.main.temp) + ' °C';
    document.querySelector('#lbltempmain').innerHTML = calccelcius(data.main.temp) + ' °C';
    //document.querySelector('#sunrise').innerHTML = datesunrise.getHours() + ':' + datesunrise.getMinutes() + ':' + datesunrise.getSeconds();
    //document.querySelector('#sunset').innerHTML = datesunset.getHours() + ':' + datesunset.getMinutes() + ':' + datesunset.getSeconds();
    document.querySelector('#lblhumidity').innerHTML = data.main.humidity + '%';
    document.querySelector('#lblclouds').innerHTML = data.main.pressure + ' Pa';
    document.querySelector('#lblwindspeed').innerHTML = data.wind.speed + 'Bft';
    
    
}


// init
getapidata();


