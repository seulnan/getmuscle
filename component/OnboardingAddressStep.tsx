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
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
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
      <Instructions>
        <p>이렇게 검색해 보세요</p>
        <ul>
          <li>도로명 + 건물번호</li>
          <li>지역명 + 번지</li>
          <li>건물명 + 아파트명</li>
        </ul>
      </Instructions>
      <NextButton onClick={() => onNext(address)}>
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
  margin-bottom: 10px;
`;

const PageIndicator = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  color: #777;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 70%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  cursor: pointer;
  outline: none;
`;

const Instructions = styled.div`
  text-align: left;
  margin: 20px auto;
  width: 80%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  p {
    margin: 0 0 10px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    list-style: disc;
  }

  li {
    margin-bottom: 5px;
  }
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

export default OnboardingAddressStep;
