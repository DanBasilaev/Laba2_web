/*---------------------------------------------------    Избранное      ---------------------------------------------------*/

favorites = window.localStorage;
const KEY = '5aa741a37ff6512516bcb3da3ea973f0';


/*-------- Добавление --------*/
let Form = document.getElementById('form')
Form.onsubmit = function() {
    let name = document.getElementById('POST-name');
    let key = String(favorites.length)
    favorites.setItem(key, name.value);
    location.reload();

    //favorites.clear();

};


for(let i=0; i<favorites.length; i++) {
    let key = favorites.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`)
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + favorites.getItem(key) + '&units=metric&lang=ru&appid=' + KEY;

    fetch(url).then(function (resp) {return resp.json() }).then(function (data) {

        let favor = document.querySelector('.menu');

        let city = document.createElement("li");
        city.classList.add('city');

        let head = document.createElement("div");
        head.classList.add('flex');
        city.appendChild(head);

        let name = document.createElement("h3");
        name.textContent = data.name;
        let temp = document.createElement("p");
        temp.textContent = data.main.temp + '°C';
        let img = document.createElement("span");
        img.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        let btn = document.createElement("button");
        btn.classList.add('delete');
        btn.onclick = function (){
            favorites.removeItem(key);
            location.reload();
        }
        btn.innerHTML =  `<img src="img/del.jpeg">`;

        head.appendChild(name);
        head.appendChild(temp);
        head.appendChild(img);
        head.appendChild(btn);



        let data_city = document.createElement("ul");
        data_city.classList.add('weather');
        city.appendChild(data_city);

        let wind_li = document.createElement("li");
        wind_li.textContent = "Ветер";
        data_city.appendChild(wind_li);
        let wind_data_city = document.createElement('span');
        wind_data_city.classList.add('wind');
        wind_li.appendChild(wind_data_city);
        wind_data_city.textContent = data.wind.speed + ' m/s';

        let cloud_li = document.createElement("li");
        cloud_li.textContent = "Облачность";
        data_city.appendChild(cloud_li);
        let cloud_data_city = document.createElement('span');
        cloud_data_city.classList.add('cloud');
        cloud_li.appendChild(cloud_data_city);
        cloud_data_city.textContent = data.clouds.all + '%';

        let pressure_li = document.createElement("li");
        pressure_li.textContent = "Давление";
        data_city.appendChild(pressure_li);
        let pressure_data_city = document.createElement('span');
        pressure_data_city.classList.add('pressure');
        pressure_li.appendChild(pressure_data_city);
        pressure_data_city.textContent = data.main.pressure + ' hpa';

        let humidity_li = document.createElement("li");
        humidity_li.textContent = "Влажность";
        data_city.appendChild(humidity_li);
        let humidity_data_city = document.createElement('span');
        humidity_data_city.classList.add('humidity');
        humidity_li.appendChild(humidity_data_city);
        humidity_data_city.textContent = data.main.humidity +'%';

        let coord_li = document.createElement("li");
        coord_li.textContent = "Координаты";
        data_city.appendChild(coord_li);
        let coord_data_city = document.createElement('span');
        coord_data_city.classList.add('coord');
        coord_li.appendChild(coord_data_city);
        coord_data_city.textContent = '['+data.coord.lat + ', ' + data.coord.lon + ']';


        favor.appendChild(city);
    })
        /*--- Обработка ошибок ---*/
        .catch(function () {
            //Обрабатываем ошибки
            alert(`Города ${localStorage.getItem(key)} нет в базе данных`);
            favorites.removeItem(key);
            location.reload();
        });
}


console.log(favorites);



