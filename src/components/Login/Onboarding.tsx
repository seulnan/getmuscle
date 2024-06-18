import React, { useState } from 'react';
import OnboardingStep from './OnboardingStep';
import OnboardingAddressStep from './OnboardingAddressStep';
import OnboardingProfilePictureStep from './OnboardingProfilePictureStep';
import OnboardingCompleteStep from './OnboardingCompleteStep';

const Onboarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [address, setAddress] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const pages = [
    {
      title: '회원가입 전에!',
      content: '운동 목적 (복수선택 가능)',
      options: ['다이어트', '체력 증진', '벌크업'],
      buttonText: '다음'
    },
    {
      title: '회원가입 전에!',
      content: '운동 경력',
      options: [
        { label: '헬린이', description: '경력 3개월 이하' },
        { label: '헬소년', description: '경력 3개월 ~ 1년' },
        { label: '헬른', description: '경력 1년 ~ 3년' },
        { label: '헬창', description: '경력 3년 이상' }
      ],
      buttonText: '다음'
    },
    {
      title: '회원가입 전에!',
      options: [], // OnboardingStep 컴포넌트와 호환을 위해 빈 배열을 전달
      buttonText: '완료'
    },
    {
      title: '회원가입 전에!',
      buttonText: '완료'
    },
    {
      title: '득근득근 회원이 되신 것을 축하합니다!',
      buttonText: '시작하기'
    }
  ];

  const nextPage = (data?: any) => {
    if (data && typeof data === 'string') {
      setAddress(data);
    } else if (data && data instanceof File) {
      setProfilePicture(data);
    }
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log('Onboarding completed with address:', address);
      console.log('Profile picture:', profilePicture);
    }
  };

  const renderPage = () => {
    const page = pages[currentPage];
    if (currentPage === 2) {
      return (
        <OnboardingAddressStep
          pageNumber={currentPage + 1}
          totalPageCount={pages.length}
          title={page.title}
          buttonText={page.buttonText}
          onNext={nextPage}
        />
      );
    } else if (currentPage === 3) {
      return (
        <OnboardingProfilePictureStep
          pageNumber={currentPage + 1}
          totalPageCount={pages.length}
          title={page.title}
          buttonText={page.buttonText}
          onNext={nextPage}
        />
      );
    } else if (currentPage === 4) {
      return (
        <OnboardingCompleteStep
          title="득근득근 회원이<br />되신 것을 축하합니다!"
          buttonText={page.buttonText}
          onNext={nextPage}
        />
      );
    } else {
      return (
        <OnboardingStep
          pageNumber={currentPage + 1}
          totalPageCount={pages.length}
          title={page.title}
          content={page.content}
          options={page.options}
          buttonText={page.buttonText}
          onNext={nextPage}
        />
      );
    }
  };

  return <div>{renderPage()}</div>;
};

export default Onboarding;
