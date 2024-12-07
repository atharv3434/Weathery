const apiKey = "95cb1ce398fe466391587bec228125fc";
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");
const alertMessage = document.getElementById("alertMessage");
let tempAlertThreshold = null;

// Fetch Weather Data
document.getElementById("getWeather").addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  weatherResult.innerHTML = "<p>Loading...</p>";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    });
});

// Display Weather Data
function displayWeather(data) {
  const { name, main, weather, wind } = data;

  const weatherIcon = getWeatherIcon(weather[0].main);
  const weatherHTML = `
    <div class="weather-info">
      <h2>${name}</h2>
      <div class="weather-detail">
        <span class="icon">${weatherIcon}</span>
        <div>
          <p><strong>Condition:</strong> ${weather[0].description}</p>
          <p><strong>Temperature:</strong> ${main.temp}°C</p>
          <p><strong>Humidity:</strong> ${main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        </div>
      </div>
    </div>
  `;
  weatherResult.innerHTML = weatherHTML;
  document.body.style.background = getBackground(weather[0].main.toLowerCase());
}

// Get Weather Icon
function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "☀️";
    case "rain":
      return "🌧️";
    case "clouds":
      return "☁️";
    case "snow":
      return "❄️";
    default:
      return "🌤️";
  }
}

// Set Dynamic Background
function getBackground(condition) {
  switch (condition) {
    case "clear":
      return "linear-gradient(135deg, #FFD700, #FF4500)";
    case "rain":
      return "linear-gradient(135deg, #3a7bd5, #3a6073)";
    case "clouds":
      return "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    default:
      return "linear-gradient(135deg, #3a7bd5, #3a6073)";
  }
}

// Set Temperature Alert
document.getElementById("setAlert").addEventListener("click", () => {
  const threshold = document.getElementById("tempThreshold").value.trim();
  if (!threshold || isNaN(threshold)) {
    alertMessage.textContent = "Please enter a valid numeric threshold.";
    return;
  }

  tempAlertThreshold = parseFloat(threshold);
  alertMessage.textContent = `Alert set for temperatures above ${tempAlertThreshold}°C.`;
});
