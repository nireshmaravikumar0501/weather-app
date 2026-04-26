document
.getElementById("searchBtn")
.addEventListener("click", getWeather);

function getWeather(){

let city = document
.getElementById("cityInput")
.value
.trim();

if(city===""){
alert("Enter a city");
return;
}

/* STEP 1:
Convert city name into coordinates
*/

let geoUrl=
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

fetch(geoUrl)

.then(response=>response.json())

.then(locationData=>{

if(!locationData.results){
alert("City not found");
return;
}

let lat=locationData.results[0].latitude;
let lon=locationData.results[0].longitude;
let cityName=locationData.results[0].name;

/* STEP 2:
Get weather using coordinates
*/

let weatherUrl=
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;

return fetch(weatherUrl)

.then(response=>response.json())

.then(weatherData=>{

document.getElementById("cityName")
.textContent=cityName;

document.getElementById("temp")
.textContent=
weatherData.current.temperature_2m + "°C";

document.getElementById("wind")
.textContent=
weatherData.current.wind_speed_10m + " km/h";

/* simple condition placeholder */
document.getElementById("condition")
.textContent="Live Weather";

/* simple animated icon */
document.getElementById("weatherIcon")
.textContent="☀";

});

})

.catch(error=>{
console.log(error);
alert("Something went wrong");
});

}