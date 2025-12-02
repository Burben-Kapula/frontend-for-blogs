import { Routes, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SingUpForm"
import Home from "./components/Home"
import React from "react"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
