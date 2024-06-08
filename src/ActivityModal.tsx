
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledModal from './StyledModal';

interface ActivityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onChooseActivity: (activity: string) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onRequestClose, onChooseActivity }) => {
  const navigate = useNavigate();

  const handleChooseActivity = (activity: string) => {
    onChooseActivity(activity);
    if (activity === '🔥') {
      navigate('/exercise-record');
    }
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Activity Selector">
      <h2>오늘의 일정</h2>
      <button id='rest' onClick={() => handleChooseActivity('💤')}>휴식</button>
      <button id='exercise' onClick={() => handleChooseActivity('🔥')}>운동</button>
    </StyledModal>
  );
};

export default ActivityModal;
