import { useEffect, useState } from "react"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import FindCity from "./components/FindCity/FindCity"
import styles from "./App.module.css"

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
  const [isMetric, setIsMetric] = useState(true)

  const tempUnit = isMetric ? "metric" : "imperial"

  const coordinates = {
    lattitude: currentCity.lat,
    longitude: currentCity.lon,
  }

  const lat = coordinates.lattitude
  const lon = coordinates.longitude
  const API_KEY = "8d9b428eb63ea3470f3456a531ec6235"

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${tempUnit}`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((e) => console.error(e))
  }, [lat, lon, tempUnit])

  function handleFindCity(cityName) {
    if (!cityName) return

    try {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setCurrentCity(data[0]))
        .catch((e) => console.error("city was not found!", e))
    } catch (error) {
      console.log("could not find the city that you entered!", error)
    }

    if (!recentCities.includes(cityName)) {
      if (recentCities.length < 5) {
        setRecentCities([...recentCities, cityName])
      } else {
        setRecentCities((prev) => {
          prev.pop()
          return [cityName, ...prev]
        })
      }
    }
  }
  function toggleUnit() {
    setIsMetric(!isMetric)
  }

  if (!weatherData) return "App loading..."
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Weather Info</h1>
      <FindCity handleClick={handleFindCity} toggleUnit={toggleUnit} />
      <WeatherInfo
        isMetric={isMetric}
        weatherData={weatherData}
        recentCities={recentCities}
        handleFindCity={handleFindCity}
      />
    </main>
  )
}

export default App
