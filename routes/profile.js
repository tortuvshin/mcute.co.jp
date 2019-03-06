const express = require('express')
const router = express.Router()
const middleware = require("../middleware/index")
const profile = require('../app/profile.controller')
	
router.get("/review", profile.review);

router.get("/:username", profile.viewProfile);

router.put("/:username", middleware.jwt, profile.updateProfile);

module.exports = router;