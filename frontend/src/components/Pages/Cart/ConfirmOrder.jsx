import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import CheckOutSteps from './CheckOutSteps'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../layout/MetaData'


const ConfirmOrder = () => {
    const navigate = useNavigate();

    const {cartItems , shippingInfo} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user);

    const subTotal = cartItems.reduce((acc , item) => acc + item.quantity * item.price,0);
    const shippingCharges = subTotal > 1000 ? 0 : 200;
    const tax = subTotal * 0.18;
    const totalPrice = subTotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`

    const proceedToPaymentHandler = () => {
        const data = {
            subTotal , 
            shippingCharges,
            tax,
            totalPrice,
        }
        sessionStorage.setItem("orderInfo" , JSON.stringify(data));
        navigate('/process/payment');
    }

    return (
        <Fragment>
            <MetaData title = "Confrim Order" />
            <CheckOutSteps step = {1} />
            <div className='flex justify-center'>
            <div className='p-8'>
                <h1 className='text-[2rem] text-center font-bold'>SHIPPING INFO</h1>
                <div className='flex my-4'>
                    <p>Name:</p> 
                    <span>{user?.name}</span>
                </div>
                <div className='flex my-4'>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                </div>
                <div className='flex my-4'>
                    <p>Address:</p>
                    <span>{address}</span>
                </div>
                <div>
                    <h3>Your Cart Items: </h3>
                    {cartItems.map((item) => {
                        return(
                            <div key={item.product} className='flex my-4'>
                                <Link to={`/product/${item.product}`}></Link>{" "}
                                <span>{item.quantity} X {item.price} = {" "}
                                <b>Rs.{item.quantity * item.price}</b>
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3>Order Summary</h3>
                    <div className='flex my-4'>
                        <p>Subtotal:</p>
                        <span>Rs.{subTotal}</span>
                    </div>
                    <div className='flex my-4'>
                        <p>Shipping Charges:</p>
                        <span>Rs.{shippingCharges}</span>
                    </div>
                    <div className='flex my-4'>
                        <p>GST:</p>
                        <span>Rs.{tax}</span>
                    </div>
                </div>
                <div>
                <div className='flex my-4'>
                        <p>Total:</p>
                        <span>Rs.{totalPrice}</span>
                    </div>
                </div>
                <button className='p-4 bg-[#F85903] text-white rounded-xl' onClick={proceedToPaymentHandler}>Proceed To Payment</button>
            </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder