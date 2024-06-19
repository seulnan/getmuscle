import express from 'express';
import session from 'express-session';
import upload from '../config/imgSave.js';
//import { check_pw } from "./vanilla.cjs";
import user, {IUser} from '../schemas/user.js';
//const mail = require('../config/email.cjs');
import * as func from'../functions/total.js';

import sha from 'sha256';
const router = express.Router();

router.get('/login', function (req:express.Request, res:express.Response){
    console.log(req.session);
    if(req.session.user){
        console.log('세션 유지');
        res.render('home.ejs', {user:req.session.user});
    }else{
        console.log('로그인 페이지');
        res.render('login');
    }
});

router.post('/login',function(req:express.Request,res:express.Response){
    console.log(`아이디 : ${req.body.userid}`);
    console.log(`비밀번호 : ${req.body.userpw}`);
    user
    .findOne({ID : req.body.userid})
    .then((result:any)=>{
        if(result!=null){
        if(result.password == sha(req.body.userpw)){
            req.session.user=req.body;
            req.session.user.usernick = result.nickname;
            req.session.cookie.maxAge = 3600;

            console.log('새로운 로그인');
            console.log(req.session.user.usernick);
            res.redirect('/');
            
        }else{
            res.redirect('/login');
        }
    }})
    .catch(()=>{
        res.redirect('/login');
    })
});

//logout
//-홈페이지에서 로그아웃-//
router.post("/", function (req:express.Request, res:express.Response){
    req.session.destroy((err:any)=>alert(`logout failed with error:${err}`));
    res.render('home.ejs', {user : null});
});

//-회원가입페이지로드-//
router.get("/signup/:page", function (req:express.Request, res:express.Response) {
    if (parseInt(req.params.page) == 1) {
        res.render("signup.ejs", { f: func});
    }else if (parseInt(req.params.page) == 2) {
        const labContent ="<label></label>";
        res.render("signup2.ejs", {labContent});
    }else if (parseInt(req.params.page) == 3) {
        const labContent ="<label></label>";
        res.render("signup3.ejs", {labContent});
    }else if (parseInt(req.params.page) == 4) {

        res.render("signup4.ejs");
    }
    else if (parseInt(req.params.page) == 5) {
        res.render("signup5.ejs");
    }
});

//추후 회원가입 페이지가 여러개 생기면 시멘틱링크로 page 1,2,3 넣으면 차례로 접속가능하게 할듯
//꼭꼭 회원가입 관련 element들은 name, id모두 만들고 같은 값으로 넣어두기

router.post("/signup/email-send", function(req:express.Request,res:express.Response){
    user
        .findOne({ ID: req.body.userid })
        .then(async(result) => {
            if (result != null) {
                res.send("<script>alert('이미 가입된 아이디입니다.');history.back();</script>");
                
                //여기에 중복이다고 label값 바꾸는 함수 들어가야함
            }
            else {
                res.send("<script>alert('전송되었습니다.');history.back();</script>");
                
                func.emailAuth(req);
                //여기에 이메일 코드 인증 부분이 visible되게 하는 코드 필요
            }
    })
        .catch((e) => { console.log(e); });
});
router.post("/signup/email-check", async function(req:express.Request,res:express.Response){if(await func.check_email(req)==true){
    res.send("<script>alert('인증되었습니다.');history.back();</script>");
}else{res.send("<script>alert('인증번호가 일치하지 않습니다.');history.back();</script>");}});

router.post("/signup/password-save", function (req:express.Request,res:express.Response) {
    console.log(req.body);
    req.session.temporaryPassword = req.body.userPwd;
    req.session.save(err => {
        if (err) console.log(err);
      });
    console.log(req.session.temporaryPassword);
});

router.post('/signup/password-done', function (req:express.Request,res:express.Response){
    //if(req.session.temporaryPassword == req.userPwd){
        if(req.session.temporaryPassword == req.body.userPwd){
            if(req.session.isSigning?.condition==undefined){
            req.session.isSigning={condition:[true]};}
            else if((req.session.isSigning.condition).length==1){
                req.session.isSigning.condition[1]=true;
            }
            req.session.save(err => {
                if (err) console.log(err);
            });
        }
//}
});
//-페이지별 submit 때 검사-//
router.post("/signup/page/:page", function (req:express.Request,res:express.Response){
    const nowpage = parseInt(req.params.page);
    if (nowpage == 1) {
        console.log(req.session.isSigning?.condition);
        if (req.session.isSigning?.condition != undefined) {
            if(req.session.isSigning.condition.length == 2){
                console.log(req.session.temporaryPassword);
            req.session.isSigning.data = new user({
                ID: req.session.temporaryEmail!.email,
                nickname: req.body.usernick,
                password: sha(req.session!.temporaryPassword!),
                exc_history: 0,
                height: 0,
                weight: 0,
                address: "",
                POINT: 0,
                profile: ""
            });
            delete req.session.temporaryEmail;
            delete req.session.temporaryPassword;
            req.session.save(err => {
                if (err) console.log(err);
            });
            res.redirect("/signup/2");
        }
        }
    }
    else if (nowpage == 2) {
        if(req.body.purposeList!=undefined){
            console.log(req.body.purposeList);
            //Array.from(req.body.o1)
            req.session.isSigning!.data!.exc_purpose = req.body.purposeList;
            console.log(req.session.isSigning!.data);
            req.session.save(err => {
                if (err) console.log(err);
            });
            res.redirect("/signup/3");
        }else{
            console.log('l');
            const labContent ='<label style="color: red;">1개 이상 선택해주세요.</label>';
            res.render('signup2.ejs',{labContent});
        }
       
    }
    else if (nowpage == 3) {
        //운동경력
        if(req.body.exTime!=undefined){
            console.log(req.body.exTime);
            req.session.isSigning!.data!.exc_history = Number(req.body.exTime);
            console.log(req.session.isSigning!.data);
            res.redirect("/signup/4");
        }else{
            console.log('l');
            const labContent ='<label style="color: red;">항목을 선택해주세요.</label>';
            res.render('signup3.ejs',{labContent});
        }
    }
    else if (nowpage == 4) {
        console.log(req.body);
        if(req.body.postcode!=undefined){
            req.session.isSigning!.data!.address = `${req.body.postcode}+${req.body.roadAddress}+${req.body.jibunAddress}+${req.body.detailAddress}+${req.body.extraAddress}`;
            console.log(req.session.isSigning!.data);
            res.redirect("/signup/5");
        }

    }else if(nowpage==5){
        console.log(req.body.getme.value);
        if(req.body.getme!=undefined){
            req.session.isSigning!.data!.profile = req.body.getme;
            console.log(req.session.isSigning!.data);
        }
        const final = new user(req.session.isSigning!.data);
        final.save()
        .then((clear) => {
            // If everything goes as planed
            //use the retured user document for something
            delete req.session.isSigning;
            res.redirect("/login");
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
    
        });
    }
});

router.post('/up', upload.single('profile'), (req,res)=>{
    console.log(req.file!.filename);
    //req.session.imgPath = req.file.path;
    res.send({src: req.file!.path});
});

router.post('/img-record', upload.array("photos", 4), (req,res)=>{
    console.log(req.file!.filename);
    res.send({src: req.file!.path});
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
router.get("/signup/finish", async function(req:express.Request,res:express.Response){
    if (func.check_all(req.session)==true){
        const newbie = new user(req.session.isSigning!.data);
        newbie.save();
        req.session.isSigning!.condition=new Array<boolean>;
        req.session.isSigning!.data = {} as IUser;
        }
    res.redirect("/"); //홈, 또는 로그인화면으로 복귀. 회원가입후 바로 그 계정으로 로그인할 것이 아니라면 따로 조치 필요
    });



export default router;