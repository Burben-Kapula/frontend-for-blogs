import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import './css/Home.css'
function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [myBlogs, setMyBlogs] = useState([])
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
        
        // Завантаження блогів
        loadBlogs()
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
      }
    }

    const loadBlogs = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Завантажуємо всі блоги
        const allRes = await api.get('/blogs')
        const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
        setAllBlogs(shuffled)
        
        // Фільтруємо блоги поточного користувача
        const myBlogsFiltered = shuffled.filter(blog => 
          blog.author?._id === user.id || blog.author === user.id
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/")
  }

  const handleRefreshBlogs = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Перемішуємо всі блоги для рандомізації
      const allRes = await api.get('/blogs')
      const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
      setAllBlogs(shuffled)
      
      // Фільтруємо блоги поточного користувача
      const myBlogsFiltered = shuffled.filter(blog => 
        blog.author?._id === user.id || blog.author === user.id
      )
      setMyBlogs(myBlogsFiltered)
      
    } catch (err) {
      console.error('Failed to refresh blogs:', err)
      setError('Failed to refresh blogs')
    } finally {
      setLoading(false)
    }
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
          Welcome to <span className="Home-welcome-username">{user.username}</span>'s Blog
        </div>
        <button onClick={handleLogout} className="Home-logout-button">
          Logout
        </button>
      </div>
      
      <div className="Home-content">
        <div className="Home-welcome">
          <div className="Home-welcome-text">
            Hello <span className="Home-welcome-username">{user.username}</span>, welcome to my web site!
          </div>
          <Link to="/blogform" className="Home-create-blog-button">
            Create New Blog
          </Link>
        </div>
        
        {/* Мої блоги */}
        <div className="Home-blogs-section">
          <div className="Home-section-title">
            My Blogs ({myBlogs.length})
            <button onClick={handleRefreshBlogs} className="Home-refresh-button">
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="Home-loading">
              Loading blogs...
            </div>
          ) : myBlogs.length === 0 ? (
            <div className="Home-empty-state">
              <div className="Home-empty-icon">📝</div>
              <div>You haven't created any blogs yet!</div>
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
        
        {/* Всі блоги - Grid 3x3 */}
        <div className="Home-blogs-section">
          <div className="Home-section-title">
            All Blogs ({allBlogs.length})
            <button onClick={handleRefreshBlogs} className="Home-refresh-button">
              Shuffle
            </button>
          </div>
          
          {loading ? (
            <div className="Home-loading">
              Loading blogs...
            </div>
          ) : allBlogs.length === 0 ? (
            <div className="Home-empty-state">
              <div className="Home-empty-icon">📝</div>
              <div>No blogs yet!</div>
            </div>
          ) : (
            <div className="Home-blogs-grid">
              {allBlogs.slice(0, 9).map(blog => (
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
