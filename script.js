const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// 🔑 Put your API key inside quotes
const API_KEY = "5166674a9862b3ae3dade345e99d7c2d";

async function getWeather(city) {
  try {
    weatherResult.innerHTML = "Loading...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    weatherResult.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}</h2>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity} %</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
      </div>
    `;

  } catch (error) {
    weatherResult.innerHTML = `
      <p class="error">${error.message}</p>
    `;
  }
}

// Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

// Enter key search
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
