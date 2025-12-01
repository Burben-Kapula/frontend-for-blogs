import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.id

  if (!email) {
    // якщо зайшли напряму без логіну – повернути на /
    navigate("/")
    return null
  }

  return (
    <div>
      <h1>Hello {email}, welcome to my web site</h1>
    </div>
  )
}

export default Home
