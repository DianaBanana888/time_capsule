const Router = require('express')

const passport = require('passport');
const controller = require('../controllers/authController')
const router = Router()

router.post('/registration', passport.authenticate('local'), controller.registration)
router.post('/login', passport.authenticate('local'), controller.login)
router.post('/signout', controller.signout)
router.post('/essential', controller.essential)


module.exports = router

