import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="welcomeScreen">
      <img src="/images/시작일러.png" alt="Welcome" className="welcomeImage" />
      <div className="welcomeText">
        <h1>OUR FITNESS CARE</h1>
        <h2>득근득근</h2>
      </div>
      <button className="getStartedButton" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default WelcomeScreen;
