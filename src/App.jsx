import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SingUpForm"
import Home from "./components/Home"
import AllBlogs from "./components/AllBlogs"
import BlogForm from "./components/BlogForm"

function App() {
  return (
    <Routes>
      {/* стартова сторінка = логін */}
      <Route path="/" element={<AllBlogs/>} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/blogform" element={<BlogForm/>}></Route>
      <Route path="/edit-blog/:id" element={<BlogForm/>}></Route>
    </Routes>
  )
}

export default App
