import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import './css/Home.css'
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
    <div className="Home-container">
      <div className="Home-header">
        <div className="Home-title">
          Welcome to <span className="Home-welcome-username">{user.username}</span>'s Blog
        </div>
        <button onClick={handleLogout} className="Home-logout-button">
          Logout
        </button>
        <Link to="/blogform" className="Home-blog-action-button">
          Create new blog
        </Link>
      </div>
      
      <div className="Home-content">
        <div className="Home-welcome">
          <div className="Home-welcome-text">
            Hello <span className="Home-welcome-username">{user.username}</span>, welcome to my web site!
          </div>
        </div>
        
        <div className="Home-blogs-section">
          <div className="Home-section-title">Blogs</div>
          {blogs.length === 0 ? (
            <div className="Home-empty-state">
              <div className="Home-empty-icon">📝</div>
              <div>No blogs yet. Create your first blog!</div>
            </div>
          ) : (
            blogs.map(blog => (
              <div key={blog.id} className="Home-blog-item">
                <div className="Home-blog-title">{blog.title}</div>
                <div className="Home-blog-content">{blog.content}</div>
                <div className="Home-blog-meta">
                  <span className="Home-blog-author">Author: {blog.author?.username || 'Unknown'}</span>
                  <span className="Home-blog-date">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}
                  </span>
                </div>
                <div className="Home-blog-actions">
                  <button className="Home-blog-action-button">Edit</button>
                  <button className="Home-blog-action-button">Delete</button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
