import React, { useEffect, useState } from "react";
import './css/LoginForm.css'
import { useNavigate, Link } from "react-router-dom"



function LoginForm(){
 const [action, setAction] = useState("Sing Up")
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')


 console.log(action)
fullNameInputRef = useRef(null);
useEffect(()=> {
    fullNameInputRef.current.focus();
}, []);



  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
            //тут ім'я
          <div className="input">
            <input type="text" placeholder="Enter name: " onChange={(e)=> {setName(e.target.value)}}/>
          </div>
          <div className="input">
            //Тут пошта
            <input type="email" placeholder="Enter email: " onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div className="input">
            //Тут пароль
            <input type="password" placeholder="Enter password: "onChange={(e)=> {setPassword(e.target.value)}}/>
          </div>
            <button className="forgot-password"><span>Forgot password</span></button>
            //Тут кнопки для логіна та регестрації
          <div className="submit-container">
            <button className={action === "Login"?"submit gray":"submit"} onClick={()=>{setAction('Sing Up')}}><span><Link to='/src/components/SingUpForm.jsx'>Sing Up</Link></span></button>
            <button className={action === "Sing Up"?"submit gray":"submit"} onClick={()=>{setAction('Login')}}><span>Login</span></button>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm
















