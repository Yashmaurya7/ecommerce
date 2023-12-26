import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import { useAlert } from 'react-alert'

const OrderDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { order, loading, error } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [alert, error, dispatch, id]);

    return (
        <Fragment>
            <MetaData title={`Order Details`} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className='p-12'>
                    <div>
                        <h1 className='m-4'>Price Section</h1>
                        <p className='m-4'>Item: {order.itemsPrice}</p>
                        <p className='m-4'>Tax: {order.taxPrice}</p>
                        <p className='m-4'>Shipping: {order.shippingPrice}</p>
                        <p className='m-4'>Total: {order.totalPrice}</p>
                    </div>
                    <div>
                        <h1 className='m-4'>Shipping Info</h1>
                        <p className='m-4'>Address: {order.shippingInfo?.address}</p>
                        <p className='m-4'>City: {order.shippingInfo?.city}</p>
                        <p className='m-4'>State: {order.shippingInfo?.state}</p>
                        <p className='m-4'>Country: {order.shippingInfo?.country}</p>
                        <p className='m-4'>Pin Code: {order.shippingInfo?.pinCode}</p>
                        <p className='m-4'>Phone Number: {order.shippingInfo?.phoneNumber}</p>
                    </div>
                    <div>
                        <h1 className='m-4'>order Details</h1>
                        {/* {order.} */}
                    </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetails