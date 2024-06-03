import React, { useState } from 'react';
import Modal from 'react-modal';

interface AddRoutineModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddRoutineModal: React.FC<AddRoutineModalProps> = ({ isOpen, onClose }) => {
const [routine, setRoutine] = useState('');

const handleRoutineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoutine(e.target.value);
};

const handleAddRoutine = () => {
    // 루틴 추가 로직 구현
    console.log('Added routine:', routine);
    onClose();
};

return (
    <div>
        {isOpen && (
        <div>
            <h2>Add Routine</h2>
            <input type="text" value={routine} onChange={handleRoutineChange} />
            <button onClick={handleAddRoutine}>Add</button>
            <button onClick={onClose}>Close</button>
        </div>
        )}
    </div>
    );
};

export default AddRoutineModal;
