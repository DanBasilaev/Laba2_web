const url = 'http://api.openweathermap.org/data/2.5/weather?q='+'Санкт-Петербург'+'&units=metric&lang=ru&appid=5aa741a37ff6512516bcb3da3ea973f0';
fetch(url).then(function (resp) {return resp.json() }).then(function (data) {
    console.log(data);
    //document.getElementsByClassName('weather__title').item(0).innerHTML = data.name;
    document.querySelector(".first h2").textContent = data.name;
    document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector(".first p").textContent = data.main.temp + '°C';

    document.querySelector(".wind").textContent = data.wind.speed + ' m/s';
    document.querySelector(".cloud").textContent = data.clouds.all + '%';
    document.querySelector(".pressure").textContent = data.main.pressure + ' hpa';
    document.querySelector(".humidity").textContent = data.main.humidity +'%';
    document.querySelector(".coord").textContent = '['+data.coord.lat + ', ' + data.coord.lon + ']';
})
    .catch(function () {
        //Обрабатываем ошибки
    });
