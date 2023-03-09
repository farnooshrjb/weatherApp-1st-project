// In your project, display the current date and time using JavaScript


function formatDate(timestamp) {
    let date = new Date(timestamp);



    let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
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


// display temprature , wind , humidity and... by using API IN JavaScript:

function displayTemprature(response) {
    console.log(response.data);
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
    //Time & Date:
    let dateElement = document.querySelector("#current-date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    // Change weather icon
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}







let city = "paris";
let apiKey = `ab82911f5489acd5368aba2902d18e38`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemprature);