import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import './css/Home.css'

function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [myBlogs, setMyBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Завантажуємо блоги коли user змінюється
  useEffect(() => {
    if (user) {
      loadMyBlogs(user.id)
    }
  }, [user])

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
        
        // Завантаження блогів
        loadMyBlogs(parsedUser.id)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
      }
    }

    const loadMyBlogs = async (userId) => {
      try {
        setLoading(true)
        setError('')
        
        // Завантажуємо всі блоги
        const allRes = await api.get('/blogs')
        
        // Фільтруємо блоги поточного користувача
        const myBlogsFiltered = allRes.data.filter(blog => 
          blog.author?._id === userId || blog.author === userId
        )
        setMyBlogs(myBlogsFiltered)
        
      } catch (err) {
        console.error('Failed to load blogs:', err)
        setError('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [navigate])

  const loadMyBlogs = async (userId) => {
    try {
      setLoading(true)
      setError('')
      
      // Завантажуємо всі блоги
      const allRes = await api.get('/blogs')
      
      // Фільтруємо блоги поточного користувача
      const myBlogsFiltered = allRes.data.filter(blog => 
        blog.author?._id === userId || blog.author === userId
      )
      setMyBlogs(myBlogsFiltered)
      
    } catch (err) {
      console.error('Failed to load blogs:', err)
      setError('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/")
  }

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      await api.delete(`/blogs/${blogId}`)
      setMyBlogs(myBlogs.filter(blog => blog.id !== blogId))
    } catch (err) {
      console.error('Failed to delete blog:', err)
      setError('Failed to delete blog')
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="Home-container">
      <div className="Home-header">
        <div className="Home-title">
          <span className="Home-welcome-username">{user.username}</span>&apos;s Profile
        </div>
        <div className="Home-nav-buttons">
          <Link to="/all-blogs" className="Home-nav-button">
            All Blogs
          </Link>
          <button onClick={handleLogout} className="Home-logout-button">
            Logout
          </button>
        </div>
      </div>
      
      <div className="Home-content">
        <div className="Home-welcome">
          <div className="Home-welcome-text">
            Welcome back, <span className="Home-welcome-username">{user.username}</span>!
          </div>
          <Link to="/blogform" className="Home-create-blog-button">
            Create New Blog
          </Link>
        </div>
        
        {/* Мої блоги */}
        <div className="Home-blogs-section">
          <div className="Home-section-title">
            My Blogs ({myBlogs.length})
          </div>
          
          {error && (
            <div className="Home-error">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="Home-loading">
              Loading your blogs...
            </div>
          ) : myBlogs.length === 0 ? (
            <div className="Home-empty-state">
              <div className="Home-empty-icon">📝</div>
              <div>You haven&apos;t created any blogs yet!</div>
              <Link to="/blogform" className="Home-create-blog-button">
                Create Your First Blog
              </Link>
            </div>
          ) : (
            myBlogs.map(blog => (
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
                  <Link to={`/edit-blog/${blog.id}`} className="Home-blog-action-button">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteBlog(blog.id)} 
                    className="Home-blog-action-button"
                  >
                    Delete
                  </button>
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