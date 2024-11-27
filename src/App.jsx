import { useEffect, useState } from "react"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import FindCity from "./components/FindCity/FindCity"
import styles from "./App.module.css"
import { TbTemperatureSun } from "react-icons/tb"

const initialCity = {
  name: "Jodhpur",
  lat: 26.2967719,
  lon: 73.0351433,
  country: "IN",
  state: "Rajasthan",
}

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [currentCity, setCurrentCity] = useState(initialCity)
  const [recentCities, setRecentCities] = useState([])
  const [isMetric, setIsMetric] = useState(true)
  const [error, setError] = useState(false)

  const tempUnit = isMetric ? "metric" : "imperial"
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const linearGradient = getBgImg()
  const coordinates = {
    lattitude: currentCity.lat,
    longitude: currentCity.lon,
  }
  const lat = coordinates.lattitude
  const lon = coordinates.longitude

  function getBgImg() {
    try {
      if (weatherData.weather[0].main === "Clear") {
        return "linear-gradient(0deg, #2298c3, #2d56fd)"
      }
      if (weatherData.weather[0].main === "Clouds") {
        return "linear-gradient(120deg, #d3d3d3, #a9a9a9, #808080)"
      }
      if (weatherData.weather[0].main === "Rain") {
        return "linear-gradient(135deg, #5d7ea3, #748a9c, #a3b1c6)"
      }
      if (weatherData.weather[0].main === "Snow") {
        return "linear-gradient(135deg, #f0f8ff, #d9e9f2, #b9d6e5)"
      }
      if (weatherData.weather[0].main === "Haze") {
        return "linear-gradient(135deg, #d3d3d3, #c0c0c0, #a9a9a9)"
      }
    } catch (error) {
      console.log("could not load weather background color!", error)
    }
  }

  const bgImgStyles = {
    background: linearGradient,
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${tempUnit}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => setWeatherData(data))
      .catch((e) => console.error(e))
  }, [lat, lon, tempUnit, API_KEY])

  function handleFindCity(cityName) {
    if (!cityName) return
    setError(false)
    try {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          if (data.length === 0) {
            throw new Error("City not found!")
          }
          setCurrentCity(data[0])
        })
        .catch((e) => {
          console.error("handleFindCity: city was not found!", e)
          setError(true)
        })
    } catch (error) {
      console.log("could not find the city that you entered!", error)
      setCurrentCity(initialCity)
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

  return (
    <main className={`${styles.main}`} style={bgImgStyles}>
      <h1 className={styles.heading}>
        Weather Info <TbTemperatureSun />
      </h1>
      <FindCity handleClick={handleFindCity} toggleUnit={toggleUnit} />
      <WeatherInfo
        error={error}
        isMetric={isMetric}
        weatherData={weatherData}
        recentCities={recentCities}
        handleFindCity={handleFindCity}
      />
    </main>
  )
}

export default App
