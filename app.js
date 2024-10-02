const input = document.querySelector('#location');
const searchBtn = document.querySelector('#location-btn')
let weatherObj = {}

async function getWeather() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${year}-${month}-${day}/${year}-${month}-${day + 1}?key=HJ4BC9LGMUUFFWA5Z34S9YPT5`, {method: 'GET', mode: 'cors'});
    const data = await response.json();

    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=XBJDt9sF1OODvPDgLD0vl1GnDfvlb3oo&q=${weatherObj.weatherIcon}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`, {method: 'GET', mode: 'cors'})
    const giphy = await res.json();
    // console.log(giphy.data[0])

    processCurrentWeatherData(data);
    printWeatherData(giphy.data[0].url)
}

searchBtn.addEventListener('click', () => {
    getWeather()
});

function processCurrentWeatherData(apiResponse) {
    weatherObj = {
      all: apiResponse,
      cityName: apiResponse.address,
      country: apiResponse.resolvedAddress,
      temperature: apiResponse.days[0].temp,// Current temperature
      feelsLike: apiResponse.days[0].feelslike, // Feels like temperature
      weatherDescription: apiResponse.days[0].description, // Weather condition description
      weatherIcon: apiResponse.days[0].icon, // Weather condition icon
      humidity: apiResponse.days[0].humidity, // Humidity percentage
      windSpeed: apiResponse.days[0].windspeed, // Wind speed
      pressure: apiResponse.days[0].pressure, // Atmospheric pressure
      visibility: apiResponse.days[0].visibility / 1000, // Visibility in kilometers
      tommorrow: {
        temperature: apiResponse.days[1].temp,// Current temperature
        feelsLike: apiResponse.days[1].feelslike, // Feels like temperature
        weatherDescription: apiResponse.days[1].description, // Weather condition description
        weatherIcon: apiResponse.days[1].icon, // Weather condition icon
        humidity: apiResponse.days[1].humidity, // Humidity percentage
        windSpeed: apiResponse.days[1].windspeed, // Wind speed
        pressure: apiResponse.days[1].pressure, // Atmospheric pressure
        visibility: apiResponse.days[1].visibility / 1000, // Visibility in kilometers
        }
    };
  }

function printWeatherData (url) {
    // to make first word capital
    const cityName = createEl(weatherObj.cityName[0].toUpperCase() + weatherObj.cityName.slice(1));
    const country = createEl(weatherObj.country);
    const temp = createEl(weatherObj.temperature);
    const icon = createEl(weatherObj.weatherIcon, url);
    const feels = createEl(weatherObj.feelsLike);
    const description = createEl(weatherObj.weatherDescription);
    const humid = createEl(weatherObj.humidity);
    const windspeed = createEl(weatherObj.windSpeed);
    const visible = createEl(weatherObj.visibility);
    const press = createEl(weatherObj.pressure);

    const parent = document.querySelector('#info');
    parent.appendChild(cityName);
    parent.appendChild(country);
    parent.appendChild(temp);
    parent.appendChild(icon);
    parent.appendChild(feels);
    parent.appendChild(description);
    parent.appendChild(humid);
    parent.appendChild(windspeed);
    parent.appendChild(visible);
    parent.appendChild(press);
}

function createEl (content, url) {
    const p = document.createElement('p');
    p.textContent = `${content}`;
    
    const img = document.createElement('img');
    img.src = `${url}`;
    console.log(url)

    return p
}