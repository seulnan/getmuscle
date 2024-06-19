import React, { useState, useRef, useEffect } from 'react';
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
    background-color: #fff;
    text-align: center;
    padding: 20px;
    position: relative;
    font-family: 'Urbanist', sans-serif; /* 전체에 Urbanist 폰트 적용 */
`;

const Header = styled.h2`
    color: #FF8975;
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    text-align: left;
    margin-left: 15px;
    position: absolute;
    top: 40px;
`;

const Content = styled.div`
    margin-top: 120px;
`;

const RoutineHeader = styled.div`
    display: flex;
    justify-content: space-around;
    background: #FF8975;
    padding: 10px;
    margin-bottom: 5px;
    margin-left: 15px;
    margin-right: 15px;
`;

const RoutineHeaderName = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    div {
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
    }
`;

const RoutineItem = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 3px;
`;

const AddRoutineButton = styled.button`
    background: #FF8975;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 19px;
    cursor: pointer;
    border-radius: 10px;
    margin: 60px 0 10px 0;
`;

const QuoteSection = styled.div`
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Urbanist', sans-serif; /* Urbanist 폰트 적용 */

    h1 {
        font-size: 37px;
    }
`;

const QuoteInput = styled.input`
    width: 90%;
    padding: 2%;
    font-size: 22px;
    border: none;
    text-align: center;
    font-family: 'Urbanist', sans-serif; /* Urbanist 폰트 적용 */
`;

const ProfilePictureWrapper = styled.div<{ hidden: boolean }>`
    margin: 40px auto;
    width: 200px;
    height: 200px;
    position: relative;
    display: ${props => (props.hidden ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    background-color: #FF8975;
    border-radius: 50%;
`;

const UploadButton = styled.button`
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #FFFFFF;
    font-size: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    border: none;
`;

const ImagePreview = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
`;

const ActionButton = styled.button<{ shared?: boolean }>`
    background: ${props => (props.shared ? '#ccc' : '#FF8975')};
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 19px;
    cursor: pointer;
    border-radius: 10px;
`;

const ExerciseRecord: React.FC = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [routines, setRoutines] = useState<Routine[]>([]);
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString().split('T')[0];
    const [todayQuote, setTodayQuote] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [exerciseDates, setExerciseDates] = useState<Date[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isShared, setIsShared] = useState<boolean>(false);

    useEffect(() => {
        const savedData = localStorage.getItem(`exercise-${today}`);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setRoutines(parsedData.routines);
            setTodayQuote(parsedData.todayQuote);
            setUploadedImage(parsedData.uploadedImage || null);
            setIsShared(parsedData.isShared || false);
        }
    }, [today]);

    const handleSaveRoutine = (newRoutine: Routine) => {
        setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
        setModalIsOpen(false);
    };

    const handleCompleteExercise = async () => {
        const activities = JSON.parse(localStorage.getItem('activities') || '{}');
        activities[today] = isShared ? 'shared' : '🔥';
        localStorage.setItem('activities', JSON.stringify(activities));

        const exerciseData = {
            routines,
            todayQuote,
            uploadedImage,
            isShared,
        };
        localStorage.setItem(`exercise-${today}`, JSON.stringify(exerciseData));

        navigate('/calendar');
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleShareToggle = () => {
        setIsShared(!isShared);
    };

    const handleExerciseDate = (date: Date) => {
        setExerciseDates([...exerciseDates, date]);
    };

    return (
        <Container>
            <Header>{today} 오늘의 득근득근</Header>
            <Content>
                <RoutineHeader>
                    <RoutineHeaderName>
                        <div>운동 이름</div>
                        <div>세트</div>
                        <div>횟수</div>
                    </RoutineHeaderName>
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
                    <QuoteInput type="text" value={todayQuote} placeholder='오늘의 한마디를 적어주세요' onChange={handleQuoteChange} />
                </QuoteSection>
                <ProfilePictureWrapper hidden={!!uploadedImage}>
                    <UploadButton onClick={handleImageUploadClick}>+</UploadButton>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
                </ProfilePictureWrapper>
                {uploadedImage && <ImagePreview src={uploadedImage} alt="Uploaded" />}
                <Actions>
                    <ActionButton onClick={handleShareToggle} shared={isShared}>
                        {isShared ? '공유취소' : '공유'}
                    </ActionButton>
                    <ActionButton onClick={handleCompleteExercise}>완료</ActionButton>
                </Actions>
            </Content>
        </Container>
    );
};

export default ExerciseRecord;