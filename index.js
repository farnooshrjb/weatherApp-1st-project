// In your project, display the current date and time using JavaScript

function formatDate(timestamp) {
    let date = new Date(timestamp);



    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let day = days[date.getDay()];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 7) {
            forecastHTML =
                forecastHTML +
                ` 
    
        <div class="col">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            
           <img
                src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="60"
            />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
            </div>
        </div>
    

`;

        }
    });






    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;


}
function getForecast(coordinates) {
    let apiKey = `6bfa54f242cbb59343d4e58db578dc61`;
    //console.log(coordinates);
    let apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}



function displayTemprature(response) {
    //console.log(response.data);
    let tempratureElement = document.querySelector("#temperature");
    tempratureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#current-date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemprature = response.data.main.temp;

    getForecast(response.data.coord);

}

function search(city) {

    let apiKey = `ab82911f5489acd5368aba2902d18e38`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemprature);

}


function handlesubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#inputcity");
    //console.log(cityInputElement.value);
    search(cityInputElement.value);
}

// unit conversion:
// fahrenheit:

function displayFahrenheitTemprature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemprature = (celsiusTemprature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemprature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemprature);
//celsius:

function displaycelsiusTemprature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemprature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemprature);


let celsiusTemprature = null;

// Control form with JavaScript:
let form = document.querySelector("#searchForm");
form.addEventListener("submit", handlesubmit);


search("Tehran");
//displayForecast();

