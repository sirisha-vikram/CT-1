const apiKey = "89482425983d9e17b5c2e7f1ef68a70b"; // Replace with your actual OpenWeatherMap API key
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const loader = document.getElementById("loader");
  const historyList = document.getElementById("historyList");

  const defaultCities = ["New York,us", "London,uk", "Tokyo,jp"];

  // Show default predictions
  defaultCities.forEach(city => {
    fetchWeather(city, false);
  });

  // Search button click
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city, true);
    }
  });

  function fetchWeather(city, addToHistory) {
    loader.style.display = "inline-block";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then(data => {
        const card = document.createElement("div");
        card.className = "card p-3 mb-3";

        card.innerHTML = `
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h3>${data.name}, ${data.sys.country}</h3>
              <p><strong>Condition:</strong> ${data.weather[0].description}</p>
              <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </div>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" />
          </div>
        `;

        if (addToHistory) {
          weatherResult.innerHTML = "<h4 class='mb-3'>Search Result</h4>";
        }

        weatherResult.appendChild(card);

        if (addToHistory) {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = `${data.name}, ${data.sys.country}`;
          historyList.appendChild(listItem);
        }
      })
      .catch(error => {
        alert("Error: " + error.message);
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }
});
