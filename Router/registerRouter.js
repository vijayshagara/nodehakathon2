const express = require("express");
const router = express.Router();
const registerModule = require("../Modules/registerModule")

router.post("/signup",registerModule.singUp)
router.post("/signin",registerModule.singIn)

module.exports = router;
