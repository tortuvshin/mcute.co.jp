const express = require('express'),
	router = express.Router(),
	middleware = require("../middleware/"),
    chat = require("../app/chat.controller");
	
router.post("/", middleware.jwt, chat.indexPost);

router.get("/conversation/messages", chat.conversationMessages);

router.get("/", middleware.jwt, chat.indexGet);

router.get("/user/:username", middleware.jwt, chat.user);

module.exports = router;