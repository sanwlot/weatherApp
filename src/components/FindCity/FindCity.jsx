import { useState } from "react"
import styles from "./FindCity.module.css"
import ToggleTempUnit from "../ToggleTempUnit/ToggleTempUnit"
import { ButtonGroup, Form } from "react-bootstrap"

export default function FindCity({ handleClick, toggleUnit }) {
  const [city, setCity] = useState("")
  return (
    <section className={styles.section}>
      <Form.Control
        type="text"
        placeholder="Find City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.input}
      />
      <ButtonGroup>
        <button className="btn btn-secondary" onClick={() => handleClick(city)}>
          Find
        </button>
        <ToggleTempUnit toggleUnit={toggleUnit} />
      </ButtonGroup>
    </section>
  )
}
