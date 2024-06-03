
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';
import ExerciseRecord from './ExerciseRecord'; // 운동 기록 페이지 컴포넌트

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CalendarComponent />} />
                <Route path="/exercise-record" element={<ExerciseRecord />} />
                {/* 다른 경로 추가 */}
            </Routes>
        </Router>
    );
};

export default App;
