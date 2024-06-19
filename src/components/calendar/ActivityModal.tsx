import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledModal from '../StyledModal';
import styled from 'styled-components';

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
      <ContentContainer>
        <Title>오늘의 일정</Title>
        <ButtonContainer>
          <RestButton id='rest' onClick={() => handleChooseActivity('💤')}>휴식</RestButton>
          <ExerciseButton id='exercise' onClick={() => handleChooseActivity('🔥')}>운동</ExerciseButton>
        </ButtonContainer>
      </ContentContainer>
    </StyledModal>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -100px; /* 컨테이너의 마진 조정 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; /* 수평 배열 */
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  margin-top: 70px; /* 버튼 컨테이너의 마진 조정 */
`;
const Title = styled.h2`
  margin-bottom: 20px; /* 타이틀 아래 마진 조정 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const StyledButton = styled.button`
  margin: 0 10px; /* 버튼 주위에 좌우 마진 추가 */
  padding: 30px 22px;
  font-size: 24px;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const RestButton = styled(StyledButton)`
  background-color: #FF5252;

  &:hover {
    background-color: #FF5252;
  }
`;

const ExerciseButton = styled(StyledButton)`
  background-color: #FF8975;

  &:hover {
    background-color: #FF8975;
  }
`;

export default ActivityModal;