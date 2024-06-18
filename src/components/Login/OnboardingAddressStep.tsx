import React, { useState } from 'react';
import styled from 'styled-components';

interface OnboardingAddressStepProps {
  pageNumber: number;
  totalPageCount: number;
  title: string;
  buttonText: string;
  onNext: (address: string) => void;
}

declare global {
  interface Window {
    daum: any;
  }
}

const OnboardingAddressStep: React.FC<OnboardingAddressStepProps> = ({
  pageNumber,
  totalPageCount,
  title,
  buttonText,
  onNext
}) => {
  const [address, setAddress] = useState<string>('');

  const handleComplete = (data: any) => {
    setAddress(data.address);
  };

  const openAddressSearch = () => {
  };

  return (
    <Container>
      <Title>{title}</Title>
      <PageIndicator>{`${pageNumber} of ${totalPageCount}`}</PageIndicator>
      <SearchBox>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="지번, 도로명, 건물명으로 검색"
        />
        <SearchButton onClick={openAddressSearch}>🔍</SearchButton>
      </SearchBox>
      <NextButton onClick={() => onNext(address)}>
        {buttonText}
      </NextButton>
    </Container>
  );
};

const Container = styled.div`
  background-color: #EFEFEF;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 50px;
  margin-top: 230px; /* Title 컴포넌트를 아래로 내리기 위해 margin-top을 추가 */
`;

const PageIndicator = styled.p`
  margin-bottom: 0px;
  font-size: 24px;
  color: #777;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-top: 50px;
  padding: 20px;
  width: 70%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

const SearchButton = styled.button`
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  cursor: pointer;
  outline: none;
`;

const NextButton = styled.button`
  margin-top: 180px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FF8975;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default OnboardingAddressStep;
