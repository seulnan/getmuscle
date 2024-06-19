import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarComponent from './components/calendar/CalendarComponent';
import ExerciseRecord from './components/calendar/ExerciseRecord'; // 운동 기록 페이지 컴포넌트
import GroupPage from './components/groups/GroupPage';
import ShoppingPage  from './components/shopping/ShoppingPage';
import MateProfile from './components/groups/MateProfile';
import MyProfile from './components/groups/MyProfile';
import OrderList from './components/shopping/OrderList';
import Charge from './components/shopping/Charge';
import LoginScreen from './components/Login/LoginScreen';
import WelcomeScreen from './components/Login/WelcomeScreen';
import SignUpScreen from './components/Login/SignUpScreen';
import Onboarding from './components/Login/Onboarding';
import OnboardingAddressStep from './components/Login/OnboardingAddressStep';
import OnboardingCompleteStep from './components/Login/OnboardingCompleteStep'; // OnboardingCompleteStep
const App: React.FC = () => {
    return (
        <Router>
      <div>
        <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/complete" element={<OnboardingCompleteStep title="완료!" buttonText="다음 단계" onNext={() => console.log('다음 단계로 이동')} />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/exercise-record" element={<ExerciseRecord />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/groups" element={<GroupPage />}></Route>
        <Route path="/groups/myprofile" element={<MyProfile />} />
        <Route path="/groups/mateprofile" element={<MateProfile />} />
        <Route path="/shopping/orders" element={<OrderList />} />
        <Route path="/shopping/charge" element={<Charge />} />
        <Route path="/" element={<WelcomeScreen/>} /> {/* 기본 경로 설정 */}
        </Routes>
      </div>
    </Router>    
    );
};

export default App;
