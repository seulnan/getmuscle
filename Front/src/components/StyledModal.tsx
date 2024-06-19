import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const StyledModalWrapper = styled(Modal)`
  /* 모달의 스타일을 여기에 정의합니다 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 28px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 330px;
  height: 211px;
  margin: auto;
  margin-top: 250px; /* 모달을 더 아래로 내리기 위해 추가 */
`;

interface StyledModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  contentLabel: string;
}

const StyledModal: React.FC<StyledModalProps> = ({ isOpen, onRequestClose, children, contentLabel }) => {
  return (
    <StyledModalWrapper isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel}>
      {children}
    </StyledModalWrapper>
  );
};

export default StyledModal;