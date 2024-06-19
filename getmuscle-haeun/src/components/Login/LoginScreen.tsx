import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginScreen.css';

const LoginScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loggin=(event : React.FormEvent)=>{
    event.preventDefault();
    axios.post('http://localhost:4500/login', {
      userid: (document.getElementById('userid')as HTMLInputElement).value,
      userpw:(document.getElementById('userpw')as HTMLInputElement).value
  },{ withCredentials: true })
  .then(function (response) {
    console.log(response.data);
    if(response.data.state===1){
      console.log("로그인됨");
      //navigate('/onboarding');
    }
      
  })
  .catch(function (error) {
      alert(error);
  });
  }
  return (
    <div className="loginScreen">
      <div className="logo">득근득근</div>
      <form className="loginForm" onSubmit={loggin}>
        <h2>로그인</h2>
        <div className="inputGroup">
          <input type="email" id="userid" placeholder="이메일" />
        </div>
        <div className="inputGroup">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호"
            id="userpw"
          />
          <span className="togglePassword" onClick={togglePasswordVisibility}>
            <i className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </span>
        </div>
        <button type="submit" className="loginButton">로그인</button>
      </form>
      <Link to="/signup" className="signupButton">회원가입</Link>
    </div>
  );
};

export default LoginScreen;