const Router = require("express");
const controller = require("../controllers/singleNoteActionController");
const router = Router();

router.post("/changeMind", controller.changeMind);
router.post("/delete", controller.delete);
router.post("/upd", controller.upd);


module.exports = router;
