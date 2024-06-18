
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
// import AddRoutineModal from './AddRoutineModal';
// import styled from 'styled-components';

// interface Routine {
//   name: string;
//   sets: number;
//   reps: number;
// }

// const Container = styled.div`
//   padding: 20px;
//   background-color: #fff;
//   text-align: center;
// `;

// const Header = styled.h2`
//   color: #ff5151;
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const RoutineHeader = styled.div`
//   display: flex;
//   justify-content: space-around;
//   background: #f8f8f8;
//   padding: 7px;
//   margin-bottom: 5px;
// `;

// const RoutineItem = styled.div`
//   display: flex;
//   justify-content: space-around;
//   padding: 3px;
// `;

// const AddRoutineButton = styled.button`
//   background: #ff5151;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;
//   margin: 20px 0;
// `;

// const QuoteSection = styled.div`
//   margin: 20px 0;
// `;

// const QuoteInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   font-size: 16px;

// `;

// const UploadSection = styled.div`
//   margin: 20px 0;
// `;
// const ProfilePictureWrapper = styled.div`
//   margin: 20px auto;
//   width: 100px;
//   height: 100px;
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #FF6C6C;
//   border-radius: 50%;
// `;

// const UploadButton = styled.button`
//   display: inline-block;
//   width: 100%;
//   height: 100%;
//   background:transparent;
//   color: #FFFFFF;
//   font-size: 48px;
//   line-height: 100px;
//   text-align: center;
//   cursor: pointer;
//   border: none;
// `;

// const Actions = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 20px;
// `;

// const ActionButton = styled.button`
//   background: #ff5151;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;
// `;

// const ExerciseRecord: React.FC = () => {
//   const navigate = useNavigate();
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [routines, setRoutines] = useState<Routine[]>([]);
//   const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
//     .toISOString().split('T')[0];
//   const [todayQuote, setTodayQuote] = useState<string>('');
//   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
//   const [exerciseDates, setExerciseDates] = useState<Date[]>([]);
//   const handleSaveRoutine = (newRoutine: Routine) => {
//     setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
//     setModalIsOpen(false);
//   };
//   const handleCompleteExercise = () => {
//     // 운동 기록 완료 로직 (예: 서버에 데이터 저장 등)
    
//     // 로컬 스토리지에 운동 기록 저장
//     const activities = JSON.parse(localStorage.getItem('activities') || '{}');
//     // 각 날짜에 대해 하나의 이모티콘만 저장
//     activities[today] = '🔥';
    
//     localStorage.setItem('activities', JSON.stringify(activities));
//     // 완료 후 원래 페이지로 돌아가기
//     navigate('/');
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTodayQuote(e.target.value);
//   };

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setUploadedImage(e.target.files[0]);
//     }
//   };

//   const handleImageUploadClick = () => {
//     fileInputRef.current?.click(); // 파일 입력 필드 클릭 트리거
//   };

//   const handleExerciseDate = (date: Date) => {
//     setExerciseDates([...exerciseDates, date]);
//   };

//   return (
//     <Container>
//       <Header>{today} 오늘의 득근득근</Header>
//       <RoutineHeader>
//         <strong>운동 이름</strong>
//         <strong>세트</strong>
//         <strong>횟수</strong>
//       </RoutineHeader>
//       {routines.map((routine, index) => (
//         <RoutineItem key={index}>
//           <div>{routine.name}</div>
//           <div>{routine.sets}</div>
//           <div>{routine.reps}</div>
//         </RoutineItem>
//       ))}
//       <AddRoutineButton onClick={openModal}>당신의 루틴을 추가하세요</AddRoutineButton>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         <AddRoutineModal isOpen={modalIsOpen} onClose={closeModal} onSave={handleSaveRoutine} />
//       </Modal>
//       <QuoteSection>
//         <h1>오늘의 한마디</h1>
//         <QuoteInput type="text" value={todayQuote} onChange={handleQuoteChange} />
//       </QuoteSection>
//       <ProfilePictureWrapper>
//         <UploadButton onClick={handleImageUploadClick}>+</UploadButton>
//         <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
//       </ProfilePictureWrapper>
//       {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />}
//       <Actions>
//         <ActionButton>공유</ActionButton>
//         <ActionButton onClick={handleCompleteExercise}>완료</ActionButton>
//       </Actions>
//     </Container>
//   );
// };

// export default ExerciseRecord;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import AddRoutineModal from './AddRoutineModal';
import styled from 'styled-components';

interface Routine {
  name: string;
  sets: number;
  reps: number;
}

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  text-align: center;
`;

const Header = styled.h2`
  color: #ff5151;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const RoutineHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f8f8f8;
  padding: 7px;
  margin-bottom: 5px;
`;

const RoutineItem = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 3px;
`;

const AddRoutineButton = styled.button`
  background: #ff5151;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px 0;
`;

const QuoteSection = styled.div`
  margin: 20px 0;
`;

const QuoteInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ProfilePictureWrapper = styled.div`
  margin: 20px auto;
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF6C6C;
  border-radius: 50%;
`;

const UploadButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: #FFFFFF;
  font-size: 48px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  border: none;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background: #ff5151;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

const ExerciseRecord: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().split('T')[0];
  const [todayQuote, setTodayQuote] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [exerciseDates, setExerciseDates] = useState<Date[]>([]);
  const handleSaveRoutine = (newRoutine: Routine) => {
    setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
    setModalIsOpen(false);
  };
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
    <Container>
      <Header>{today} 오늘의 득근득근</Header>
      <RoutineHeader>
        <strong>운동 이름</strong>
        <strong>세트</strong>
        <strong>횟수</strong>
      </RoutineHeader>
      {routines.map((routine, index) => (
        <RoutineItem key={index}>
          <div>{routine.name}</div>
          <div>{routine.sets}</div>
          <div>{routine.reps}</div>
        </RoutineItem>
      ))}
      <AddRoutineButton onClick={openModal}>당신의 루틴을 추가하세요</AddRoutineButton>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <AddRoutineModal isOpen={modalIsOpen} onClose={closeModal} onSave={handleSaveRoutine} />
      </Modal>
      <QuoteSection>
        <h1>오늘의 한마디</h1>
        <QuoteInput type="text" value={todayQuote} onChange={handleQuoteChange} />
      </QuoteSection>
      <ProfilePictureWrapper>
        {uploadedImage ? (
          <ImagePreview src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
        ) : (
          <UploadButton onClick={handleImageUploadClick}>+</UploadButton>
        )}
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
      </ProfilePictureWrapper>
      <Actions>
        <ActionButton>공유</ActionButton>
        <ActionButton onClick={handleCompleteExercise}>완료</ActionButton>
      </Actions>
    </Container>
  );
};

export default ExerciseRecord;
