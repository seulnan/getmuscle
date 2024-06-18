import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarComponent from './components/calendar/CalendarComponent';
import ExerciseRecord from './components/calendar/ExerciseRecord'; // 운동 기록 페이지 컴포넌트
import ShoppingPage from './components/shopping/ShoppingPage';
import OrderList from './components/shopping/OrderList';
import Charge from './components/shopping/Charge';
import GroupPage from './components/groups/GroupPage';
import MyProfile from './components/groups/MyProfile';
import MateProfile from './components/groups/MateProfile';
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CalendarComponent />} />
                <Route path="/exercise-record" element={<ExerciseRecord />} /> 
               
                
        {/* <Route path="/" element={<ShoppingPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/" element={<GroupPage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/mateprofile" element={<MateProfile />} /> */}
      </Routes>
          
        </Router>
        
    );
};

export default App;
