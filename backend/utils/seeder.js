// Create a data seeder that will add the product.json

const dotenv = require('dotenv')
const Product = require('../models/products')
const connectDatabase = require('../config/database')

const products = require('../data/product.json')

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase()

const seedProducts = async () => {
    try {
        // Delete all products
        await Product.deleteMany()
        console.log("Products have been deleted")

        // Add all products in product.json
        await Product.insertMany(products)
        console.log("All products have been added")
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()