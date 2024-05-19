const router = require('express').Router();
const user = require('../schemas/user.cjs');
const smtpTransport = require('../config/email.cjs');
const functions = require('../functions/total.cjs');

const sha = require('sha256');

router.get('/login', function (req, res){
    console.log(req.session);
    if(req.session.user){
        console.log('세션 유지');
        res.render('home.ejs', {user:req.session.user});
    }else{
        console.log('로그인 페이지');
        res.render('login');
    }
});

router.post('/login',function(req,res){
    console.log(`아이디 : ${req.body.userid}`);
    console.log(`비밀번호 : ${req.body.userpw}`);
    user
    .findOne({ID : req.body.userid})
    .then((result)=>{
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
    })
    .catch(()=>{
        res.redirect('/login');
    })
});

//logout
//-홈페이지에서 로그아웃-//
router.post("/", function (req, res){
    req.session.destroy();
    res.render('home.ejs', {user : null});
});

//-회원가입페이지로드-//
router.get("/signup/:page", function(req, res){ 
    if(req.params.page==1){
        res.render("signup.ejs");
    }
});

//추후 회원가입 페이지가 여러개 생기면 시멘틱링크로 page 1,2,3 넣으면 차례로 접속가능하게 할듯
//꼭꼭 회원가입 관련 element들은 name, id모두 만들고 같은 값으로 넣어두기

router.post("/email-send", functions.emailAuth(req));
router.post("/email-check", functions.check_email(req))
//-페이지별 submit 때 검사-//
router.post("/signup/:page", function (req,res){
    const nowpage = req.params.page;
    
    if(nowpage == 1){
        if(req.session.isSigning.condition[0] == true){
        req.session.isSigning.data = new user({
            ID: req.body.userid,
            nickname: req.body.usernick,
            password: sha(req.body.userpw),
            exc_history: 0,
            height: 0,
            weight: 0,
            address:"",
            POINT:0,
            profile:""
        });}

    }else if(nowpage == 2 && functions.check_purpose()==true){
        //운동목적
        req.session.isSigning.data.exc_purpose = req.body.purposeList;

    }else if(nowpage == 3 && functions.check_year()==true){
        //운동경력
        req.session.isSigning.data.exc_history = req.body.exc_history;

    }else if(nowpage==4 && functions.check_email()){
        //주소입력
        var url = location.href;
        var confmKey = 
        req.session.isSigning.data.address = req.body.address;
    }
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
router.get("/signup/finish", async function(req,res){
    if (functions.check_all(req.session)==true){
    await newbie.save();
    newbie = null;
    res.redirect("/"); //홈, 또는 로그인화면으로 복귀. 회원가입후 바로 그 계정으로 로그인할 것이 아니라면 따로 조치 필요
    }
});



module.exports = router;