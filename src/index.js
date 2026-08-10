// INDEX
import "./styles.css";


// DOM
import sunny from "./images/sunny.svg"
import rain from "./images/rain.svg"
import cloudy from "./images/cloudy.svg"
import partlycloudy from "./images/partlycloudy.svg"

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

const icons = {
    'clear-day' : sunny,
    rain : rain,
    cloudy : cloudy,
    'partly-cloudy-day' : partlycloudy,
    'partly-cloudy-night' : cloudy,
};

//Main Panel
function displayMain (weatherInfo) {
mainCity.textContent = weatherInfo.city;

icon.textContent = "";
const img = document.createElement("img");
img.id = "dayWeatherIcon"
img.src = icons[weatherInfo.icon]
icon.appendChild(img);

time.textContent = `Time: ${formatTime(weatherInfo.time)}`;
mainTemp.textContent = `Temperature: ${weatherInfo.temp} degrees`;
feelsLike.textContent = `Feels like: ${weatherInfo.feelsLike} degrees`;
conditions.textContent = `Now: ${weatherInfo.current}`;
dayForecast.textContent = `Today: ${weatherInfo.dayForecast}`;
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
function displayWeek(forecast){

daysDiv.textContent = "";
 
//Selects nexy 7 days
forecast.slice(1,8).forEach((item) => {
//creates card 
const card = document.createElement('div');
//card contents
card.textContent = 
`${formatDate(item.datetime)}
- Temp ${item.temp}`;

//icons
const img = document.createElement("img");
img.id = "weatherIcon"
img.src = icons[item.icon]

daysDiv.appendChild(card)
card.appendChild(img);


});
 console.log(forecast);
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

displayMain(updatedUnit)
displayWeek(updatedUnit.days)

    } catch(error) {
        console.error(error);
    }

})

//search
searchCountry.addEventListener('change', async (e) => {
    
    try{

const weather = await getWeather(e.target.value, units);

currentCity = e.target.value;

displayMain(weather)

displayWeek(weather.days)


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
console.log(weatherData)
// console.log(weatherInfo.days)
return weatherInfo;
    

}


