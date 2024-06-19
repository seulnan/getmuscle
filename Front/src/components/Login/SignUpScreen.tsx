import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpScreen.css';
import EyeIcon from '../../assets/images/eye.png'; // 눈 아이콘 임포트

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password && password === confirmPassword) {
      navigate('/onboarding');
    } else {
      alert('이메일과 비밀번호를 입력하세요.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signUpScreen">
      <div className="signuplogo">득근득근</div>
      <h2 className="urbanist-font">회원가입</h2>
      <form className="signUpForm" onSubmit={handleSignUp}>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="닉네임"
            className="urbanist-font"
          />
          <button type="button" className="checkButton urbanist-font">중복확인</button>
        </div>
        <div className="inputGroup">
          <input
            type="email"
            placeholder="이메일"
            className="urbanist-font"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="verifyButton urbanist-font">인증번호 전송</button>
        </div>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="urbanist-font"
          />
          <div className="verifyButtons">
            <button type="button" className="verifyButton urbanist-font">확인</button>
            <button type="button" className="resendButton urbanist-font">재전송</button>
          </div>
        </div>
        <div className="inputGroup">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 (최소 10자)"
            className="urbanist-font"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="togglePassword" onClick={handleTogglePasswordVisibility}>
            <img src={EyeIcon} alt="Toggle Password Visibility" />
          </span>
        </div>
        <div className="inputGroup">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            className="urbanist-font"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="togglePassword" onClick={handleTogglePasswordVisibility}>
            <img src={EyeIcon} alt="Toggle Password Visibility" />
          </span>
        </div>
        <button type="submit" className="signUpButton urbanist-font">회원가입</button>
      </form>
      <div className="alreadyHaveAccount urbanist-font">
        이미 계정이 있습니까? <a href="/login">로그인</a>
      </div>
    </div>
  );
};

export default SignUpScreen;
