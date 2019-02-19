var mongoose = require('mongoose'),
	passwordLocalMongoose = require("passport-local-mongoose"),
	bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
	type: String,
	firstName: String,
	lastName: String,
	country: String,
	email: String,
	username: String,
	password: String,
	signUpDate: Date,
	balance: { type: Number, default: 0 },
	transaction: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Transaction",
	  },
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project"
		}
	],
	resetPasswordToken: String,
  resetPasswordExpires: Date,
  avatar: {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number 
   },
  isVerify: {
  		type: Boolean,
  		default: false
  },
  isBan: {
  		type: Boolean,
  		default: false
  },
  rating: {type: Number, default: 0},
  tickets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Ticket"
		}  	
  ],
  profile: String
});

UserSchema.plugin(passwordLocalMongoose);

UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) {
  	return next();
  }
  
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
    	console.log(err);
    }else {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	      if (err) {
	          return next(err);
	      }else {
		      user.password = hash;
		      next();
	      }
	    });
    }
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);