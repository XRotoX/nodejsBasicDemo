var bodyParser = require('body-parser');
var express = require("express");
var router = express.Router();

var authHandler = require("../handlers/auth");
var serviceHandler = require("../handlers/service");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*
router.get("/", (req, res) =>{
	if(req.session.email){
		res.render("upload.html");
	}else{
		res.redirect("/auth/login");
	}
});
*/



router.get("/register", (req, res) =>{
	if(req.session.fname){
		res.redirect("/profile");
	}else{
		res.render("register");
	}
	
});

router.post("/register", urlencodedParser, authHandler.register);


router.get("/login", (req, res) =>{
	if(req.session.fname){
		res.redirect("/profile");
	}else{
		res.render("login");
	}
});

router.post("/login", urlencodedParser, authHandler.login);

router.get("/logout", (req, res) =>{
	req.session.destroy(function(err){
		if(err){
			res.negotiate(err);
		}
		res.redirect("/auth/login");
	});
});



module.exports = router;