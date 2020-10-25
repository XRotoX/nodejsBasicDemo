var bodyParser = require('body-parser');
var express = require("express");
var router = express.Router();

var serviceHandler = require("../handlers/service");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("", (req, res) =>{
	if(req.session.fname){
        res.render("profile", {name: req.session.fname, avatar: req.session.avatar});
    }else{
        res.redirect("/auth/login");
    }
});


router.get("/find", serviceHandler.find);

router.post("/upload", (req, res) => {
  serviceHandler.upload(req, res, (err) => {
    if(err){
      res.redirect('/profile');
    } else {
      if(req.file == undefined){
        res.redirect('/profile');
      } else {
        console.log("[I]: Uploading file...");
        res.redirect('/profile');
      }
    }
  });
});


module.exports = router;
