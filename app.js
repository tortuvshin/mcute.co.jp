var express = require('express'),
  	app = express(),
  	http = require('http').Server(app),
  	bodyParser = require('body-parser'),
  	mongoose = require('mongoose'),
  	passport = require('passport'),
  	io = require('./sockets/').initialize(http),
  	methodOverride = require('method-override'),
    seedDB = require("./seeds"),
    path = require("path"),
    morgan         = require('morgan'),
    cors   = require('cors'),
    history = require('connect-history-api-fallback'),
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
// mongoose.connect("mongodb://turtuvshin:turtuvshin9@ds217125.mlab.com:17125/work-flow");
mongoose.connect("mongodb://localhost:27017/workflow");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('combined'));
app.use(cors())
app.use(history());
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.set('view engine', 'html');

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

http.listen(process.env.PORT || '5000', process.env.IP || 'localhost', function(){
	console.log("Matching System is RUNNING");
});
