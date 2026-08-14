import "./styles.css";
import { 
    errorDisplay,
    displayMain, 
    displayWeek,
    showLoading,
    hideLoading } from "./display";
import { getWeather } from "./api";




let currentCity = "";
let units = "metric";

const metricToggle = document.getElementById("metricToggle");
const searchForm = document.getElementById("searchForm");

const searchCountry = document.getElementById("searchInput");

// units toggle listener
metricToggle.addEventListener("click", async () => {
    

    if (!currentCity){
        errorDisplay ('Please type in a city')
        return;
    };

try {
// toggle switch logic
units = units === "metric" ? "us" : "metric"

const updatedUnit = await getWeather(currentCity, units);

await displayMain(updatedUnit)
await displayWeek(updatedUnit.days)

    } catch(error) {
        
        console.error(error);
        errorDisplay (error.message)
    }

})

//search
searchForm.addEventListener('submit', async (e) => {
e.preventDefault();

const city = searchCountry.value;

if (!city){
    errorDisplay ('Please type in a city.')
    return;
};

errorDisplay("");

queryDisplay(city, units);

});

export async function queryDisplay(city, units) {

showLoading(city);
    
try{

const weather = await getWeather(city, units);

currentCity = city;

await displayMain(weather)

await displayWeek(weather.days)

} catch(error){
    console.error(error)
    errorDisplay(error.message);
    searchCountry.value = ""
}
finally {
    hideLoading();
}

}

queryDisplay("Dublin", units);