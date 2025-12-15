import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./css/Home.css"

import api, { likeBlog, addCommentToBlog } from "../services/api"

function AllBlogs() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [commentTextByBlog, setCommentTextByBlog] = useState({})
  const [like, setLike] = useState("")

  // ОДНА функція для завантаження блогів (без дублів)
  const loadAllBlogs = async () => {
    try {
      setLoading(true)
      setError("")

      const allRes = await api.get("/blogs")
      const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
      setAllBlogs(shuffled)
    } catch (err) {
      console.error("Failed to load blogs:", err)
      setError("Failed to load blogs")
    } finally {
      setLoading(false)
    }
  }

  // Загружаємо блоги коли user змінюється
  useEffect(() => {
    if (user) {
      loadAllBlogs()
    }
  }, [user])

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const userData = localStorage.getItem("user")

      if (!token || !userData) {
        navigate("/")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        // loadAllBlogs тут більше НЕ оголошується, просто викликаємо існуючу
        loadAllBlogs()
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
      }
    }

    checkAuth()
  }, [navigate])

  const handleRefreshBlogs = async () => {
    try {
      setLoading(true)
      setError("")

      const allRes = await api.get("/blogs")
      const shuffled = [...allRes.data].sort(() => Math.random() - 0.5)
      setAllBlogs(shuffled)
    } catch (err) {
      console.error("Failed to refresh blogs:", err)
      setError("Failed to refresh blogs")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  // Коментарі
  const handleCommentChange = (blogId, value) => {
    setCommentTextByBlog(prev => ({
      ...prev,
      [blogId]: value,
    }))
  }

  const handleAddComment = async blogId => {
    const text = (commentTextByBlog[blogId] || "").trim()
    if (!text) return

    try {
      const updatedBlog = await addCommentToBlog(blogId, text)

      // ВИПРАВЛЕНО: використовуємо setAllBlogs замість неіснуючого setBlogs
      setAllBlogs(prev =>
        prev.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
      )

      setCommentTextByBlog(prev => ({
        ...prev,
        [blogId]: "",
      }))
    } catch (err) {
      console.error("Failed to add comment", err)
    }
  }

  if (!user) {
    return <div className="Home-loading">Loading...</div>
  }

  return (
    <div className="Home-container">
      <div className="Home-header">
        <div className="Home-title">All Blogs</div>

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
          <button
            onClick={handleRefreshBlogs}
            className="Home-refresh-button"
          >
            Shuffle Blogs
          </button>
        </div>

        <div className="Home-blogs-section">
          <div className="Home-section-title">
            All Blogs ({allBlogs.length})
          </div>

          {error && <div className="Home-error">{error}</div>}

          {loading ? (
            <div className="Home-loading">Loading blogs...</div>
          ) : allBlogs && allBlogs.length === 0 ? (
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
                  <div className="Home-blog-card-content">
                    {blog.content}
                  </div>

                  <div className="Home-blog-card-meta">
                    <span className="Home-blog-card-author">
                      {blog.author?.username || "Unknown"}
                    </span>
                    <span className="Home-blog-card-date">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                  </div>

                  {/* Тут можеш додати форму коментарів */}
                  {/* приклад:
                  <input
                    value={commentTextByBlog[blog.id] || ""}
                    onChange={e =>
                      handleCommentChange(blog.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleAddComment(blog.id)}>
                    Add comment
                  </button>
                  */}
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
