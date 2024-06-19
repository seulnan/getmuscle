import express from 'express';

const router = express.Router();

router.get("/", function (req:express.Request,res:express.Response){
    if(req.session.user){
        res.render('home.ejs', {user : req.session.user});
    }else{
        res.redirect('/login');
    }
});

export default router;