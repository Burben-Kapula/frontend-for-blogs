import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import './css/SingUpForm.css';

function SingUpForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const res = await axios.post(
      "/api/auth/register",
        {
        username,
        email,
        password,
      }
    )

    if (res.data.username) {
      alert("Registration successful! Please login.")
      navigate("/")
    } else {
      alert("Registration failed")
    }
  } catch (e) {
    console.error('SIGNUP ERROR', e.response?.status, e.response?.data || e.message)
    alert(e.response?.data?.error || e.response?.data || e.message || "Registration failed")
  }
}


  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="Enter name: "
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Enter email: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Enter password: "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit-container">
              <button className="submit" type="submit"><span>Sign Up</span></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingUpForm
