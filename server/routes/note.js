const Router = require("express");
const UserModel = require("../models/user.model");
const controller = require("../controllers/noteController");
const router = Router();

router.post("/save", controller.save);

module.exports = router;
