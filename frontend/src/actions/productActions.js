import axios from 'axios'

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'


// Get products from backend
export const getProducts = () => async (dispatch) => {
    try {
        // Set the loading to true and products to empty array
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        // send the request to the backend
        const { data } = await axios.get(`/api/v1/products`)

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