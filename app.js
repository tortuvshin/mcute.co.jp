const express = require('express')
const app = express()
const http = require('http').Server(app)
const	bodyParser = require('body-parser')
const	mongoose = require('mongoose')
const	passport = require('passport')
const	io = require('./sockets/').initialize(http)
const	methodOverride = require('method-override')
const path = require("path")
const morgan = require('morgan')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const cron = require("./config/cron")
	
const indexRoutes = require("./routes/index")
const dashboardRoutes = require("./routes/dashboard")
const projectRoutes = require("./routes/project")
const adminRoutes = require("./routes/admin")
const supportRoutes = require("./routes/support")
const profileRoutes = require("./routes/profile")
const chatRoutes = require("./routes/chat")

let User = require('./models/user')

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
    const allowedOrigins = ['http://localhost:5000', 'http://localhost:8000','http://localhost:8081', 'http://localhost:8001','http://127.0.0.1:8020', 'http://localhost:8080'];
    let origin = req.headers.origin;
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

let passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = require('./config/jwtOptions');

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
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
	console.log("MCUTE MATCHING SYSTEM IS RUNNING localhost:5000");
});
