var http = require("http");
var url = require("url");
var querystring = require('querystring');
var express = require("express");
var session = require('express-session');



var authRoute = require("./routes/auth");
var staticRoute = require("./routes/static");
var serviceRoute = require("./routes/service");


var app = express();
var server = http.createServer(app);



//app.engine('ejs', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(session({secret: 'Rk0ktRzZyhfHERPmN0jqK1BXnU1isXi41rYoR1q703MwVcA0dLLNz1laxvkplO8KcN1qOQSHqu9f1rGz', resave: true, saveUninitialized: true}));







app.use("/uploads", express.static("uploads"));

app.use("/", staticRoute);
app.use("/auth", authRoute);
app.use("/service", serviceRoute);


//handle 404 request
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


//var upload = require("./handlers/service");
//
//app.get("/service/upload", (req, res) =>{
//	res.render("upload.html");
//});
//
//
//app.post('/service/uploads', upload.upload.single("avatar"), function(req,res){
//   res.end('uploaded');
//});





//connect to mongodb

function start(){
	const port = process.env.PORT || 8888;
	server.listen(port);
}

exports.start = start;
exports.server = server;	






