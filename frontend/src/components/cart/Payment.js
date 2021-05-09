import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckOutSteps from './CheckOutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import { createOrder, clearErrors } from '../../actions/orderActions'

// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckOutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" /*onSubmit={submitHandler}*/ >
                        <h1 className="mb-4 text-3xl">Card Info</h1>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay{/* Pay {` - ${orderInfo && orderInfo.totalPrice}`} */}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
