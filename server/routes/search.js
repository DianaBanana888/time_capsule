const Router = require("express");
const controller = require("../controllers/searchController");
const router = Router();

router.post('/send-now', controller.search);

module.exports = router;
