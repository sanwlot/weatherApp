import { useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
// import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
// import CloudIcon from "@mui/icons-material/Cloud"

export default function WeatherInfo({ weatherData }) {
  // console.log("weatherData, from weatherInfo component: ", weatherData)

  const [isCelsius, setIsCelsius] = useState(true)

  let icon = <WbSunnyIcon />
  // if (city.weatherCondition === "Rainy") {
  //   icon = <ThunderstormIcon />
  // }
  // if (city.weatherCondition === "Cloudy") {
  //   icon = <CloudIcon />
  // }

  function handleClick() {
    setIsCelsius(!isCelsius)
  }
  if (!weatherData) return "weather info Loading..."

  return (
    <section>
      <button onClick={handleClick}>Celsius / Fahranheit</button>
      <div>
        <p>City Name: {weatherData.name}</p>
      </div>
      <div>
        <p>
          Current temperature:{" "}
          {isCelsius
            ? weatherData.main?.temp
            : weatherData.main?.temp * (9 / 5) + 32}
          deg
        </p>
      </div>
      <div>
        <p>
          {/* Weather condition: {weatherData.weather[0].description} {icon} */}
        </p>
      </div>
      <div>
        <p>Humidity: {weatherData.main?.humidity}</p>
      </div>
      <div>
        <p>Wind speed:{weatherData.wind?.speed}km/h</p>
      </div>
    </section>
  )
}
