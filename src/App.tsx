import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/Login/LoginScreen';
import WelcomeScreen from './components/Login/WelcomeScreen';
import Onboarding from './components/Login/Onboarding';
import SignUpScreen from './components/Login/SignUpScreen';
import OnboardingCompleteStep from './components/Login/OnboardingCompleteStep'; // OnboardingCompleteStep 컴포넌트 임포트

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/complete" element={<OnboardingCompleteStep title="완료!" buttonText="다음 단계" onNext={() => console.log('다음 단계로 이동')} />} />
        <Route path="/" element={<WelcomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
