import React from 'react'
import {Link} from "react-router-dom"

const OrderSuccess = () => {
  return (
    <div className='p-16'>
        <h1 className='m-8'>Your Order has been placed successfully</h1>
        <Link to="/orders" className='bg-[#F85903] text-white px-8 py-4 rounded-lg m-8'>View Orders</Link>
    </div>
  )
}

export default OrderSuccess