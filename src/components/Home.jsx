import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate("/")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    
    // Завантаження блогів
    api.get('/blogs').then(res => {
      setBlogs(res.data)
    }).catch(err => {
      console.error('Failed to load blogs:', err)
    })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/")
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>Hello {user.username}, welcome to my web site</h1>
      <button onClick={handleLogout}>Logout</button>
      
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
