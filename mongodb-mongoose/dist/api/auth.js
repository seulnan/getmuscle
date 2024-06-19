import express from 'express';
import {upload, getFileDetails} from '../config/imgSave.js';
//import { check_pw } from "./vanilla.cjs";
import user from '../schemas/user.js';
//const mail = require('../config/email.cjs');
import * as func from '../functions/total.mjs';
import sha from 'sha256';
const router = express.Router();
router.get('/login', function (req, res) {
    console.log(req.session);
    if (req.session.user) {
        console.log('세션 유지');
        res.render('server.ejs', { user: req.session.user });
    }
    else {
        console.log('로그인 페이지');
        res.render('server.ejs');
    }
});
router.post('/login', function (req, res) {
    console.log(`아이디 : ${req.body.userid}`);
    console.log(`비밀번호 : ${req.body.userpw}`);
    user
        .findOne({ ID: req.body.userid })
        .then((result) => {
        if (result != null) {
            if (result.password == sha(req.body.userpw)) {
                req.session.user = req.body;
                req.session.user.usernick = result.nickname;
                req.session.cookie.maxAge = 3600;
                console.log('새로운 로그인');
                console.log(req.session.user.usernick);
                res.send({state:1});
            }
            else {
                res.send({state:-1});
            }
        }
    })
        .catch(() => {
        res.send({state:-1});
    });
});
//logout
//-홈페이지에서 로그아웃-//
router.post("/", function (req, res) {
    req.session.destroy((err) => alert(`logout failed with error:${err}`));
    res.render('server.ejs',{ user: null });
});
//-회원가입페이지로드-//
// router.get("/signup/:page", function (req, res) {
//     if (parseInt(req.params.page) == 1) {
//         res.render("signup.ejs", { f: func });
//     }
//     else if (parseInt(req.params.page) == 2) {
//         const labContent = "<label></label>";
//         res.render("signup2.ejs", { labContent });
//     }
//     else if (parseInt(req.params.page) == 3) {
//         const labContent = "<label></label>";
//         res.render("signup3.ejs", { labContent });
//     }
//     else if (parseInt(req.params.page) == 4) {
//         res.render("signup4.ejs");
//     }
//     else if (parseInt(req.params.page) == 5) {
//         res.render("signup5.ejs");
//     }
// });
//추후 회원가입 페이지가 여러개 생기면 시멘틱링크로 page 1,2,3 넣으면 차례로 접속가능하게 할듯
//꼭꼭 회원가입 관련 element들은 name, id모두 만들고 같은 값으로 넣어두기
router.post("/signup/email-send", function (req, res) {
    user
        .findOne({ ID: req.body.userid })
        .then(async (result) => {
        if (result != null) {
            res.send({state:-1, message : "이미 가입된 이메일입니다."});
      
        }
        else {
            res.send({state:1, message : "이메일이 전송되었습니다."});
            func.emailAuth(req);
           
        }
    })
        .catch((e) => { console.log(e); res.send({state:-1, message:"에러 발생. 다시 시도해주세요."})});
});
router.post("/signup/email-check", async function (req, res) {
    if (await func.check_email(req) == true) {
        res.send({state : 1});
    }
    else {
        res.send({state : -1, message:"인증번호가 일치하지 않습니다."});
    }
});
router.post("/signup/password-save", function (req, res) {
    console.log(req.body);
    req.session.temporaryPassword = req.body.userPwd;
    req.session.save(err => {
        if (err)
            console.log(err);
    });
    console.log(req.session.temporaryPassword);
});
router.post('/signup/password-done', function (req, res) {
    //if(req.session.temporaryPassword == req.userPwd){
    if (req.session.temporaryPassword == req.body.userPwd) {
        if (req.session.isSigning?.condition == undefined) {
            req.session.isSigning = { condition: [true] };
        }
        else if ((req.session.isSigning.condition).length == 2) {
            req.session.isSigning.condition[2] = true;
        }
        req.session.save(err => {
            if (err)
                console.log(err);
        });
        console.log(req.session.isSigning.condition);
    }
    //}
});

router.post('/signup/nickname-check', function(req,res){
    user
        .findOne({ nickname: req.body.usernick})
        .then((result) => {
        if (result != null) {
            res.send({state : -1, message:"중복된 닉네임입니다."});
        }else{
            req.session.temporaryNickname = req.body.usernick;
            if (req.session.isSigning?.condition == undefined) {
                req.session.isSigning = { condition: [false] };
            }
            else if ((req.session.isSigning.condition).length == 1&&req.session.isSigning[0]==true) {
                req.session.isSigning.condition[1] = true;
            }
            req.session.save(err => {
                if (err)
                    console.log(err);
            });
            console.log(req.session.isSigning.condition);
            res.send({state : 1});
        }
    });
})
//-페이지별 submit 때 검사-//
router.post("/signup/page/:page", function (req, res) {
    const nowpage = parseInt(req.params.page);
    if (nowpage == 1) {
        console.log(req.session.isSigning?.condition);
        if (req.session.isSigning?.condition != undefined) {
            if (req.session.isSigning.condition.length == 3) {
                console.log(req.session.temporaryPassword);
                req.session.isSigning.data = new user({
                    ID: req.session.temporaryEmail.email,
                    nickname: req.session.temporaryNickname,
                    password: sha(req.session.temporaryPassword),
                    exc_history: 0,
                    height: 0,
                    weight: 0,
                    address: "",
                    POINT: 5,
                    profile: ""
                });
                delete req.session.temporaryEmail;
                delete req.session.temporaryNickname;
                delete req.session.temporaryPassword;
                req.session.save(err => {
                    if (err)
                        console.log(err);
                });
                res.send({state : 1, message:"기본 정보 저장 완료"});
            }
        }else{
            res.send({state : -1, message:"조건 불만족"});
        }
    }
    else if (nowpage == 2) {
        
            console.log(req.purposeList);
            //Array.from(req.body.o1)
            req.session.isSigning.data.exc_purpose = req.body.purposeList;
            console.log(req.session.isSigning.data);
            req.session.save(err => {
                if (err)
                    console.log(err);
            });
            res.send({state : 1});
    }
    else if (nowpage == 3) {
        //운동경력
        let exTime =0;
        console.log(req.body.purposeList);
        const v = req.body.purposeList[0];
        if(v=="헬린이"){exTime=1;}
        else if(v=="헬소년"){exTime=2;}
        else if(v=="헬른"){exTime=3;}
        else if(v=="헬창"){exTime=4;}
        req.session.isSigning.data.exc_history = exTime;
        console.log(req.session.isSigning.data);
        res.send({state : 1});
    }
    else if (nowpage == 4) {
        console.log(req.body);
            req.session.isSigning.data.address = req.body.address;
            console.log(req.session.isSigning.data);
            res.send({state : 1, message:"주소 저장 완료"});
    }
    else if (nowpage == 5) {
        console.log(req.body.getme);
        if (req.body.getme != undefined) {
            req.session.isSigning.data.profile = req.body.getme;
            console.log(req.session.isSigning.data);
        }
        const final = new user(req.session.isSigning.data);
        final.save()
            .then((clear) => {
            // If everything goes as planed
            //use the retured user document for something
            delete req.session.isSigning;
            res.send({state : 1, message:"사진 저장 완료"});
        })
            .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
            res.send({state : -1, message:"사진 에러"});
        });
    }
});
router.post('/up', upload.single('profile'), async (req,res)=>{
    const result = await getFileDetails(req);
    if(result.status==1){
        res.send({ src: result.file_name, id:result.id});
    }
    
});

router.post('/img-record', upload.array("photos", 4), (req, res) => {
    console.log(req.file.filename);
    res.send({ src: req.file.path });
});
/*

화면을 넘기며 사용자 정보를 입력받을 것이므로
저렇게 한번에 정보를 넣지 않고 분절해서 넣거나 시멘틱링크 사용해야할듯.
1. 분절법
var test = new user;
test.ID=req.body.userid;

2. 시멘틱링크

시멘틱 링크 사용하기로 결정했는데 추후 더 좋은 방법이 있으면 그것으로 부탁.

*/
//-db에 저장-//
router.get("/signup/finish", async function (req, res) {
    if (func.check_all(req.session) == true) {
        const newbie = new user(req.session.isSigning.data);
        newbie.save();
        req.session.isSigning.condition = new Array;
        req.session.isSigning.data = {};
    }
    res.redirect("/"); //홈, 또는 로그인화면으로 복귀. 회원가입후 바로 그 계정으로 로그인할 것이 아니라면 따로 조치 필요
});
export default router;
