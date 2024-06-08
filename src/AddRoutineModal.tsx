import React, { useState } from 'react';
import Modal from 'react-modal';
import Toolbar from './Toolbar';

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
            <h2>루틴 추가하기</h2>
            <span>운동이름</span>
            <select>
            <option value="1"></option>
            <option value="2">런지</option>
            <option value="3">스쿼트</option>
            <option value="espresso">에스프레소</option>
            </select><br/>
            <span>세트</span>
            <select>
            <option value="1"></option>
            <option value="2">런지</option>
            <option value="3">스쿼트</option>
            <option value="espresso">에스프레소</option>
            </select><br/>
            <span>횟수</span>
            <select>
            <option value="1"></option>
            <option value="2">런지</option>
            <option value="3">스쿼트</option>
            <option value="espresso">에스프레소</option>
            </select><br/>
            <button onClick={handleAddRoutine}>Add</button>
            <button onClick={onClose}>완료</button>
        </div>
        )}
        <Toolbar/>
    </div>
    
    );
};

export default AddRoutineModal;
