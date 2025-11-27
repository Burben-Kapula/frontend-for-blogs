import React from "react";
import './css/LoginForm.css'




function LoginForm(){

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Sing up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input type="text" />
          </div>
          <div className="input">
            <input type="email" />
          </div>
          <div className="input">
            <input type="password" />
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm

















