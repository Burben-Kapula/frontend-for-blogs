import React, { useEffect, useState } from "react";
import './css/LoginForm.css'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";


function LoginForm(){
  const navigate=useNavigate()
 const [username, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [showPassword, setShowPassword] = useState(false)



 async function submit(e) {
    e.preventDefault();

  try {
    const res = await axios.post(
      "/api/auth/login",
      { usernameOrEmail: username || email, password }
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
    <>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={submit}>
          <div className="inputs">
              {/* Тут ім'я */}
            <div className="input">
              <input type="text" placeholder="Enter name: " onChange={(e)=> {setName(e.target.value)}}/>
            </div>
            <div className="input">
              {/*Тут пошта*/}
              <input type="email" placeholder="Enter email: " onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="input" style={{ position: 'relative' }}>
              {/*Тут пароль*/}
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password: "
                onChange={(e)=> {setPassword(e.target.value)}}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
              <button className="forgot-password"><span>Forgot password</span></button>
              {/*Тут кнопки для логіна та регестрації*/}
            <div className="submit-container">
              <button type="submit"><span>Login</span></button>
              {/* Change '/signup' to the correct route for your sign-up page */}
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginForm
















