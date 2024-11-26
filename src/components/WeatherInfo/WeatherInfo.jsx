import { useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
import CloudIcon from "@mui/icons-material/Cloud"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import { FaCloudRain } from "react-icons/fa"
import { BsCloudHaze } from "react-icons/bs"
export default function WeatherInfo({ weatherData }) {
  const [isCelsius, setIsCelsius] = useState(true)

  if (!weatherData.weather || weatherData.weather.length === 0) {
    return "info Loading..."
  }

  let icon = <WbSunnyIcon />

  if (weatherData.weather[0].main === "Thunderstorm")
    icon = <ThunderstormIcon />
  if (weatherData.weather[0].main === "Rain") icon = <FaCloudRain />
  if (weatherData.weather[0].main === "Snow") icon = <AcUnitIcon />
  if (weatherData.weather[0].main === "Clouds") icon = <CloudIcon />
  if (weatherData.weather[0].main === "Haze") icon = <BsCloudHaze />

  function handleClick() {
    setIsCelsius(!isCelsius)
  }

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
        <p>Weather condition: {weatherData.weather[0].main}</p>
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
