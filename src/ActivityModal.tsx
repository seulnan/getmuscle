import React from 'react';
import Modal from 'react-modal';
import './ActivityModal';
import './ActivityModal.css';
Modal.setAppElement('#root');

interface ActivityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onChooseActivity: (activity: string) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onRequestClose, onChooseActivity }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Activity Selector">
            <h2>오늘의 일정</h2>
            <button id='rest' onClick={() => onChooseActivity('💤')}>휴식</button>
            <button id='exercise' onClick={() => onChooseActivity('🔥')}>운동</button>
        </Modal>
    );
}

export default ActivityModal;
