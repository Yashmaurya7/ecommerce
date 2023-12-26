import React, { useEffect, Fragment, useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { getProductDetails, createNewReview, clearErrors } from '../../../actions/productAction';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from '../../../actions/cartAction';
import { useAlert } from 'react-alert';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from "@mui/material"
import { NEW_REVIEW_RESET } from '../../../constants/productConstants';


const ProductDetails = ({ match }) => {
  const { id } = useParams();
  console.log(id);
  const alert = useAlert();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [comment , setComment] = useState("");
  const [rating , setRating] = useState(0);
  const [open , setOpen] = useState(false);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  );

  const {success , error : reviewError} = useSelector((state) => state.newReview);

  const incrementQuantity = () => {
    if (quantity >= product.stock) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  }

  const decrementQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("comment" , comment);
    myForm.set("rating" , rating);
    myForm.set("productId" , id);

    dispatch(createNewReview(myForm));
    submitReviewToggle();

  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type: NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id , error , reviewError , alert , success]);

  return (
    <Fragment>
      <h1 className=' text-[2rem]'>{product.name}</h1>
      {/* <img src={product.images[0].url} alt="prod"/> */}
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.ratings} ({product.numberOfReviews})</p>
      <p>Stock: {product.stock}</p>
      <div className='quantity flex'>
        <button className='px-6 py-2 m-4 bg-[#F85903] text-white' onClick={incrementQuantity}>+</button>
        <p className='px-6 py-2 m-4'>{quantity}</p>
        <button className='px-6 py-2 m-4 bg-[#F85903] text-white' onClick={decrementQuantity}>-</button>
        <button disabled={product.stock < 1 ? true : false} className='px-6 py-2 m-4 bg-[#F85903] rounded-lg text-white' onClick={addToCartHandler}>ADD TO CART</button>
      </div>

      <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <Rating
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          size='large'
          />
          <textarea cols="30" row="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <DialogActions>
            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
            <Button onClick={reviewSubmitHandler}>Submit</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>
      {product.reviews && product.reviews[0] ? 
      <div>
        {product.reviews.map((item) => {
          return(
            <div className='p-4 border-gray-800 border-4 m-5'>
              <p>Name: {item.name}</p>
              <p>Rating: {item.rating}</p>
              <p>Comment: {item.comment}</p>
            </div>
          )
        })}
      </div> :
      <p>No Reviews Found</p>  
    }
    <button className='px-6 py-2 m-4 bg-[#F85903] rounded-lg text-white' onClick={submitReviewToggle}>Submit a review</button>
    </Fragment>

  )
}

export default ProductDetails