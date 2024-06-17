import React, { useRef, useState } from 'react';
import styled from 'styled-components';

interface OnboardingProfilePictureStepProps {
  pageNumber: number;
  totalPageCount: number;
  title: string;
  buttonText: string;
  onNext: (file: File) => void;
}

const OnboardingProfilePictureStep: React.FC<OnboardingProfilePictureStepProps> = ({
  pageNumber,
  totalPageCount,
  title,
  buttonText,
  onNext
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNextClick = () => {
    if (selectedFile) {
      onNext(selectedFile);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <PageIndicator>{`${pageNumber} of ${totalPageCount}`}</PageIndicator>
      <h4>프로필 사진으로 본인을 표현해보세요!</h4>
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
`

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
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

export default OnboardingProfilePictureStep;
