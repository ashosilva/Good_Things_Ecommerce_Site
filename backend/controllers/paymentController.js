const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    // Get the amount from the front end
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret  // pass the client key from the backend to the front end as a response
    })
})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})