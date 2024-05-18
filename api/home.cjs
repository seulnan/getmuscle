const router = require('express').Router();

router.get("/", function (req, res){
    if(req.session.user){
        res.render('home.ejs', {user : req.session.user});
    }else{
        res.redirect('/login');
    }
});

module.exports = router;