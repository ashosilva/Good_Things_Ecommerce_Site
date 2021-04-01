const express = require('express')
const router = express.Router()

const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword,
    getUserProfile,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    updatePassword } = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

router.route('/login').post(loginUser)
router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/me/update').get(isAuthenticatedUser, updateProfile)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/register').post(registerUser)


module.exports = router