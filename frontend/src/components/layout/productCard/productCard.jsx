import React from 'react'
// import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./productCard.css"
// import "./productCard.css"

// const options = {
//         edit: false,
//         // color: "#F85903",
//         activeColor: "#F85903",
//         value: 2.5,
//         isHalf: true,
// }



const productCard = ({ props }) => {
    const wrap = (
        <div className='best-seller-tag'>
            Best seller
        </div>
    )
    
    return (
        <Link to={`/product/${props._id}`} className='product-card relative'>
            {props.bestSeller ? wrap : <></>}
            <img src={props.images[0].url} alt="newwwww" className='product-card-img'/>
            <h4 className='product-card-title'>{props.name}</h4>
            {/* <ReactStars {...options} /> */}
            <div className='product-card-rating-section'>
                <p className='product-card-rating'>{(props.ratings.toFixed(1))} <FaStar className='product-card-star-icon' /> </p>
                <p className='product-card-number-of-reviews'>({props.numberOfReviews})</p>
            </div>
            <div className="product-card-price-section">
                <p className='product-card-price'>$ {props.price}</p>
                <p className='product-card-before-discount-price'>${props.beforeDiscountPrice}</p>
                <p className='product-card-discount-percentage'> {props.discountPercentage}% OFF</p>
            </div>
            <button disabled={props.stock < 1 ? true: false} className='add-to-cart-btn'>Add to Cart</button>
            <button disabled={props.stock < 1 ? true: false} className='buy-now-btn'>Buy now</button>
        </Link>
    )
}

export default productCard;