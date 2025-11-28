import React, { useState, useRef, useEffect } from "react";
import './css/SingUpForm.css';

function SingUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            //Тут імя
            <input
              type="text"
              placeholder="Enter name: "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            //Тут пошта
            <input
              type="email"
              placeholder="Enter email: "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            //Тут пароль
            <input
              type="password"
              placeholder="Enter password: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit-container">
            <button className="submit"><span>Sign Up</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingUpForm;
