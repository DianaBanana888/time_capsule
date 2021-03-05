const Router = require("express");
const controller = require("../controllers/noteController");
const router = Router();

router.post("/save", controller.save);
router.post("/upload", controller.upload);

module.exports = router;
