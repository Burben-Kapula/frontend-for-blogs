import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './css/SingUpForm.css';

function SingUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        await axios.post('http://localhost:3001/singup',{
            email,password
        })
        .then(res=>{
          if(res.data === "exist"){
            alert('User already signed up')
            // navigate('/home',{state:{id:email}})
          }
          else if(res.data === "noexist"){
            alert('User is not signed up yet. Creating a new account.')
            navigate('/home',{state:{id:email}})
          }
        })
        .catch(e=>{
          alert('Wrong detail')
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
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
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
              <button className="submit" type="submit"><span>Sign Up</span></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingUpForm;
