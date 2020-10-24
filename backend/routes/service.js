var bodyParser = require('body-parser');
var express = require("express");
var router = express.Router();

var serviceHandler = require("../handlers/service");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) =>{
	res.render("index.html");
});

router.get("/find", serviceHandler.find);

router.get("/upload", (req, res) =>{
	res.render("upload.html");
});


router.post("/upload", serviceHandler.upload.single("avatar"), (req, res)=>{
	console.log("[I]: Uploading file...");
	res.render("index.html");
});


module.exports = router;
