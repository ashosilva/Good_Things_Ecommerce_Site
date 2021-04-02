const Product = require('../models/products')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

// Create new product =>  / api/v1/admin/product/
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    
    req.body.user = req.user.id

    // Get the req.body and save it as product
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products/new?keyword=apple
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    // define how many products are shown per page
    const resultsPerPage = 4
    // Keeps the total number of products in the database
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage)

    // Gets all the products in the collection
    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
})

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product => /api/v1/admin/product/:id
exports.updateProduct =catchAsyncErrors ( async(req, res, next) => {

    // find product
    let product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async(req, res, next) => {

    // find product
    const product = await Product.findById(req.params.id)

    // If the product doesn't exist send 404 error message
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message: 'Product is deleted.'
    })
})

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors (async(req, res, next) => {
    const {rating, comment, productId} = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    // Check if the user already left a review
    const isReviewed = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
       // Need to update the review is the user already left a review 
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment.body
                review.rating = rating
            }
        })
    }
    else {
        // push the review and update the number of reviews
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    // calculate the overall rating
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success: true
    })

})

// Get product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id)

    res.status(200).json({
    success: true,
    reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})