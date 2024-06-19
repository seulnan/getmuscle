import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpScreen.css';
import EyeIcon from '../../assets/images/eye.png'; // 눈 아이콘 임포트
import axios from 'axios';

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();

  const [nButtonName, setNBname] = useState('중복확인');
  const [nButtonDisable, setNds] = useState(false);
  const [nick_label, setNickLabel] = useState('');

  const [eButtonName, setEBname] = useState('인증번호 전송');
  const [email_same_label, setESLabel] = useState('');

  const [eaButtonName, setEaBname] = useState('확인');
  const [email_label, setEaSLabel] = useState('');

  const [eButtonDisable, setEds] = useState(false);

  const [pwc_label, setPL] = useState('');
  
  const [pwsame_label, setPSL] = useState('');
  const [pwsame_color, setPSLcolor] = useState('red');
  const [showPassword, setShowPassword] = useState(false);

  // const handleSignUp = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (email && password && password === confirmPassword) {
  //     navigate('/onboarding');
  //   } else {
  //     alert('이메일과 비밀번호를 입력하세요.');
  //   }
  // };

  const nicknameCheck = (event: React.FormEvent)=>{
    event.preventDefault();
  
    axios.post('http://localhost:4500/signup/nickname-check', {
          usernick: (document.getElementById('usernick') as HTMLInputElement).value
      },{ withCredentials: true })
      .then(function (response) {
        console.log("good");
        if(response.data.state===1){
          setNBname("확인 완료");
          setNds(true);
        }else{
          setNickLabel(response.data.message);
        }
      })
      .catch(function (error) {
          alert("서버요청실패");
      });}

  const emailSend = (event: React.FormEvent)=>{
    event.preventDefault();

    axios.post('http://localhost:4500/signup/email-send', {
          userid: (document.getElementById('userid') as HTMLInputElement).value
      },{ withCredentials: true })
      .then(function (response) {
        console.log("good");
        setESLabel(response.data.message);
      })
      .catch(function () {
          alert("서버요청실패");
      });}
  
  const emailAuthSend= (event: React.FormEvent)=>{
    event.preventDefault();

    axios.post('http://localhost:4500/signup/email-check', {
          authNum: (document.getElementById('authNum') as HTMLInputElement).value
      },{ withCredentials: true })
      .then(function (response) {
        console.log("good");
        if(response.data.state===1){
          setEaBname("완료");
          setEBname("완료");
          setEds(true);
        }else{
          setEaSLabel(response.data.message);
        }
      })
      .catch(function () {
          alert("서버요청실패");
      });}

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function checkPasswordOptions(nowPass:string){
    const PWcL = (document.getElementById('userpw_c')as HTMLInputElement).value;
        var SC = ["!", "@", "#", "$", "%", "*"];
    var check_SC = 0;
    if (nowPass !== '') {
        if (nowPass === PWcL) {
            setPSL('비밀번호가 일치합니다.');
            setPSLcolor('blue');
            console.log("y");
           
        }
        else {
            setPSL('비밀번호가 일치하지 않습니다.');
            setPSLcolor('red');
        }
        }
    for (var i = 0; i < SC.length; i++) {
        if (nowPass.indexOf(SC[i]) !== -1) {
            check_SC = 1;
        }
    }
    if (nowPass.length < 10 || nowPass.length > 16) {
    setPL('비밀번호는 10글자 이상, 16글자 이하만 이용 가능합니다.');
    return false;
    }else if (check_SC === 0) {
    setPL('비밀번호에 !,@,#,$,%,* 의 특수문자를 포함시켜야 합니다.');
    return false;
    
    }
   
    return true;
  }

  function sendpw(nowPass:HTMLInputElement["value"]){
    if(checkPasswordOptions(nowPass)===true){
    setPL(' ');
    
    axios.post('http://localhost:4500/signup/password-save', {
        userPwd: nowPass
    },{ withCredentials: true })
    .then(function (response) {
        console.log("good");
    })
    .catch(function (error) {
        console.log("서버요청실패");
    });}
}

  function isPasswordSame(nowPass:HTMLInputElement["value"]){
    const PW =(document.getElementById('userpw') as HTMLInputElement).value;
    setPSL('비밀번호가 일치하지 않습니다.');
    setPSLcolor('red');
    if (PW !=='' && nowPass !== '') {
        if (PW === nowPass) {
            setPSL('비밀번호가 일치합니다.');
            setPSLcolor('blue');
            sendpw(PW);
            axios.post('http://localhost:4500/signup/password-done', {
              userPwd: PW
          },{ withCredentials: true })
          .then(function (response) {
              console.log("good");
          })
          .catch(function (error) {
              console.log("서버요청실패");
          });
        }
        else {
            setPSL('비밀번호가 일치하지 않습니다.');
            setPSLcolor('red');
            
        }
        }
  }

  const final =(event : React.FormEvent)=>{
    event.preventDefault();
    const d = new FormData();
    axios.post('http://localhost:4500/signup/page/1', d,{ withCredentials: true })
  .then(function (response) {
    if(response.data.state===1){
      navigate('/onboarding');
    }
      
  })
  .catch(function (error) {
      alert(error);
  });
}


  return (
    <div className="signUpScreen">
      <div className="signuplogo">득근득근</div>
      <h2 className="urbanist-font">회원가입</h2>
      <div className="signUpForm">
      <form onSubmit={nicknameCheck}>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="닉네임"
            id="usernick"
            className="urbanist-font"
            disabled={nButtonDisable}
          />
          <button type="submit" className="checkButton urbanist-font" disabled={nButtonDisable}>{nButtonName}</button>
        </div>
        <label>{nick_label}</label>
        </form>
        <form onSubmit={emailSend}>
        <div className="inputGroup">
          <input
            type="email"
            placeholder="이메일"
            id="userid"
            className="urbanist-font"
            disabled={eButtonDisable}
          />
          <button type="submit" className="verifyButton urbanist-font" disabled={eButtonDisable}>{eButtonName}</button>
        </div>
        <label>{email_same_label}</label>
        </form>
        <form onSubmit={emailAuthSend}>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="인증번호 입력"
            id="authNum"
            className="urbanist-font"
            disabled={eButtonDisable}
          />
            <button type="submit" className="verifyButton urbanist-font"disabled={eButtonDisable}>{eaButtonName}</button>
        </div>
        <label>{email_label}</label>
        </form>
        <form onSubmit={final}>
        <div className="inputGroup">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 (최소 10자)"
            id="userpw"
            className="urbanist-font"
            onChange={(e) => {e.persist();sendpw(e.target.value);}}
          />
          <span className="togglePassword" onClick={handleTogglePasswordVisibility}>
            <img src={EyeIcon} alt="Toggle Password Visibility" />
          </span>
        </div>
        <label style={{color:"red"}}>{pwc_label}</label>
        <div className="inputGroup">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            id="userpw_c"
            className="urbanist-font"
            onChange={(e) => isPasswordSame(e.target.value)}
          />
          <span className="togglePassword" onClick={handleTogglePasswordVisibility}>
            <img src={EyeIcon} alt="Toggle Password Visibility" />
          </span>
        </div>
        <label style={{color:pwsame_color}}>{pwsame_label}</label>
        <button type="submit" className="signUpButton urbanist-font">회원가입</button>
      </form>
      
      </div>
      <div className="alreadyHaveAccount urbanist-font">
        이미 계정이 있습니까? <a href="/login">로그인</a>
      </div>
    </div>
  );
};

export default SignUpScreen;
