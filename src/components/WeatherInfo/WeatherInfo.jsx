import WbSunnyIcon from "@mui/icons-material/WbSunny"
import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
import CloudIcon from "@mui/icons-material/Cloud"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import { FaCloudRain } from "react-icons/fa"
import { BsCloudHaze } from "react-icons/bs"
import RecentCities from "../RecentCities/RecentCities"
import styles from "./WeatherInfo.module.css"
export default function WeatherInfo({
  weatherData,
  recentCities,
  handleFindCity,
  isMetric,
}) {
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

  return (
    <section className={styles.section}>
      <h2 className={styles.weatherInfoHeading}>
        <span>{weatherData.name}</span> <span>{icon}</span>
      </h2>
      <div className={styles.weatherInfoContainer}>
        <div className={styles.weatherDataContainer}>
          <div className={styles.weatherInfo}>
            <p>Current temperature </p>
            <p className={styles.infoValue}>
              {weatherData.main?.temp}°{isMetric ? "C" : "F"}
            </p>
          </div>
          <div className={styles.weatherInfo}>
            <p>Weather condition </p>
            <p className={styles.infoValue}>{weatherData.weather[0].main}</p>
          </div>
          <div className={styles.weatherInfo}>
            <p>Humidity </p>
            <p className={styles.infoValue}>{weatherData.main?.humidity}%</p>
          </div>
          <div className={styles.weatherInfo}>
            <p>Wind speed</p>
            <p className={styles.infoValue}>
              {weatherData.wind?.speed} {isMetric ? "m/s" : "mph"}
            </p>
          </div>
        </div>
        <RecentCities
          recentCities={recentCities}
          handleFindCity={handleFindCity}
        />
      </div>
    </section>
  )
}
