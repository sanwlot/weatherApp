import { useState } from "react"

export default function FindCity({ handleClick }) {
  const [city, setCity] = useState("")
  return (
    <>
      <input
        type="text"
        placeholder="Find City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => handleClick(city)}>Find</button>
    </>
  )
}
