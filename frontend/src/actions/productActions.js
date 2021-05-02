import axios from 'axios'

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

// Get products from backend
export const getProducts = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {
        // Set the loading to true and products to empty array
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }

        // send the request to the backend
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    }
    // If it fails, set the payload to the error and send it to ALL_PRODUCTS_FAIL
    catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    }
    // If it fails, set the payload to the error and send it to ALL_PRODUCTS_FAIL
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}