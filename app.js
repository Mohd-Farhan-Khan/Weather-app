const apiKey = "776afe9d8df735ff926c0a94e48fbfff";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading");
const weatherElement = document.querySelector(".weather");
const errorElement = document.querySelector(".error");

// Initialize the page to only show search bar
document.addEventListener("DOMContentLoaded", () => {
    // Hide weather, error, and loading sections initially
    weatherElement.style.display = "none";
    errorElement.style.display = "none";
    loadingElement.style.display = "none";
});

async function checkWeather(city) {
    // Don't do anything if city is empty
    if (!city.trim()) return;
    
    // Show loading, hide other content
    loadingElement.style.display = "block";
    weatherElement.style.display = "none";
    errorElement.style.display = "none";
    
    try {
        console.log(`Fetching weather data for: ${city}`);
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            console.error(`City not found: ${city}`);
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
            loadingElement.style.display = "none";
            return;
        }
        
        const data = await response.json();
        
        // Debug: Log the API response data
        console.log("API Response Data:", data);
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        // Debug: Log the specific weather data we're using
        console.log("Weather condition:", data.weather[0].main);
        console.log("Temperature:", data.main.temp);
        console.log("Humidity:", data.main.humidity);
        console.log("Wind speed:", data.wind.speed);
        
        // Update weather icon based on condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }
        
        // Show weather, hide loading
        weatherElement.style.display = "block";
        loadingElement.style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
        loadingElement.style.display = "none";
    }
}

// Add event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Add event listener for Enter key in search box
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
