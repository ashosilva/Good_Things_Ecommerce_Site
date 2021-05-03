import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'


export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        //if login action is initiated it will load up the page
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        
        //if credentials inputed are valid it sets to the user
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        
        //if credentials inputed are false no user allowed access and error will be displayed
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default: return state
    }
}