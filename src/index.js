import "./styles.css";

// DOM
const mainCity = document.getElementById("city");
const conditions = document.getElementById("conditions");
const dayForecast = document.getElementById("dayForecast");

function displayMain (weatherObject) {

mainCity.textContent = weatherObject.city;

conditions.textContent = weatherObject.current;

dayForecast.textContent = weatherObject.dayForecast;

};

// EVENTS
const searchCountry = document.getElementById("searchInput");

searchCountry.addEventListener('change', async (e) => {
    
    try{

const weather = await getWeather(e.target.value);

displayMain(weather)
    } catch(error){
        console.error(error)
    }
});

const metricToggle = document.getElementById("metricToggle");

metricToggle.addEventListener("click", () => {
console.log('metrics toggle clicked')
})

// API
async function getWeather(city) {

    

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=GVVJFEWP8EEKSCKC9BNV5KYCF`);

    if (!response.ok) {
    throw new Error(`Could not find weather for "${city}".` );
}

    const weatherData = await response.json();

    const weatherInfo = {

    city : weatherData.address,
    current : weatherData.currentConditions.conditions,
    dayForecast : weatherData.description
    };

    return weatherInfo;

}


