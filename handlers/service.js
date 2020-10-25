var server = require("../server");

var multer = require('multer');
var path = require("path");

var find = (req, res, next) =>{
    if(req.session.fname){
        res.render("find", {name: req.session.fname, avatar: req.session.avatar});
    
        const directoryName = req.query.directory;
        const allowedDirectories = ["home", "usr", "tmp", "snap"];

        console.log("Find called");
        
        var socketIO = require("socket.io")(server.server);
        socketIO.on("connection", (socket)=>{
            console.log("[I]: New connection established.");
            socket.on("root", ()=>{
                console.log("[I]: Event Received.");
                console.log(directoryName);
                if(!req.query.directory){
                   socket.emit("Result", "Please try a directory in the search section from the following: home, usr, tmp or snap.");
                }
                else if(!(allowedDirectories.indexOf(directoryName) >= 0)) {
                    socket.emit("Result", "Error: Directory doesn\'t exist or not allowed. Please try a directory from the following: home, usr, tmp or snap.");
                }else{
                    var exec = require("child_process").exec;

                    exec("find /"+directoryName, { timeout: 10000, maxBuffer: 20*1024*1024 }, function (error, stdout, stderr) {
                    if(error){
                        console.log(error);
                    }
                        socket.emit("Result", stdout);
                    });

                }

            });

        });

    }else{
        res.redirect("/auth/login");
    }
    

};

var users, db;
var mongoClient = require("mongodb").MongoClient;
mongoClient.connect('mongodb://localhost/', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if(err){
		throw err;
	}
	db = client.db("users");
	users = db.collection("auth");

});


function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype){
       return cb(null,true);
    
    } else {
        cb('Error: Images Only!');
  }
}


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    },
	filename: (req, file, cb) => {
        const fname = file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1];
        users.findOne({email: req.session.email}, function(err, user){
        if(user){
            req.session.avatar = "/uploads/" + fname;
            users.updateOne(  { _id: user._id} , { $set: { avatar : "/uploads/" + fname  } });
        }
	   }); 
        cb(null, fname);
    }
                                 
});


var upload = multer({
	storage: storage
}).single("avatar");



module.exports = {
	find,
	upload
};