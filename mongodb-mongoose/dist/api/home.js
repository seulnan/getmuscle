import express from 'express';
const router = express.Router();
router.get("/", function (req, res) {
    if (req.session.user) {
        res.render('server.ejs', { user: req.session.user });
    }
    else {
        res.redirect('/login');
    }
});
export default router;
