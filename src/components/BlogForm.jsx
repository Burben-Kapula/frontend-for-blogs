import React, { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import api from "../services/api"
import './css/BlogForm.css'

function BlogForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Завантаження блогу для редагування
  useEffect(() => {
    if (id) {
      setIsEditing(true)
      const loadBlog = async () => {
        try {
          setLoading(true)
          const res = await api.get(`/blogs/${id}`)
          setTitle(res.data.title)
          setContent(res.data.content)
        } catch (err) {
          console.error('Failed to load blog:', err)
          setError('Failed to load blog')
        } finally {
          setLoading(false)
        }
      }
      loadBlog()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      let res
      if (isEditing) {
        // Оновлення блогу
        res = await api.put(`/blogs/${id}`, {
          title: title.trim(),
          content: content.trim()
        })
      } else {
        // Створення нового блогу
        res = await api.post('/blogs', {
          title: title.trim(),
          content: content.trim()
        })
      }

      if (res.data.id) {
        navigate('/home')
      } else {
        setError(isEditing ? 'Failed to update blog' : 'Failed to create blog')
      }
    } catch (err) {
      console.error('Blog error:', err)
      setError(err.response?.data?.error || (isEditing ? 'Failed to update blog' : 'Failed to create blog'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="BlogForm-container">
      <div className="BlogForm-titlebar">
        <span className="BlogForm-titlebar-text">Create New Blog</span>
        <div className="BlogForm-titlebar-controls">
          <button className="BlogForm-titlebar-button">_</button>
          <button className="BlogForm-titlebar-button">□</button>
          <button className="BlogForm-titlebar-button">×</button>
        </div>
      </div>
      
      <div className="BlogForm-content">
        <div className="BlogForm-header">
          <div className="BlogForm-title">{isEditing ? 'Edit Blog' : 'Create New Blog'}</div>
          <div className="BlogForm-underline"></div>
        </div>

        {error && (
          <div className="BlogForm-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="BlogForm-inputs">
            <div className="BlogForm-input-group">
              <label className="BlogForm-label">Title:</label>
              <input
                type="text"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="BlogForm-input"
                disabled={loading}
              />
            </div>

            <div className="BlogForm-input-group">
              <label className="BlogForm-label">Content:</label>
              <textarea
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="BlogForm-textarea"
                rows="8"
                disabled={loading}
              />
            </div>
          </div>

          <div className="BlogForm-actions">
            <button 
              type="submit" 
              className="BlogForm-submit-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </button>
            
            <Link to="/home" className="BlogForm-cancel-button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm