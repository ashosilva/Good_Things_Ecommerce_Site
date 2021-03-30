const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebToken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot be longer than 30 characters']
    },
    email: {
        type: String,
        required:[true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            reqiored: true
        },
        url :{
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    //checks if the password is modified
    if(!this.isModified('password')){
        next()
    }

    // hash and salt the password
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwToken = function () {
    // stores the user id as the payload for the token
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {

    // Generate a random 20 bytes hex string
    const resetToken = crypto.randomBytes(20).toString('hex')

    // hash the token and set it to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log(this.resetPasswordToken)

    // Set token expire time to 30 minutes
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User', userSchema)