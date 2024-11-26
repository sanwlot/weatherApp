import { useEffect, useState } from "react"
import "./App.css"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import FindCity from "./components/FindCity/FindCity"

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [currentCity, setCurrentCity] = useState({
    name: "Jodhpur",
    lat: 26.2967719,
    lon: 73.0351433,
    country: "IN",
    state: "Rajasthan",
  })
  const [recentCities, setRecentCities] = useState([])

  const coordinates = {
    lattitude: currentCity.lat,
    longitude: currentCity.lon,
  }

  const lat = coordinates.lattitude
  const lon = coordinates.longitude
  const API_KEY = "8d9b428eb63ea3470f3456a531ec6235"

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((e) => console.error(e))
  }, [lat, lon])

  console.log("APP, weatherData: ", weatherData)

  function handleFindCity(cityName: string) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentCity(data[0]))
    if (recentCities.length < 5) {
      setRecentCities([...recentCities, cityName])
    } else {
      setRecentCities((prev) => {
        prev.pop()
        return [cityName, ...prev]
      })
    }
  }

  if (!weatherData) return "App loading..."
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <FindCity handleClick={handleFindCity} />
      <WeatherInfo weatherData={weatherData} />
      <aside>
        <h2>Recent Cities</h2>
        <ul>
          {recentCities &&
            recentCities.map((city, i) => (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => handleFindCity(city)}
                key={i}
              >
                {city}
              </li>
            ))}
        </ul>
      </aside>
    </div>
  )
}

export default App

// geoApi openWeather for getting ciry coordinates and more info
//   {
//     "name": "Jodhpur",
//     "local_names": {
//         "ml": "ജോധ്പൂർ",
//         "hi": "जोधपुर",
//         "he": "ג'ודפור",
//         "sr": "Џодпур",
//         "de": "Jodhpur",
//         "fa": "جوداپور",
//         "es": "Jodhpur",
//         "ar": "جودبور",
//         "ur": "جودھ پور",
//         "ja": "ジョードプル",
//         "en": "Jodhpur",
//         "be": "Джадхпур",
//         "kn": "ಜೋಧ್ಪುರ್",
//         "te": "జోధ్‌పూర్",
//         "zh": "焦特布尔",
//         "gu": "જોધપુર",
//         "pt": "Jodhpur",
//         "pa": "ਜੋਧਪੁਰ",
//         "ta": "சோத்பூர்",
//         "uk": "Джодхпур",
//         "ru": "Джодхпур"
//     },
//     "lat": 26.2967719,
//     "lon": 73.0351433,
//     "country": "IN",
//     "state": "Rajasthan"
// }
