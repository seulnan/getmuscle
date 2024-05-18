import { response } from "express";
import { smtpTransport } from "../config/email.cjs";


var generateRandomNumber = function(min,max){
    var randNum = Math.floor(Math.random()*(max-min+1))+min;

    return randNum;
}

export const emailAuth = async(req)=>{
    const number = generateRandomNumber(11111,99999);

    const {email} = document.getElementById('userid').value;

    const mailOptions = {
        from : "득근득근",
        to : email,
        subject: " [득근득근] 이메일 확인 인증번호 안내",
        html: `<h1>아래 인증번호를 확인하여 이메일 인증을 완료해 주세요.</h1><br></br><b>${number}</b>`
    }
    smtpTransport.sendMail(mailOptions,(err,response)=>{
        console.log("response",response);
if(err){
    alert(' 메일 전송에 실패하였습니다. ');
    req.session.temporaryEmail=({ok:false});
    smtpTransport.close();
    return
}else{
    req.session.temporaryEmail=({ok:true, auth: number});
    smtpTransport.close();
    return
}
});
}

export const check_email = async(req)=>{
    if(req.session.temporaryEmail.ok==true){
        if(req.session.temporaryEmail.auth==document.getElementById("userid").value){
            req.session.isSigning.condition[0]=true;
            delete req.session.temporaryEmail;
        }
    }
}

export const check_pw = function(){
    const PW = document.getElementById('userpw').value;
    const PWc = document.getElementById('userpw_c').value;
    const PWsameL =  document.getElementById('pwsame_label');
    const PWcL = document.getElementById('pwc_label');
    
    var SC = ["!","@","#","$","%"];
    var check_SC = 0;

    if(PW.length < 6 || pw.length>16){
        PWcL.innerHTML ='비밀번호는 6글자 이상, 16글자 이하만 이용 가능합니다.';
        return false;
    }
    for(var i=0;i<SC.length;i++){
        if(PW.indexOf(SC[i]) != -1){
            check_SC = 1;
        }
    }
    if(check_SC == 0){
        PWcL.innerHTML = '비밀번호에 !,@,#,$,% 의 특수문자를 포함시켜야 합니다.'
        return false;
    }
    PWcL.innerHTML = '';

    
    if(PW !='' && PWc!=''){
        if(PW==PWc){
            PWsameL.innerHTML='비밀번호가 일치합니다.'
            PWsameL.style.color='blue';
            return true;
        }
        else{
            PWsameL.innerHTML='비밀번호가 일치하지 않습니다.';
            PWsameL.style.color='red';
            return false;
        }L
    }else return false;
}

export const check_purpose = function (){};

export const check_year = function (){};

export const check_all = (Session)=>{
    for(let i=0; i++; i<7){
        if(Session.isSigning.condition[i]==true)continue;
        else return false;
    }
    return true;
}