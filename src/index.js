// INDEX
import "./styles.css";


const mainCity = document.getElementById("city");
const time = document.getElementById("time");
const mainTemp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLIke");
const conditions = document.getElementById("conditions");
const dayForecast = document.getElementById("dayForecast");
const wind = document.getElementById("wind");
const precipit = document.getElementById("precipit");
const icon = document.getElementById("icon");

const daysDiv = document.getElementById('daysDiv');

//Main Panel Render
async function displayMain (weatherInfo) {

mainCity.textContent = weatherInfo.city;

//dynamic icons import
const iconModule = await import(`./images/${weatherInfo.icon}.svg`);

icon.textContent = "";

const img = document.createElement("img");
img.id = "dayWeatherIcon"

//the value generqated by Webpack for the asset
img.src = iconModule.default;
icon.appendChild(img);

time.textContent = `Local time: ${formatTime(weatherInfo.time)}`;
mainTemp.textContent = `Temperature: ${weatherInfo.temp} degrees`;
feelsLike.textContent = `Feels like: ${weatherInfo.feelsLike} degrees`;
conditions.textContent = `Now: ${weatherInfo.current}`;
dayForecast.textContent = `Later: ${weatherInfo.dayForecast}`;
precipit.textContent = `Rain: ${weatherInfo.precipProb}%`;
wind.textContent = `Wind: ${weatherInfo.wind}`;

};

function formatTime(time){
    return time.slice(0,5);
}

function formatDate (date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        timeZone: 'UTC'
    })
}

//7 days forecast
async function displayWeek(forecast){

daysDiv.textContent = "";

const week = forecast.slice(1,8);

for (const item of week) {

const card = document.createElement('div');

card.textContent = 
`${formatDate(item.datetime)} - Temp ${item.temp}`;

const iconModule = await import(`./images/${item.icon}.svg`);

const img = document.createElement("img");
img.id = "dayWeatherIcon";
img.src = iconModule.default;

daysDiv.appendChild(card)
card.appendChild(img);

}
 
}

// EVENTS

let currentCity = "";
let units = "metric";

const searchCountry = document.getElementById("searchInput");
const metricToggle = document.getElementById("metricToggle");

// units toggle
metricToggle.addEventListener("click", async () => {

    try {
units = units === "metric" ? "us" : "metric"
const updatedUnit = await getWeather(currentCity, units);

await displayMain(updatedUnit)
await displayWeek(updatedUnit.days)

    } catch(error) {
        console.error(error);
    }

})

//search
searchCountry.addEventListener('change', async (e) => {
    
    try{

const weather = await getWeather(e.target.value, units);

currentCity = e.target.value;

await displayMain(weather)

await displayWeek(weather.days)


    } catch(error){
        console.error(error)
    }
});



// API
async function getWeather(city, units) {

const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${units}&key=GVVJFEWP8EEKSCKC9BNV5KYCF`);

if (!response.ok) {
throw new Error(`Could not find weather for "${city}".` );
}

const weatherData = await response.json();

const weatherInfo = {

city : weatherData.address,
time : weatherData.currentConditions.datetime,
temp : weatherData.currentConditions.temp,
feelsLike : weatherData.currentConditions.feelslike,
icon : weatherData.currentConditions.icon,
current : weatherData.currentConditions.conditions,
dayForecast: weatherData.description,
wind : weatherData.currentConditions.windspeed,
precipProb : weatherData.currentConditions.precipprob,
days : weatherData.days,

};

return weatherInfo;
    

}


