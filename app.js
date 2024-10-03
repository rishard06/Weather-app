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

    processCurrentWeatherData(data);
    
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=XBJDt9sF1OODvPDgLD0vl1GnDfvlb3oo&q=${weatherObj.weatherIcon}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`, {method: 'GET', mode: 'cors'})
    const giphy = await res.json();
    
    // console.log(giphy.data[0])
    printWeatherData(giphy.data[0].images.original.url)
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
    const cityCap = weatherObj.cityName[0].toUpperCase() + weatherObj.cityName.slice(1);
    const cityName = createEl(cityCap, null, "h2", "cityp", "");
    const country = createEl(weatherObj.country, null, "p", "", "country: ");
    const temp = createEl(weatherObj.temperature, null, "p", "", "temperature: ");
    const icon = createEl("", url, "img", "gif");
    const feels = createEl(weatherObj.feelsLike, null, "p", "", "feels like: ");
    const description = createEl(weatherObj.weatherDescription, null, "p", "", "description: ");
    const humid = createEl(weatherObj.humidity, null, "p", "", "humidity: ");
    const windspeed = createEl(weatherObj.windSpeed, null, "p", "", "wind speed: ");
    const visible = createEl(weatherObj.visibility, null, "p", "", "visibility: ");
    const press = createEl(weatherObj.pressure, null, "p", "", "pressure: ");
    
    const parent = document.querySelector('#info');
    parent.innerHTML = "";
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

function createEl (content, url, element, classname, name) {
    const el = document.createElement(`${element}`);
    el.textContent = `${name} ${content}`;
    el.src = `${url}`
    el.className = `${classname}`;

    return el
}