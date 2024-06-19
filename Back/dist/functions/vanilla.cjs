const axios = require('axios');

function check_pw() {

    const PW =document.getElementById('userpw').value;
    const PWc = document.getElementById('userpw_c').value;
    const PWsameL = document.getElementById('pwsame_label');
    const PWcL = document.getElementById('pwc_label');
        var SC = ["!", "@", "#", "$", "%", "*"];
    var check_SC = 0;
    if (PW != '') {
        if (PW == PWc) {
            PWsameL.innerHTML = '비밀번호가 일치합니다.';
            PWsameL.style.color = 'blue';
            console.log("y");
           
        }
        else {
            PWsameL.innerHTML = '비밀번호가 일치하지 않습니다.';
            PWsameL.style.color = 'red';
            
        }
        }
    for (var i = 0; i < SC.length; i++) {
        if (PW.indexOf(SC[i]) != -1) {
            check_SC = 1;
        }
    }
    if (PW.length < 10 || PW.length > 16) {
    PWcL.innerHTML = '비밀번호는 10글자 이상, 16글자 이하만 이용 가능합니다.';
    return false;
    }else if (check_SC == 0) {
    PWcL.innerHTML = '비밀번호에 !,@,#,$,%,* 의 특수문자를 포함시켜야 합니다.';
    return false;
    
    }
   
    return true;
    };
function sendpw(){
    if(check_pw()==true){
    document.getElementById('pwc_label').innerHTML = ' ';
    
    axios.post('/signup/password-save', {
        userPwd: document.getElementById('userpw').value
    })
    .then(function (response) {
        console.log("good");
    })
    .catch(function (error) {
        alert("서버요청실패");
    });}
}

function check_pw_done() {
    const PW =document.getElementById('userpw').value;
    const PWc = document.getElementById('userpw_c').value;
    const PWsameL = document.getElementById('pwsame_label');
    const PWcL = document.getElementById('pwc_label');
    if (PW != '' && PWc != '') {
        if (PW == PWc) {
            PWsameL.innerHTML = '비밀번호가 일치합니다.';
            PWsameL.style.color = 'blue';
            sendpw();
            
            axios.post('/signup/password-done', {
                userPwd: document.getElementById('userpw').value
            })
            .then(function (response) {
                console.log("good");
            })
            .catch(function (error) {
                alert("서버요청실패");
            });
            console.log("y");
           
        }
        else {
            PWsameL.innerHTML = '비밀번호가 일치하지 않습니다.';
            PWsameL.style.color = 'red';
            
        }
        }
    };

function getJUSO() {
    new daum.Postcode({
        oncomplete: function(data) {
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
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
            document.getElementById("jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
            document.getElementById('postcode').disabled = false;
            document.getElementById("extraAddress").disabled=false;
            document.getElementById("roadAddress").disabled = false;
            document.getElementById("jibunAddress").disabled = false;
            document.getElementById("detailAddress").disabled = false;
        }
    }).open();
}

function profUpload(){
    console.log("a");
    const input=document.getElementById('profile');
    const profile = input.files[0];
    const data = new FormData();
    data.append("profile", profile);
    $.ajax({
        url: '/up',
        enctype:'multipart/form-data',
        method: 'POST',
        processData: false ,
        contentType: false,
        data: data,
    }).done((res)=>{
        const result = document.getElementById("result");
        let trim = input.value.replace("C:\\fakepath\\","");
        result.innerHTML = `<img src="/public/image/${trim}"/>`;
        document.getElementById("getme").value = `https://drive.google.com/file/d/${res.id}/preview`; 
    })
    console.log("C");
    //console.log(done.src);
    
    
}

module.exports = {check_pw,check_pw_done,sendpw, profUpload, getJUSO};