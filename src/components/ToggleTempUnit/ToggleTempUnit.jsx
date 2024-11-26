import styles from "./ToggleTempUnit.module.css"

export default function ToggleTempUnit({ toggleUnit }) {
  return (
    <button className="btn btn-secondary" onClick={toggleUnit}>
      °C / °F
    </button>
  )
}
