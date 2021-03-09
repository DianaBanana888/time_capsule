const Router = require("express");
const UserModel = require("../models/user.model");
const controller = require("../controllers/noteController");
const router = Router();

router.post("/save", controller.save);
router.post("/upload", controller.upload);
router.post("/downdate", controller.downdate);

module.exports = router;
