import React, { useState, useRef, useEffect } from "react";
import api from '../services/api';
import { useNavigate, Link } from "react-router-dom";
import './css/SingUpForm.css';

function SingUpForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const res = await api.post(
      "/auth/register",
        {
        username,
        email,
        password,
      }
    )

    if (res.data.username || res.data.id) {
      alert("Registration successful! Please login.")
      navigate("/")
    } else {
      alert("Registration failed")
      console.log("Response data:", res.data)
    }
  } catch (e) {
    console.error('SIGNUP ERROR', e.response?.status, e.response?.data || e.message)
    console.error('Full error:', e)
    const errorMsg = e.response?.data?.error || e.response?.data || e.message || "Registration failed"
    console.log('Showing error:', errorMsg)
    alert(errorMsg)
  }
}


  return (
    <div className="SingUpForm-container">
      <div className="SingUpForm-titlebar">
        <span className="SingUpForm-titlebar-text">Sign Up</span>
        <div className="SingUpForm-titlebar-controls">
          <button className="SingUpForm-titlebar-button">_</button>
          <button className="SingUpForm-titlebar-button">□</button>
          <button className="SingUpForm-titlebar-button">×</button>
        </div>
      </div>
      <div className="SingUpForm-content">
        <div className="SingUpForm-header">
          <div className="SingUpForm-title">Sign Up</div>
          <div className="SingUpForm-underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="SingUpForm-inputs">
            <div className="SingUpForm-input-group">
              <input
                type="text"
                placeholder="Enter username:"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="SingUpForm-input"
              />
            </div>
            <div className="SingUpForm-input-group">
              <input
                type="email"
                placeholder="Enter email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="SingUpForm-input"
              />
            </div>
            <div className="SingUpForm-input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="SingUpForm-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="SingUpForm-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="SingUpForm-submit-container">
              <button className="SingUpForm-submit-button" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingUpForm
