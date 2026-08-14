export async function getWeather(city, units) {

const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${units}&key=GVVJFEWP8EEKSCKC9BNV5KYCF`);

if (!response.ok) {

throw new Error(`Could not find weather for "${city}".` );

};

const weatherData = await response.json();

const weatherInfo = {

city : weatherData.address,
time : weatherData.currentConditions.datetime,
tempmax: weatherData.days[0].tempmax,
tempmin: weatherData.days[0].tempmin,
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