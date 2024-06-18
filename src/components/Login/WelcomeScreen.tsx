import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';
import Start from '../../assets/images/start.png';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-screen">
      <img src={Start} alt="Welcome" className="welcomeImage" />
        <div className="logo">
          <h2>OUR FITNESS CARE</h2>
          <h1>득근득근</h1>
        </div>
      <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default WelcomeScreen;
