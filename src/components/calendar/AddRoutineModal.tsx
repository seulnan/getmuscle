import React, { useState } from 'react';
import Modal from 'react-modal';
import Toolbar from '../Toolbar';

interface Routine {
    name: string;
    sets: number;
    reps: number;
}

interface AddRoutineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (routine: Routine) => void; // 루틴 저장 이벤트 처리기를 props로 추가
}


const AddRoutineModal: React.FC<AddRoutineModalProps & { onSave: (routine: Routine) => void }> = ({ isOpen, onClose, onSave }) => {
    const handleComplete = () => {
        if (routine) {  // 유효성 검사
            onSave({
            name: routine,
            sets: sets,
            reps: reps
            });
        }
        onClose();  // 모달 닫기
    };
    
    const [routine, setRoutine] = useState<string>('');
    const [sets, setSets] = useState<number>(1);
    const [reps, setReps] = useState<number>(1);

    const handleRoutineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoutine(e.target.value);
    };

    const handleSetsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSets(parseInt(e.target.value, 10));
    };

    const handleRepsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReps(parseInt(e.target.value, 10));
    };



    const exerciseOptions = [
        { value: '', label: '운동 선택' },
        { value: '런지', label: '런지' },
        { value: '스쿼트', label: '스쿼트' },
        { value: '푸쉬업', label: '푸쉬업' },
        { value: '데드리프트', label: '데드리프트' },
        { value: '벤치프레스', label: '벤치프레스' },
        { value: '플랭크', label: '플랭크' },
        { value: '버피', label: '버피' },
        { value: '사이드 런지', label: '사이드 런지' },
        { value: '마운틴 클라이머', label: '마운틴 클라이머' },
        { value: '턱걸이', label: '턱걸이' },
        { value: '딥스', label: '딥스' }
    ];
    
    const numberOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>루틴 추가하기</h2>
            <div>
                <label>
                    운동이름
                    <select value={routine} onChange={handleRoutineChange}>
                        {exerciseOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    세트
                    <select value={sets} onChange={handleSetsChange}>
                        {numberOptions.map(number => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    횟수
                    <select value={reps} onChange={handleRepsChange}>
                        {numberOptions.map(number => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={handleComplete}>완료</button>
            <Toolbar />
        </Modal>
    )};

    export default AddRoutineModal;