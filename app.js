async function getWeather() {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Navotas/2024-10-01/2024-10-2?key=HJ4BC9LGMUUFFWA5Z34S9YPT5', {method: 'GET', mode: 'cors'});
    const data = await response.json();
    console.log(data.description);
}

getWeather();