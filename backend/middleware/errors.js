const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    // Passes the error status code or pass it 500 (internal server error) as a default
    err.statusCode = err.statusCode || 500
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.errMessage,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        // Create a cope of the error
        let error = {...err}
        error.message = err.message

        // Wrong MongoDB object ID Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handle MongoDB validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success:false,
            message: error.message || "Internal Server Error"
        })
    }


}