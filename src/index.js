import "./styles.css";
import { errorDisplay, displayMain, displayWeek } from "./display";
import { getWeather } from "./api";
import { showLoading, hideLoading } from "./display";

let currentCity = "";
let units = "metric";

export const searchCountry = document.getElementById("searchInput");
const metricToggle = document.getElementById("metricToggle");

// units toggle listener
metricToggle.addEventListener("click", async () => {
    const searchInput = document.getElementById('searchInput');

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
searchCountry.addEventListener('change', async (e) => {

    if (!e.target.value){
    
        errorDisplay ('Please type in a city.')
        return;
    };

showLoading();
errorDisplay("");
    
try{

const weather = await getWeather(e.target.value, units);

currentCity = e.target.value;

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

});

