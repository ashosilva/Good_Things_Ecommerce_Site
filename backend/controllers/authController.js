const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')

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