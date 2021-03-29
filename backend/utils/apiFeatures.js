class APIFeatures{
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    // Search for a keyword. If found assigns the product to the keyword.
    // If not then it returns an empty object
    // Uses regex to return partial objects. searching a would return apple, avocado etc..
    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i' // case not sensitive
            }
        } : {}

        this.query = this.query.find({...keyword})
        return this
    }


    // Filter an item based on keyword, category, price, ratings
    filter(){
        const queryCopy = {...this.queryString}

        // Remove fields from the queryCopy
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(ele => delete queryCopy[ele])

        // Advanced filter for price, ratings, etc

        // Convert queryCopy to a string
        let queryString = JSON.stringify(queryCopy)

        // Add a $ to the group for Mongo operators
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryString))
        return this
    }

    pagination(resultsPerPage){
        const currentPage = Number(this.queryString.page) || 1
        // Allows you to skip x pages to get to the current page.
        // i.e if you want to get to page 2, ignore the first 10 items and show 11-20
        const skip = resultsPerPage * (currentPage - 1)

        // limit the amount of documents
        this.query = this.query.limit(resultsPerPage).skip(skip)
        return this
    }
}

module.exports = APIFeatures