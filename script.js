const apiKey = "f0751c014f19aed884bf0b8408a3e652";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".max-temp").innerHTML = "Max Temp: " + Math.round(data.main.temp_max) + "°C";
        document.querySelector(".min-temp").innerHTML = "Min Temp: " + Math.round(data.main.temp_min) + "°C";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            card.style.background = "linear-gradient(135deg, #d3d3d3, #a9a9a9)";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            card.style.background = "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            card.style.background = "linear-gradient(135deg, #3a7bd5, #3a6073)";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            card.style.background = "linear-gradient(135deg, #636363, #a2ab58)";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
