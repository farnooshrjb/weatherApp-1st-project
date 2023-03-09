// In your project, display the current date and time using JavaScript

function formatDate(timestamp) {
    let date = new Date(timestamp);

    let date = now.getDate();

    let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    let day = days[date.getDay()];

    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function diaplayTemprature(response) {
    let currentDate = document.querySelector("#current-date");
    currentDate.innerHTML = formatDate(response.data.dt * 1000)
}