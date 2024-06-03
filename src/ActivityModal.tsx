import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.


Modal.setAppElement('#root');

interface ActivityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onChooseActivity: (activity: string) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onRequestClose, onChooseActivity }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChooseActivity = (activity: string) => {
        onChooseActivity(activity); // 기존 onChooseActivity 함수 호출
        
        if (activity === '🔥') { // 운동 버튼이 클릭된 경우
            navigate('/exercise-record'); // 운동 기록 페이지로 이동
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Activity Selector">
            <h2>오늘의 일정</h2>
            <button id='rest' onClick={() => handleChooseActivity('💤')}>휴식</button>
            <button id='exercise' onClick={() => handleChooseActivity('🔥')}>운동</button>
        </Modal>
    );
}

export default ActivityModal;
