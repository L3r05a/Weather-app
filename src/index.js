// INDEX
import "./styles.css";


// DOM
const mainCity = document.getElementById("city");
const time = document.getElementById("time");
const mainTemp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLIke");
const conditions = document.getElementById("conditions");
const dayForecast = document.getElementById("dayForecast");
const wind = document.getElementById("wind");
const precipit = document.getElementById("precipit");
const icon = document.getElementById("icon");
const weekForecast = document.getElementById('weeklyForecast');

function displayMain (weatherInfo) {
mainCity.textContent = weatherInfo.city;
time.textContent = formatTime(weatherInfo.time);
mainTemp.textContent = `Temperature: ${weatherInfo.temp}`;
feelsLike.textContent = `Feels like ${weatherInfo.feelsLike}`;
conditions.textContent = `Now: ${weatherInfo.current}`;
dayForecast.textContent = `Today: ${weatherInfo.dayForecast}`;
precipit.textContent = `Rain ${weatherInfo.precipProb}%`;
wind.textContent = `Wind ${weatherInfo.wind}`;
icon.textContent = "Icon placeholder " + weatherInfo.icon

};

function formatTime(time){
    return time.slice(0,5);
}

function displayWeek(weatherInfoDays){

 console.log(weatherInfoDays);
 
// for each item in the array
const week = weatherInfoDays.slice(0,7).forEach((item, index) => {console.log(`item ${index + 1}: ${item.datetime}`)})
//create a card with:
//datetime (day of the week format)
//icon
//temp
// append the card to id="daysDiv" 
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
// console.log(weatherData.days[0].conditions)
// console.log(weatherInfo.days)
return weatherInfo;
    

}


