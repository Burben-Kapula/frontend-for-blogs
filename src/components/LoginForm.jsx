import React, { useEffect, useState } from "react";
import './css/LoginForm.css'
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"


function LoginForm(){
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')


 async function submit(e) {
    e.preventDefault();

    try{
        await axios.post('http://localhost:3001/',{
            email,password
        })
    }
    catch(e){
        console.log(e)

    }
 }



  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
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
            <button onClick={submit}><span>Login</span></button>
            <Link to="/src/components/SingUpForm.jsx">Sing Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm
















