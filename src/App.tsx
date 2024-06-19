import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarComponent from './components/calendar/CalendarComponent';
import ExerciseRecord from './components/calendar/ExerciseRecord'; // 운동 기록 페이지 컴포넌트
import GroupPage from './components/groups/GroupPage';
import ShoppingPage  from './components/shopping/ShoppingPage';
import MateProfile from './components/groups/MateProfile';
import MyProfile from './components/groups/MyProfile';
const App: React.FC = () => {
    return (
        <Router>
      <div>
        <Routes>
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/exercise-record" element={<ExerciseRecord />} />
          <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/groups" element={<GroupPage />}></Route>
        <Route path="/groups/myprofile" element={<MyProfile />} />
        <Route path="/groups/mateprofile" element={<MateProfile />} />
          <Route path="/" element={<CalendarComponent />} /> {/* 기본 경로 설정 */}
        </Routes>
      </div>
    </Router>    
    );
};

export default App;
