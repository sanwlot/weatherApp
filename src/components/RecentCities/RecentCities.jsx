import styles from "./RecentCities.module.css"

export default function RecentCities({ recentCities, handleFindCity }) {
  return (
    <section className={styles.section}>
      <p className={styles.recentCitiesHeading}>Recent Cities</p>
      <ul className={styles.cityList}>
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
    </section>
  )
}
