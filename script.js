window.onload = function(){
    const key = "ab3610453bd495de0b77de24b6dd14d9";

    let weather = {
    name : null,
    temperature : null,
    humidity : null,
    description : null,
    pressure : null,
    wind : null,
    setWeather : function(data){
        weather.name = data.name;
        weather.temperature = Math.floor(data.main.temp - 273.15);
        weather.humidity = data.main.humidity;
        weather.description = "";
        for( let i = 0; i < data.weather.length; i++){
        if(i == 0) weather.description += data.weather[i].description + " ";
        else weather.description += "with " + data.weather[i].description + " ";
        }
        weather.pressure = data.main.pressure;
        this.wind = data.wind.speed;
    },
    setWeatherForecast : function(name, data){
        console.log(data);
        this.name = name;
        this.temperature = Math.floor(data.main.temp - 273);
        this.humidity = data.main.humidity;
        this.description = data.weather[0].description;
        this.pressure = data.main.pressure;
        this.wind = data.wind.speed;
    },
    displayWeather : function(n){
        let content;
        if(n==0){
        content = "Today It's " + this.description + " in "+ this.name + " at "+ this.temperature + "°C "+ "and "+ this.humidity+"% Humidity, "+this.wind+"m/s wind speed and "+this.pressure+"mb Pressure" ;
        }else{
        content = "Day "+n+" :- It will be " + this.description + " in "+ this.name + " at "+ this.temperature + "°C "+ "and "+ this.humidity+"% Humidity, "+this.wind+"m/s wind speed and "+this.pressure+"mb Pressure" ;
        }
        let div = document.createElement("div");
        console.log(content);
        div.innerHTML = content;
        let container = document.querySelector('#weather');
        container.appendChild(div);
    },
    };

    function displayWeatherForecast(data){
    let name = data.city.name;
    for( let i = 0, j = 0; i < 40 ; i+=8, j++){
        weather.setWeatherForecast(name, data.list[i]);
    }
    }

    function getWeather( latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
        let data = response.json();
        return data;
        })
    .then(function(data){
        console.log(data);
        weather.setWeather(data);
    })
    .then(function(){
        weather.displayWeather(0);
    })
    }

    function getWeatherForecast( latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        console.log(data);
        let name = data.city.name;
        for( let i = 0, j = 0; i < 40 ; i+=8, j++){
        weather.setWeatherForecast(name, data.list[i]);
        weather.displayWeather(j+1);
        }
    })
    }

    function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
    getWeatherForecast(latitude, longitude);
    }

    if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
    }
}



/background effect
function clipBackground(){
    document.getElementById("background").style.clipPath = "polygon(" + generatePath(8) +")";
}

function generateRandomNumbers(n){
    let randomNumbers = [];
    for(let i = 0; i < n; i++){
        randomNumbers.push(Math.floor(Math.random() * 101));
    }
    return randomNumbers;
}


function generatePath(n){
    let randomNumbers = generateRandomNumbers(2*n);
    let path = "";
    for(let i = 0; i < 2*n; i++){
        if(i % 2 === 0){
            path += randomNumbers[i] + "% ";
        }else if(i== 2*n - 1){
            path+= randomNumbers[i] + "%";
        }else{
            path += randomNumbers[i] + "%,";
        }
    }
    return path;
}


setInterval( clipBackground , 1000);