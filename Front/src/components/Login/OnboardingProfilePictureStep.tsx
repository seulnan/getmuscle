import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface OnboardingProfilePictureStepProps {
  pageNumber: number;
  totalPageCount: number;
  title: string;
  buttonText: string;
  onNext: (filelink: string) => void;
}

const OnboardingProfilePictureStep: React.FC<OnboardingProfilePictureStepProps> = ({
  pageNumber,
  totalPageCount,
  title,
  buttonText,
  onNext
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [linked, setLink] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const name = event.target.value;
      console.log("a");

    const data = new FormData();
    data.append("profile", file);
    axios.post('http://localhost:4500/up', data, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
  .then(function (response) {
      const res = response.data;
      let trim = name.replace("C:\\fakepath\\", "");
      setPreview(`http://localhost:4500/public/image/${trim}`);
      setLink(`https://drive.google.com/file/d/${res.id}/preview`); 
  })
  .catch(function (error) {
      console.error("There was an error!", error);
  });
    console.log("C");
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNextClick = () => {
    if (linked!=="") {
      onNext(linked);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <PageIndicator>{`${pageNumber} of ${totalPageCount}`}</PageIndicator>
      <h3>프로필 사진으로 본인을 표현해보세요!</h3>
      <input type="hidden" value={linked}></input>
      <ProfilePictureWrapper>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {preview ? (
          <ImagePreview src={preview} alt="Uploaded" />
        ) : (
          <UploadButton onClick={handleImageUploadClick}>+</UploadButton>
        )}
      </ProfilePictureWrapper>
      <NextButton onClick={handleNextClick}>
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
  margin-top: 100px; /* Title 컴포넌트를 아래로 내리기 위해 margin-top을 추가 */
`;

const PageIndicator = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  color: #777;
`;

const ProfilePictureWrapper = styled.div`
  margin: 20px auto;
  width: 163px;
  height: 163px;
  position: relative;
  display: flex;
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
  font-size: 80px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  border: none;
`;

const ImagePreview = styled.img`
  width: 163px;
  height: 163px;
  border-radius: 50%;
  object-fit: cover;
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

export default OnboardingProfilePictureStep;
