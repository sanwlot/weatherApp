import { useEffect, useState } from "react"
import "./App.css"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import FindCity from "./components/FindCity/FindCity"
import cities from "./dummyWeatherData"

function App() {
  const [weatherData, setWeatherData] = useState(cities)
  const [currentCity, setCurrentCity] = useState({})
  const coordinates = {
    longitude: currentCity.lon,
    lattitude: currentCity.lat,
  }
  const lat = coordinates.lattitude
  const lon = coordinates.longitude

  const API_KEY = "8d9b428eb63ea3470f3456a531ec6235"

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => console.log("weather details:", data))
  }, [currentCity])

  function handleFindCity(cityName: string) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentCity(data[0]))
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <FindCity handleClick={handleFindCity} />
      <WeatherInfo weatherData={weatherData} />
    </div>
  )
}

export default App
