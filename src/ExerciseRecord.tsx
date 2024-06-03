import React,{useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import AddRoutineModal from './AddRoutineModal';

import styled from 'styled-components';


const ExerciseRecord: React.FC = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().split('T')[0];
    const [todayQuote, setTodayQuote] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [exerciseDates, setExerciseDates] = useState<Date[]>([]);
    const handleCompleteExercise = () => {
        // 운동 기록 완료 로직 (예: 서버에 데이터 저장 등)
        
        // 로컬 스토리지에 운동 기록 저장
        const activities = JSON.parse(localStorage.getItem('activities') || '{}');
        // 각 날짜에 대해 하나의 이모티콘만 저장
        activities[today] = '🔥';
        
        localStorage.setItem('activities', JSON.stringify(activities));
        // 완료 후 원래 페이지로 돌아가기
        navigate('/');
    };
    
    const openModal = () => {
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodayQuote(e.target.value);
        };
        const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedImage(e.target.files[0]);
        }
    };
    const handleImageUploadClick = () => {
        fileInputRef.current?.click(); // 파일 입력 필드 클릭 트리거
    };
    const handleExerciseDate = (date: Date) => {
        setExerciseDates([...exerciseDates, date]);
        };
return (
    <div>
        <h2>{today} 오늘의 득근득근</h2>
        <div>
            <span id="name">운동이름</span>
            <span id="set">세트</span>
            <span id="count">횟수</span>
        </div>
        <div>
            <button id="routine" onClick={openModal}>당신의 루틴을 추가하세요</button>
            <h3>오늘의 한마디</h3>
        <input
            type="text"
            value={todayQuote}
            onChange={handleQuoteChange}
        /><br/>
        
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Routine Modal"
            >
        <AddRoutineModal isOpen={modalIsOpen} onClose={closeModal} />
        </Modal>
        <div>
            {/* 기존 입력 필드를 숨기고 ref를 사용하여 참조합니다. */}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{display: 'none'}} />
            {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />}
            {/* 사용자 정의 버튼을 추가합니다. */}
            <button onClick={handleImageUploadClick}>오늘의 운동 사진 업로드</button>
        </div>
    </div>
        <div>
            <button>공유</button>
            <button onClick={handleCompleteExercise}>완료</button>
        </div>
    
    </div>
        
    );
};

export default ExerciseRecord;

