import React, { useState } from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface OnboardingAddressStepProps {
  pageNumber: number;
  totalPageCount: number;
  title: string;
  buttonText: string;
  onNext: (address: string) => void;
}

// declare global {
//   interface Window {
//     daum: any;
//   }
// }

const OnboardingAddressStep: React.FC<OnboardingAddressStepProps> = ({
  pageNumber,
  totalPageCount,
  title,
  buttonText,
  onNext
}) => {
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  
  const [roadAddress,setRA]= useState<string>('');
  const [postcode,setPostcode]= useState<string>('');
  const [jibunAddress,setJA]= useState<string>('');
  const [extraAddress,setERA]= useState<string>('');
  const [gShow, setG]=useState<string>('done');
  const [gV, setGV]=useState<string>('');
  const [textBool, setB]=useState<boolean>(true);
  
  
  const handleComplete = () => {
    const d = (document.getElementById('detailAddress') as HTMLInputElement).value;
    const address = `${postcode}+${roadAddress}+${jibunAddress}+${d}+${extraAddress}`;
    if(address!=="") onNext(address);
    
  };
  const completeHandler=(data:any)=>{
    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    var roadAddr = data.roadAddress; // 도로명 주소 변수
    var extraRoadAddr = ''; // 참고 항목 변수

    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
        extraRoadAddr += data.bname;
    }
    // 건물명이 있고, 공동주택일 경우 추가한다.
    if(data.buildingName !== '' && data.apartment === 'Y'){
       extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
    }
    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    if(extraRoadAddr !== ''){
        extraRoadAddr = ' (' + extraRoadAddr + ')';
    }

    // 우편번호와 주소 정보를 해당 필드에 넣는다.
    setPostcode(data.zonecode);
    setRA(roadAddr);
    setJA(data.jibunAddress);
    
    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
    if(roadAddr !== ''){
       setERA(extraRoadAddr);
    } else {
        setERA('');
    }

    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
    if(data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        setGV('(예상 도로명 주소 : ' + expRoadAddr + ')');
        setG('block');

    } else if(data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        setGV('(예상 지번 주소 : ' + expJibunAddr + ')');
        setG('block');
    } else {
        setGV('');
        setG('none');
    }
    setB(false);
};
  const openAddressSearch = () => {
    open({onComplete : completeHandler});
};

  return (
    <Container>
      <Title>{title}</Title>
      <PageIndicator>{`${pageNumber} of ${totalPageCount}`}</PageIndicator>
      <SearchBox>
      <Input type="text" value={postcode} placeholder="우편번호"  disabled={textBool}></Input>
      <SearchButton onClick={openAddressSearch}>우편번호 🔍</SearchButton><br></br>
      <input type="text" value={roadAddress} placeholder="도로명주소" disabled={textBool}></input>
      <input type="text" value={jibunAddress} placeholder="지번주소" disabled={textBool}></input>
      <span id="guide" style={{color:"#999", display:gShow}}>{gV}</span>
      <input type="text" id="detailAddress" placeholder="상세주소" disabled={textBool}></input>
      <input type="text" value={extraAddress} placeholder="참고항목" disabled={textBool}></input>
      </SearchBox>
      <NextButton onClick={() => handleComplete()}>
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
  type:text;
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
