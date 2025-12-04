import React, { useEffect, useState } from "react";
import './css/LoginForm.css'
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom";


function LoginForm(){
  const navigate=useNavigate()
 const [username, setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [showPassword, setShowPassword] = useState(false)
console.log('test')


 async function submit(e) {
    e.preventDefault();

  try {
    const res = await api.post(
      "/auth/login",
      { usernameOrEmail: email, password }
    )

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate("/home")
    } else {
      alert("Invalid credentials")
    }
  } catch (e) {
    console.log(e)
    alert("Wrong detail")
  }
}



  return (
    <div className="LoginForm-container">
      <div className="LoginForm-titlebar">
        <span className="LoginForm-titlebar-text">Login</span>
        <div className="LoginForm-titlebar-controls">
          <button className="LoginForm-titlebar-button">_</button>
          <button className="LoginForm-titlebar-button">□</button>
          <button className="LoginForm-titlebar-button">×</button>
        </div>
      </div>
      <div className="LoginForm-content">
        <div className="LoginForm-header">
          <div className="LoginForm-title">Login</div>
          <div className="LoginForm-underline"></div>
        </div>
        <form onSubmit={submit}>
          <div className="LoginForm-inputs">
            <div className="LoginForm-input-group">
              <input 
                type="text" 
                placeholder="Enter your name:" 
                value={username}
                onChange={(e)=> {setUsername(e.target.value)}}
                className="LoginForm-input"
              />
            </div>
            <div className="LoginForm-input-group">
              <input 
                type="email" 
                placeholder="Enter email:" 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="LoginForm-input"
              />
            </div>
            <div className="LoginForm-input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password:"
                value={password}
                onChange={(e)=> {setPassword(e.target.value)}}
                className="LoginForm-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="LoginForm-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="LoginForm-forgot-password">
              <button type="button" className="LoginForm-forgot-link">
                Forgot password?
              </button>
            </div>
            <div className="LoginForm-submit-container">
              <button type="submit" className="LoginForm-submit-button">
                Login
              </button>
              <Link to="/signup" className="LoginForm-signup-link">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm
















