const express =require('express')
const router =express.Router()
const {loginUser, signupUser, getSingleUser,}=require('../controllers/UserController')
const {reset}=require('../controllers/ResetPasswordController')
const {forgotPassword}=require('../controllers/ForgotPasswordController')

    forgotPassword
// CREATE users

router.post('/login', loginUser)
//GET all users
router.post('/signup', signupUser)
router.get('/SingelUser/:id', getSingleUser)


router.post('/forgotPassword', forgotPassword)
router.put('/reset/:id', reset)



module.exports = router
