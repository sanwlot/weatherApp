import { useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
// import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
// import CloudIcon from "@mui/icons-material/Cloud"

export default function WeatherInfo({ weatherData }) {
  const [isCelsius, setIsCelsius] = useState(true)

  let icon = <WbSunnyIcon />

  function handleClick() {
    setIsCelsius(!isCelsius)
  }
  if (!weatherData) return "info Loading..."

  return (
    <section>
      <button onClick={handleClick}>Celsius / Fahranheit</button>
      <h2>
        {weatherData.name} {icon}
      </h2>
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
