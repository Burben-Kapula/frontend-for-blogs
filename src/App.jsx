import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SingUpForm"
import Home from "./components/Home"

function App() {
  return (
    <Routes>
      {/* стартова сторінка = логін */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
