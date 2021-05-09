import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckOutSteps from './CheckOutSteps'

import { useSelector } from 'react-redux'


const Payment = ({ history}) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        history.push('/success')
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckOutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="flex justify-center mb-4 text-xl">Card Info Form goes here</h1>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
