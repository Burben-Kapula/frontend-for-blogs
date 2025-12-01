import React, { useEffect, useState } from "react";
import './css/LoginForm.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";


function LoginForm(){
  const navigate=useNavigate()
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')



 async function submit(e) {
    e.preventDefault();


  try {
    const res = await axios.post(
      "https://beckend-for-blogs.onrender.com/login",
      { name, email, password }
    )

    if (res.data === "exist") {
      navigate("/home", { state: { id: email } })
    } else if (res.data === "noexist") {
      alert("User is not signed up!!!")
    } else {
      alert("Unexpected response: " + res.data)
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
            <div className="input">
              {/*Тут пароль*/}
              <input type="password" placeholder="Enter password: "onChange={(e)=> {setPassword(e.target.value)}}/>
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
















