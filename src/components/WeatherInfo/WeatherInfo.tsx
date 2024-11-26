import WbSunnyIcon from "@mui/icons-material/WbSunny"
import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
import CloudIcon from "@mui/icons-material/Cloud"
import { useState } from "react"

export default function WeatherInfo({ weatherData }) {
  const [isCelsius, setIsCelsius] = useState(true)
  const city = weatherData.find((cityWeather) => cityWeather.city == "Jodhpur")
  let icon = <WbSunnyIcon />
  if (city.weatherCondition === "Rainy") {
    icon = <ThunderstormIcon />
  }
  if (city.weatherCondition === "Cloudy") {
    icon = <CloudIcon />
  }

  function handleClick() {
    setIsCelsius(!isCelsius)
  }

  if (!city) return
  return (
    <section>
      {/* Weather icon (based on the condition) */}
      <button onClick={handleClick}>Celsius / Fahranheit</button>

      <div>
        <p>City Name: {city.city}</p>
      </div>
      <div>
        <p>
          Current temperature:{" "}
          {isCelsius
            ? city.currentTemperature
            : city.currentTemperature * (9 / 5) + 32}
          deg
        </p>
      </div>
      <div>
        <p>
          Weather condition: {city.weatherCondition} {icon}
        </p>
      </div>
      <div>
        <p>Humidity: {city.humidity}</p>
      </div>
      <div>
        <p>Wind speed:{city.windSpeed}km/h</p>
      </div>
    </section>
  )
}
