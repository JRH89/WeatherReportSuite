const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const unitToggle = document.getElementById('unit-toggle');
const unitLabel = document.getElementById('unit-label');
const apiKey = '35913733e7f076a1cac136c1de270b7d';
let isMetric = true;

unitToggle.addEventListener('click', () => {
  isMetric = !isMetric;
  unitLabel.textContent = isMetric ? 'Metric' : 'Imperial';
  unitToggle.classList.toggle('unit-toggle-metric');
  unitToggle.classList.toggle('unit-toggle-imperial');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  getWeatherData(city, isMetric);
});

async function getWeatherData(city, isMetric) {
  const units = isMetric ? 'metric' : 'imperial';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Unable to retrieve weather data');
    }

    const data = await response.json();

    const current = data.main;
    const weather = data.weather[0];

    currentWeather.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <div class="weather-icon">
        <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
      </div>
      <p>Temperature: ${current.temp}&deg;${isMetric ? 'C' : 'F'}</p>
      <p>Feels like: ${current.feels_like}&deg;${isMetric ? 'C' : 'F'}</p>
      <p>Humidity: ${current.humidity}%</p>
      <p>Wind speed: ${data.wind.speed} ${isMetric ? 'm/s' : 'mph'}</p>
      <p>Visibility: ${  data.visibility / 1000} ${isMetric ? 'km' : 'mi'}</p>
      `;
      
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      
      getForecastData(lat, lon, isMetric);
    } catch (error) {
        console.error(error);
        alert('Unable to retrieve weather data');
        }
        }
        
        async function getForecastData(lat, lon, isMetric) {
            const units = isMetric ? 'metric' : 'imperial';
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
          
            try {
              const response = await fetch(apiUrl);
              if (!response.ok) {
                throw new Error('Unable to retrieve forecast data');
              }
          
              const data = await response.json();
              const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
          
              forecast.innerHTML = `
                <h2>5-Day Forecast</h2>
                <div class="forecast-items">
                  ${forecastData.map(item => `
                    <div class="forecast-item">
                      <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                      <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                      </div>
                      <p>Temp: ${item.main.temp}&deg;${isMetric ? 'C' : 'F'}</p>
                      <p>Humidity: ${item.main.humidity}%</p>
                    </div>
                  `).join('')}
                </div>
              `;
            } catch (error) {
              console.error(error);
              alert('Unable to retrieve forecast data');
            }
          }
          const themeToggle = document.getElementById('theme-toggle');
          const themeIcon = document.getElementById('theme-icon');
          
          themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeIcon.classList.toggle('fa-sun');
            themeIcon.classList.toggle('fa-moon');
          });
                    
          
            
