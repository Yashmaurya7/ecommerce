import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../../actions/cartAction';

const CartCard = ({ product, deleteCartItems }) => {

    const dispatch = useDispatch()
    const totalValue = product.quantity * product.price;

    const removeHandler = () => {

    }

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock < newQty) return;
        else {
            dispatch(addItemsToCart(id, newQty))
        }
    }
    const decreaseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        else {
            dispatch(addItemsToCart(id, newQty))
        }
    }

    return (
        <Fragment>
            <div className='flex justify-evenly my-8'>
                <div className=''>
                    <h1>{product.name}</h1>
                    <h1>Price: {product.price}</h1>
                    <button className='text-[#F85902]' onClick={() => deleteCartItems(product.product)}>Remove</button>
                </div>
                <div className='qty flex gap-4'>
                    <button className='bg-[#F85903] text-white px-4 h-8 my-auto' onClick={() => increaseQuantity(product.product, product.quantity, product.stock)}>+</button>
                    <h1 className='px-2 my-auto'>{product.quantity}</h1>
                    <button className='bg-[#F85903] text-white px-4 h-8 my-auto' onClick={() => decreaseQuantity(product.product, product.quantity, product.stock)}>-</button>
                </div>
                <p className="text-bold my-auto">{totalValue}</p>

            </div>
        </Fragment>
    )
}

export default CartCard