import React, { useState } from "react";
import './css/LoginForm.css'




function LoginForm(){
 const [action, setAction] = useState("Login")
 
console.log(action)




  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="Enter name: "/>
          </div>
          <div className="input">
            <input type="email" placeholder="Enter email: "/>
          </div>
          <div className="input">
            <input type="password" placeholder="Enter password: "/>
          </div>
            <button className="forgot-password"><span>Forgot password</span></button>

          <div className="submit-container">
            <button className={action === "Login"?"submit gray":"submit"} onClick={()=>{setAction('Sing up')}}><span>Sing Up</span></button>
            <button className={action === "Sing Up"?"submit gray":"submit"} onClick={()=>{setAction('Login')}}><span>Login</span></button>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm
















