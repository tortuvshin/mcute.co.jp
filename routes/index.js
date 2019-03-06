const express = require('express')
const	router = express.Router()
const	middleware = require("../middleware/")
const homeController = require("../app/home.controller")

router.get("/", function(req, res){
    res.send("The backend of MCute matching system API is running :)");
});

router.post("/register", middleware.chkUserExist, homeController.register);

router.post('/login', homeController.login);

router.get("/authenticate", middleware.jwt, function(req, res){
   res.status(200).json({currentUser: req.user});
});

router.post('/forgot', homeController.forgotPassword);

router.get('/reset/:token', homeController.resetGet);

router.post('/reset/:token', homeController.resetPost);

module.exports = router;