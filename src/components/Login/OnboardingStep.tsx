import React, { useState } from 'react';
import styled from 'styled-components';

interface Option {
    label: string;
    description?: string;
}

interface OnboardingStepProps {
    pageNumber: number;
    totalPageCount: number;
    title: string;
    content?: string;
    options?: string[] | Option[];
    buttonText: string;
    onNext: () => void;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
    pageNumber,
    totalPageCount,
    title,
    content,
    options = [],
    buttonText,
    onNext
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionClick = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    };

    return (
        <Container>
            <Title>{title}</Title>
            <PageIndicator>{`${pageNumber} of ${totalPageCount}`}</PageIndicator>
            <Content>{content}</Content>
            <OptionsContainer>
                {options.map((option) => {
                    const label = typeof option === 'string' ? option : option.label;
                    const description = typeof option === 'string' ? null : option.description;
                    return (
                        <OptionWrapper key={label}>
                            {description && (
                                <OptionDescription>
                                    {description}
                                </OptionDescription>
                            )}
                            <OptionButton
                                onClick={() => handleOptionClick(label)}
                                isSelected={selectedOptions.includes(label)}
                            >
                                {label}
                            </OptionButton>
                        </OptionWrapper>
                    );
                })}
            </OptionsContainer>
            <NextButton onClick={onNext}>
                {buttonText}
            </NextButton>
        </Container>
    );
};

const Container = styled.div`
  text-align: center;
  padding: 0px;
  background-color: #EFEFEF; /* 배경 색깔 */
  min-height: 100vh; /* 전체 화면 높이 커버 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const PageIndicator = styled.p`
  margin-bottom: 5px;
  font-size: 15px;
  color: #777;
`;

const Content = styled.h3`
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const OptionWrapper = styled.div`
  position: relative;
`;

const OptionDescription = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FF6C6C;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 15px;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  outline: none;
  background-color: ${(props) => (props.isSelected ? '#FF6C6C' : '#FFFFFF')};
  color: ${(props) => (props.isSelected ? '#FFFFFF' : '#000000')};
  width: 330px;
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

export default OnboardingStep;
