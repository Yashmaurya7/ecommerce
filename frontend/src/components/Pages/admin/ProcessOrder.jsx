import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { updateOrder, getOrderDetails, clearErrors } from '../../../actions/orderAction'
import Sidebar from './Sidebar'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Loader from '../../layout/Loader/Loader'
import { UPDATE_ORDER_RSEST } from '../../../constants/orderConstants'



const ProcessOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    const { orderId } = useParams();
    console.log(orderId);

    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const { shippingInfo, orderItems, orderStatus, paymentInfo } = order;

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(orderId, myForm));
    }



    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RSEST });
            navigate('/admin/orders');
        }

        dispatch(getOrderDetails(orderId));

    }, [dispatch, error, orderId, alert, isUpdated, updateError, navigate]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            {/* <CheckOutSteps step = {1} /> */}
            <div className='flex justify-center'>
                <Sidebar />
                {loading === true ? <Loader /> :

                    <div className='p-8'>
                        <h1 className='text-[2rem] text-center font-bold'>SHIPPING INFO</h1>
                        <div className='flex my-4'>
                            <p>Name:</p>
                            <span>{order && order.user && order.user.name}</span>
                        </div>
                        <div className='flex my-4'>
                            <p>Phone:</p>
                            <span>{shippingInfo && shippingInfo.phoneNumber}</span>
                        </div>
                        <div className='flex my-4'>
                            <p>Address:</p>
                            <span>{shippingInfo && ` ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`}</span>
                        </div>
                        <div>
                            <h3>Your Cart Items: </h3>
                            {orderItems && orderItems.map((item) => {
                                return (
                                    <div key={item.product} className='flex my-4'>
                                        <p>{item.name }&nbsp;</p>
                                        <Link to={`/product/${item.product}`}></Link>{" "}
                                        <span>{item.quantity} X {item.price} = {" "}
                                            <b>Rs.{item.quantity * item.price}</b>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <p className=' text-4xl'>Payment Info</p>
                            <div className='flex my-4'>
                                <span>{paymentInfo && paymentInfo.status}</span>
                            </div>
                            <div className='flex my-4'>
                                <p>Amount:</p>
                                <span>{order && order.totalPrice}</span>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={updateOrderSubmitHandler}>
                                <select onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Choose Status</option>
                                    {order.orderStatus === "Processing" &&
                                        <option value="Shipped">Shipped</option>
                                    }
                                    {order.orderStatus === "Shipped" &&
                                        <option value="Delivered">Delivered</option>
                                    }
                                </select>
                                <button disabled={loading ? true : false || status === "" ? true : false} className='bg-[#F85903] p-4 mt-8 text-white rounded-xl'>Process</button>
                            </form>
                        </div>
                        <div>
                            <div><p className=' text-4xl'>Order Status</p></div>
                            <p className={orderStatus && orderStatus === "Delivered" ? "text-[green]" : "text-[red]"}>{orderStatus && orderStatus}</p>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default ProcessOrder;