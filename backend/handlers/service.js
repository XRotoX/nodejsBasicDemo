var server = require("../server");

var multer = require('multer');
var path = require("path");

var find = (req, res, next) =>{
	res.render("find.html");
    
    const directoryName = req.query.directory.toLowerCase();
    const allowedDirectories = ["home", "usr", "tmp", "snap"];
    
    
    
	var socketIO = require("socket.io")(server.server);
	socketIO.on("connection", (socket)=>{
		console.log("[I] New connection established.");
		socket.on("root", ()=>{
			console.log("[I] Event Received.");
            
            if(!(allowedDirectories.indexOf(directoryName) >= 0)) {
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

};


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.png');
	}
});

var upload = multer({
	storage: storage,
	limits:{
		fileSize: 1024*1024*2
	}
});



module.exports = {
	find,
	upload
};