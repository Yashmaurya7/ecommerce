import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import CartCard from "./CartCard.jsx"
import { removeItemsFromCart } from '../../../actions/cartAction.js'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    let grossTotal = 0;

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    return (
        <Fragment>
            {cartItems.length === 0 ? <p>No Items Found</p> :
                <Fragment>
                    <div className=''>
                        {cartItems.map((item) => {
                            grossTotal += item.price * item.quantity;
                            return <CartCard key={item.product} product={item} deleteCartItems={deleteCartItems} />
                        })}
                    </div>
                    <div>
                        <p className=' text-right mr-60 mb-4 underline underline-offset-[-2rem]'>Gross Total: {grossTotal}</p>
                    </div>
                    <button 
                    className='ml-[73vw] mb-4 bg-[#F85903] text-white rounded-full py-4 px-8'
                    onClick={checkOutHandler}
                    >Check Out</button>
                </Fragment>
            }
        </Fragment>
    )
}

export default Cart