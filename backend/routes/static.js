var express = require("express");
var router = express.Router();

router.get("/", (req, res) =>{
	res.render("index");
});

router.get("/profile", (req, res) =>{
    if(req.session.fname){
        res.render("profile", {name: req.session.fname, avatar: req.session.avatar});
    }else{
        res.redirect("/auth/login");
    }
	
});

module.exports = router;