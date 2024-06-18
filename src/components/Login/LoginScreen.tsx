import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginScreen.css';

const LoginScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="loginScreen">
      <div className="logo">득근득근</div>
      <form className="loginForm">
        <h2>로그인</h2>
        <div className="inputGroup">
          <input type="email" placeholder="이메일" />
        </div>
        <div className="inputGroup">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호"
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