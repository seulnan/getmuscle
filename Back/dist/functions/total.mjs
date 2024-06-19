import { smtpTransport } from "../config/email.js";

import session from 'express-session';
import dotenv from 'dotenv';


dotenv.config();

const {EMAIL_USER} = process.env;

var generateRandomNumber = function (min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
};
export const emailAuth = async (req,res) => {
    const number = generateRandomNumber(11111, 99999);
    console.log(req.body.userid);
    const mailOptions = {
        from: EMAIL_USER,
        to: req.body.userid,
        subject: " [득근득근] 이메일 확인 인증번호 안내",
        html: `<h1>아래 인증번호를 확인하여 이메일 인증을 완료해 주세요.</h1><br></br><b>${number}</b>`
    };
    try{
    smtpTransport.sendMail(mailOptions).then(()=>{
        //console.log("response", response);
        req.session.temporaryEmail = ({ ok: true, auth: number, email: req.body.userid });
        req.session.save(err => {
            if (err) console.log(err);
          });
        console.log(req.session.temporaryEmail);
        smtpTransport.close();
        return;
    });
}catch(err){
    //emailFailed();
    req.session.temporaryEmail = ({ ok: false });
    req.session.save(err => {
        if (err) console.log(err);
      });
    smtpTransport.close();
    return;

}};
export const check_email = async (req) => {
    console.log(req.session.temporaryEmail);
    if (req.session.temporaryEmail.ok == true) {
        console.log(req.body.authNum);
        if (req.session.temporaryEmail.auth == parseInt(req.body.authNum)) {
            req.session.isSigning?.condition == undefined ? req.session.isSigning={condition : [true]} : req.session.isSigning.condition[1] = true;
            console.log(req.session.isSigning.condition);
            req.session.save(err => {
                if (err) console.log(err);
              });
            return true;
        }else{return false;}
    }
};
//pwsame은 비밀번호 확인과 비밀번호 항목이 동일한지 체크하는 것
//pwc는 비밀번호의 형식이 올바른지 체크하는 라벨
//ONINPUT이벤트에 사용할 함수입니다!


