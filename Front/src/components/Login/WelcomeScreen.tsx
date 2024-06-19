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
        <div className="welcomelogo">
          <h2 className='ourfitnesscare'>OUR FITNESS CARE</h2>
          <h1 className='getmuscle'>득근득근</h1>
        </div>
      <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default WelcomeScreen;
