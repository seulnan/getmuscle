import React from 'react';
import styled from 'styled-components';

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
return (
    <Container>
        <Title>{title}</Title>
      //일러스트 넣기 
        <NextButton onClick={onNext}>
        {buttonText}
        </NextButton>
    </Container>
);
};

const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
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
    background-color: #FF6C6C;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default OnboardingCompleteStep;
