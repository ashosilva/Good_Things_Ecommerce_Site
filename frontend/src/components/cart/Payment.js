import React, { Fragment, useEffect } from 'react'
import axios from 'axios'

import MetaData from '../layout/MetaData'
import CheckOutSteps from './CheckOutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        // if the card input is invalid change the color to red
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    useEffect(() => {

    }, [])

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

    // get the amount
    const paymentData = {
        //amount: Math.round(orderInfo.totalPrice * 100) // payment is in cents
        amount: Math.round(order.totalPrice * 100)
    }

    console.log(paymentData)

    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disable = true

        let res

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret

            if (!stripe || !elements) {
                return
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                alert.error(result.error.message)
                document.querySelector('#pay_btn').disable = false
            } else {
                // if payment is processed
                if (result.paymentIntent.status === 'succeeded') {
                    // TODO: new order 

                    history.push('/success')
                } else {
                    alert.error('Error processing payment')
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disable = false
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckOutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-3xl">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

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