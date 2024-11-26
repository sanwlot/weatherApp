import { useEffect, useState } from "react"
import "./App.css"
import WeatherInfo from "./components/WeatherInfo/WeatherInfo"
import FindCity from "./components/FindCity/FindCity"
import cities from "./dummyWeatherData"

function App() {
  const [weatherData, setWeatherData] = useState(cities)
  // const [coordinates, setCoordinates] = useState({
  //   longitude: 0,
  //   lattitude: 0,
  // })
  const [city, setCity] = useState(null)
  const API_KEY = "8d9b428eb63ea3470f3456a531ec6235"

  useEffect(() => {
    // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}`)
  }, [])

  function handleFindCity() {
    // fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    // )
    //   .then((res) => res.json)
    //   .then((data) => console.log(data))
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <FindCity />
      <WeatherInfo weatherData={weatherData} />
    </div>
  )
}

export default App

// City name
// Current temperature
// Weather condition (e.g., "Sunny", "Cloudy")
// Humidity
// Wind speed
// Weather icon (based on the condition)
