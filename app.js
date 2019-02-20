var express = require('express'),
  	app = express(),
  	http = require('http').Server(app),
  	bodyParser = require('body-parser'),
  	mongoose = require('mongoose'),
  	passport = require('passport'),
  	io = require('./sockets/').initialize(http),
  	methodOverride = require('method-override'),
  	seedDB = require("./seeds"),
  	cron = require("./cron");
	
var indexRoutes = require("./routes/index"),
		dashboardRoutes = require("./routes/dashboard"),
   	projectRoutes = require("./routes/project"),
   	adminRoutes = require("./routes/admin"),
   	supportRoutes = require("./routes/support"),
   	profileRoutes = require("./routes/profile"),
   	chatRoutes = require("./routes/chat");

var User = require('./models/user');

mongoose.Promise = global.Promise;  
mongoose.connect("mongodb://intelligo:IntelligoAdmin9@workflow-shard-00-00-yfem4.mongodb.net:27017,workflow-shard-00-01-yfem4.mongodb.net:27017,workflow-shard-00-02-yfem4.mongodb.net:27017/test?ssl=true&replicaSet=workflow-shard-0&authSource=admin&retryWrites=true");
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:8000','http://localhost:8081', 'http://localhost:8001','http://127.0.0.1:8020', 'http://ec-job.com', 'http://localhost:8080', 'http://ec-job.com.s3-website-ap-northeast-1.amazonaws.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/project", projectRoutes);
app.use("/support", supportRoutes);
app.use("/profile", profileRoutes);
app.use("/chat", chatRoutes);

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = require('./jwtOptions');

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findById(jwt_payload.id, function(err, user){
     if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
  });
});

passport.use(strategy);

http.listen(process.env.PORT, process.env.IP, function(){
	console.log("Freelance Matching System is RUNNING");
});

