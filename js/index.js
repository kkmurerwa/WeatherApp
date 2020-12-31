let previousResponse = ""

window.onload = (event) => {
    const searchButton = document.getElementById("search-city")
    searchButton.addEventListener("click", function () {
        getCurrentCity()
    })

    const searchBox = document.getElementById("user-city")
    searchBox.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            searchCity()
        }
    })

    getCurrentCity()
  };

function searchCity() {
    let userCity = document.getElementById("user-city").value
    console.log(userCity)
    fetchData(userCity)
}

function getCurrentCity() {
    const url = "http://ipinfo.io/?token=20d2d052703e8c"
    fetch(url, {
        mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            fetchData(data.city)
    })
}

function fetchData(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=17ac7bb7aa6eae5c20f2be86852d9567`

    fetch(url, {
        mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found")
                populateFields(previousResponse)
            } else {
                previousResponse = data
                populateFields(data)
            }
        })
}

function getIconURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}.png`
}

function populateFields(data){
    console.log(data)
    
    const weatherCondition = document.getElementById("weather-condition")
    weatherCondition.innerHTML = `${(data.weather[0].description).toUpperCase()} <img src=${getIconURL(data.weather[0].icon)}></img>`

    const city = document.getElementById("city")
    city.innerHTML = `${data.name}, ${data.sys.country}`.toUpperCase()

    const temperature = document.getElementById("temperature")
    temperature.innerHTML = `${(data.main.temp-273.15).toFixed(0)}\u00B0C`

    const humidity = document.getElementById("humidity")
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`

    const windSpeed = document.getElementById("wind-speed")
    windSpeed.innerHTML = `Windspeed: ${data.wind.speed} MPH`

    const pressure = document.getElementById("pressure")
    pressure.innerHTML = `Pressure: ${data.main.pressure}`
}