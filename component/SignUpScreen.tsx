import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUpScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="signUpScreen">
      <div className="logo">득근득근</div>
      <h2>회원가입</h2>
      <form className="signUpForm">
        <div className="inputGroup">
          <input type="text" placeholder="닉네임" />
          <button type="button" className="checkButton">중복확인</button>
        </div>
        <div className="inputGroup">
          <input type="email" placeholder="이메일" />
          <button type="button" className="verifyButton">인증번호 전송</button>
        </div>
        <div className="inputGroup">
          <input type="text" placeholder="인증번호 입력" />
          <button type="button" className="verifyButton">확인</button>
          <button type="button" className="resendButton">재전송</button>
        </div>
        <div className="inputGroup">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호 (최소 10자, 특수문자 사용)"
          />
          <span className="togglePassword" onClick={togglePasswordVisibility}>
            <i className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </span>
        </div>
        <div className="inputGroup">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호 확인"
          />
          <span className="togglePassword" onClick={toggleConfirmPasswordVisibility}>
            <i className={confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </span>
        </div>
        <button type="submit" className="signUpButton">회원가입</button>
      </form>
      <div className="alreadyHaveAccount">
        이미 계정이 있습니까? <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default SignUpScreen;
