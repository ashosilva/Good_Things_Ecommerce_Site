const crypto = require('crypto')

const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    // destructure name email and password 
    const { name, email, password} = req.body

    const user = await User.create({
        name, 
        email, 
        password,
        avatar: {
            public_id: 'bear/12345',
            url: 'https://placebear.com/300/300'
        }
    })

    sendToken(user, 200, res)
})

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password} = req.body

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    // Find user in the database by the email address
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // check if the password is correct or not
    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // assign token
    sendToken(user, 200, res)

})

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    // Get the email address
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found with this email address', 404))
    }

    // Get reset token if user does exist
    const resetToken = user.getResetPasswordToken()

    // save it to the user
    await user.save({validateBeforeSave: false})

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password token is: \n\n${resetUrl}\n\nIf you have not requested this,
    email, then you may ignore this.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Good Things Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})
        return next(new ErrorHandler(error.message, 500))
    }
})

// Logout user => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) => {

    // Delete the cookie
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {

    // Hash url token to check if it is correct
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    // Find the user with the resetPasswordToken and make sure that the token is not expired
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    console.log(resetPasswordToken)


    if(!user){
        return next(new ErrorHandler('Password token is invalid or expired'), 400)
    }

    // check if the password matches the confirm password
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'), 400)
    }

    // Setup new password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    
    await user.save()

    sendToken(user, 200, res)
})

// Get user that is currently logged in => api/v1/me
exports.getUserProfile = catchAsyncErrors(async(req, res, next) => {
    // get user id
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})
