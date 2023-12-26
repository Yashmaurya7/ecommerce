import React, { Fragment, useEffect, useRef , useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import axios from 'axios'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../../actions/orderAction'

const ProcessPayment = () => {
    const alert = useAlert();
    const stripe = useStripe();
    const element = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.user);
    const {shippingInfo , cartItems} = useSelector((state) => state.cart);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    
    const payBtn = useRef(null);

    const newArr = [];

    cartItems.forEach((item , index) => {
        const {stock , ...rest} = item;
        newArr.push(rest);
    })


    const order = {
        shippingInfo ,
        orderItems: newArr,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const {data} = await axios.post("/api/v1/payment/process", paymentData , config);
            const client_secret = data.client_secret;
            console.log(`Client Secret: ${client_secret}`);

            if(!stripe || !element) return;

            const result = await stripe.confirmCardPayment(client_secret , {
                payment_method: {
                    card: element.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            });
            console.log(result);

            if(result.error){
                payBtn.current.disabled = false;
                alert.success("errdcdscsd");
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    console.log(order);
                    dispatch(createOrder(order));
                    navigate('/success');
                }else{
                    alert.success("There's been some issue during payment")
                }
            }

            
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error("hi");
            console.log(error.response);
        }

    }

    return (
            <Fragment>
                <MetaData title="Payment" />
                <CheckOutSteps step={2} />
                <div>
                    <form onSubmit={submitHandler}>
                        <h2>Card Info</h2>
                        <div>
                            <CardNumberElement />
                        </div>
                        <div>
                            <CardExpiryElement />
                        </div>
                        <div>
                            <CardCvcElement />
                        </div>
                        {/* <PaymentElement/> */}
                        <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} />
                    </form>
                </div>
            </Fragment>
    )
}

export default ProcessPayment






// "<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="utf-8">
// <title>Error</title>
// </head>
// <body>
// <pre>Cannot POST /process/api/v1/payment/process</pre>
// </body>
// </html>
// "