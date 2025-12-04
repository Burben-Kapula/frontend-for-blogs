import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import './css/Home.css'

function AllBlogs() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Перевіряємо авторизацію при завантаженні
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      
      if (!token || !userData) {
        navigate("/")
        return
      }
      
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        
        // Завантаження всіх блогів
        loadAllBlogs()
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
      }
    }

    const loadAllBlogs = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Завантажуємо всі блоги з рандомізацією
        const allRes = await api.get('/blogs')
        const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
        setAllBlogs(shuffled)
        
      } catch (err) {
        console.error('Failed to load blogs:', err)
        setError('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [navigate])

  const handleRefreshBlogs = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Перемішуємо всі блоги для рандомізації
      const allRes = await api.get('/blogs')
      const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
      setAllBlogs(shuffled)
      
    } catch (err) {
      console.error('Failed to refresh blogs:', err)
      setError('Failed to refresh blogs')
    } finally {
      setLoading(false)
    }
  }

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
          All Blogs
        </div>
        <div className="Home-nav-buttons">
          <Link to="/home" className="Home-nav-button">
            My Profile
          </Link>
          <button onClick={handleLogout} className="Home-logout-button">
            Logout
          </button>
        </div>
      </div>
      
      <div className="Home-content">
        <div className="Home-welcome">
          <div className="Home-welcome-text">
            Discover amazing blogs from our community!
          </div>
          <button onClick={handleRefreshBlogs} className="Home-refresh-button">
            Shuffle Blogs
          </button>
        </div>
        
        {/* Всі блоги - Grid 3x3 */}
        <div className="Home-blogs-section">
          <div className="Home-section-title">
            All Blogs ({allBlogs.length})
          </div>
          
          {error && (
            <div className="Home-error">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="Home-loading">
              Loading blogs...
            </div>
          ) : allBlogs.length === 0 ? (
            <div className="Home-empty-state">
              <div className="Home-empty-icon">📝</div>
              <div>No blogs yet!</div>
              <Link to="/blogform" className="Home-create-blog-button">
                Create First Blog
              </Link>
            </div>
          ) : (
            <div className="Home-blogs-grid">
              {allBlogs.map(blog => (
                <div key={blog.id} className="Home-blog-card">
                  <div className="Home-blog-card-title">{blog.title}</div>
                  <div className="Home-blog-card-content">{blog.content}</div>
                  <div className="Home-blog-card-meta">
                    <span className="Home-blog-card-author">{blog.author?.username || 'Unknown'}</span>
                    <span className="Home-blog-card-date">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllBlogs