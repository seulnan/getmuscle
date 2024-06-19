import React, { useState } from 'react';
import styled from 'styled-components';
import Finish from '../../assets/images/finish.png';
import StyledModal from '../StyledModal';
import { Link } from 'react-router-dom';

interface OnboardingCompleteStepProps {
    title: string;
    buttonText: string;
    onNext: () => void;
}

const OnboardingCompleteStep: React.FC<OnboardingCompleteStepProps> = ({
    title,
    buttonText,
    onNext
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleNext = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        onNext();
    };

    return (
        <Container>
            <Title>
                득근득근 회원이<br />
                되신 것을 축하합니다!
            </Title>
            <Illustration src={Finish} alt="Finish" />
            <NextButton onClick={handleNext}>
                {buttonText}
            </NextButton>
            <StyledModal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="회원 기념"
            >
                <p>회원 기념으로 5point를 지급하였습니다.</p>
                <Link to="/calendar">
                <CloseButton >확인</CloseButton>
                </Link>
    
            </StyledModal>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    padding: 20px;
    background-color: #EFEFEF;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 32px;
    line-height: 1.5;
`;

const Illustration = styled.img`
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
`;

const NextButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FF8975;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FF8975;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

export default OnboardingCompleteStep;
