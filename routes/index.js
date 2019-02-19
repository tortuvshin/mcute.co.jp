var express = require('express'),
  	app = express(),
  	router = express.Router(),
  	User = require("../models/user"),
  	Transaction = require("../models/transaction"),
  	passport = require("passport"),
  	middleware = require("../middleware/"),
  	crypto = require("crypto"),
  	async = require("async"),
  	nodemailer = require("nodemailer"),
  	sgTransport = require('nodemailer-sendgrid-transport'),
  	jwt = require('jsonwebtoken'),
  	bcrypt = require("bcrypt"),
  	jwtOptions = require("../jwtOptions");

router.get("/", function(req, res){
    res.send("The backend of freelance matching system is running :)");
});

router.post("/register", middleware.chkUserExist, function(req, res){
    req.body.signUpDate = new Date();
	  var user = new User(req.body);
	
  	user.save(function(err, user) {
  			Transaction.create({}, function(err, transaction){
  			      user.transaction = transaction;
  			      user.save(function(err, user){
    			       var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + 21600, id: user._id}, jwtOptions.secretOrKey);
              	 return res.status(200).json({success: true, token: token, currentUser: user, message: 'Welcome back, ' + user.firstName + ' ' + user.lastName});
  			      });
  			});
    });
});

// ===================================
// LOGIN ROUTE
// ===================================
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
   
    User.findOne({username: username}, function(err, user){
        if(!user){
          return res.status(400).json({success: false, message:"No such user found"});
        } else if (user.isBan){
          return res.status(400).json({success: false, message:"Your account has banned. Please contact us for further information."});
        }
        user.comparePassword(password, function(err, isMatch){
          if(isMatch === true) {
              var payload = {id: user.id};
              // The token will be expried after 1 hour
              var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + 21600, id: payload.id}, jwtOptions.secretOrKey);
              return res.status(200).json({success: true, token: token, currentUser: user, message: 'Welcome back, ' + user.firstName + ' ' + user.lastName});
          } 
          res.status(400).json({success: false, message:"Password does not match."});
        });
    })
});

router.get("/authenticate", middleware.jwt, function(req, res){
   res.status(200).json({currentUser: req.user});
});

// ===================================
// FORGOT PASSWORD ROUTE
// ===================================
var options = {
  auth: {
    api_key: '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'
  }
}
var client = nodemailer.createTransport(sgTransport(options));

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res.json({result: 'error', message: 'No account with that email address exists.'});
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var mailOptions = {
        to: user.email,
        from: 'no-reply@ec-job.com',
        subject: 'EC-Job Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      client.sendMail(mailOptions, function(err, info){
	    if (err){
	      console.log(err);
	    }
	    else {
	      return res.json({result: 'success', message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
	    }
	  });
    }
  ]);
});

// ===================================
// RESET PASSWORD ROUTE
// ===================================

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.render('forgot', {error: 'Password reset token is invalid or has expired.'});
    }
    res.render('reset', {
      resetPasswordToken: user.resetPasswordToken
    });
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.json({result: 'error', message: 'Password reset token is invalid or has expired.'});
        }
		
        user.password = req.body.password;
        console.log(user.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        user.save(function(err) {
          req.logIn(user, function(err) {
          	req.logout();	
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var mailOptions = {
        to: user.email,
        from: 'no-reply@ec-job.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      client.sendMail(mailOptions, function(err){
	    done(err);
	  });
    }
  ], function(err){
  	if(err){
  		console.log(err);
  	}else{
	  	return res.json({
	  			result: "success",
	  			message: "Your password has been changed."
	  	});
  	}
  });
});

module.exports = router;