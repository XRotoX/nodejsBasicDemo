var bcrypt = require("bcryptjs");

var users, db;

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect('mongodb://localhost/', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if(err){
		throw err;
	}
	console.log("[I]: MongoDB connected.");
	db = client.db("users");
	users = db.collection("auth");

});


var register = (req, res, next) =>{
	bcrypt.hash(req.body.psw, 10, function(err, hashedPass){
		if(err){
			res.json({
				error: err
			});
		}

		users.findOne({$or: [{email: req.body.email}, {uname: req.body.uname}]}, function(err, user){
		if(user){
			console.log("[E]: User already exists.");
		}
		else{
			var avatar= "/img/avatar.png";
            if(req.body.avatar){
                avatar = req.body.avatar;
            }
                
			const userData = {
            avatar: avatar,
            fname: req.body.fname,
			uname: req.body.uname,
			email: req.body.email,
			password: hashedPass
			};

			users.insertOne(userData, function(err, result){
				if(err) throw err;
				console.log("[I]: User successfully inserted.");
                
                req.session.avatar = userData.avatar;
                req.session.fname = userData.fname;
                req.session.uname = userData.uname;
                req.session.email = userData.email;
                
				res.redirect("/profile");
			});
		}
		});


	});
	
	
}

var login = (req, res, next) => {
	
	bcrypt.hash(req.body.psw, 10, function(err, hashedPass){
		if(err){
			res.json({
				error: err
			});
		}

		users.findOne({$or: [{email: req.body.login}, {uname: req.body.login}]}, function(err, user){

		if(user){
			
			bcrypt.compare(req.body.psw, user.password, function(err, result){
				if(err) throw err;
				if(result){
					console.log("[I]: Connected.");
                    console.log(user);
                    
					req.session.avatar = user.avatar;
                    req.session.fname = user.fname;
                    req.session.uname = user.uname;
                    req.session.email = user.email;
                                        
					res.redirect("/profile"); 
				} 
				else{
					console.log("[E]: Incorrect password.");
					res.redirect("/auth/login");
				}
				
			});
		}
		else{
            res.redirect("/auth/login");
			console.log("[E]: Login is not correct");
		}
		});

	});
	
};


module.exports = {
	register,
	login
};
