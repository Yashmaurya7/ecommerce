import React, { useEffect, Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from '../../../actions/productAction'
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'
import ProductCard from '../productCard/productCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"
import "./Products.css"
import { Table } from '@mui/material'
import { clearErrors } from '../../../actions/productAction'

const Product = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  console.log(price);

  const { products, loading, error, productCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  const alert = useAlert();

  const categories = [
    "Dining Table", 
    "chemical",
    "Sofa",
    "Bed",
    "Chair",
    "Interior"
  ];

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage , price , category , rating));
  }, [dispatch, keyword, currentPage , price , category , rating , error , alert]);



  return (
    <div>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-16 flex-wrap mx-20 my-8">
            {Array.isArray(products) ? products.map(prod => {
              return <ProductCard key={prod._id} props={prod} />
            }) : <Loader />
            }
          </div>
        )}
      </Fragment>
      {/* <div className='filter-box w-32 mx-16'>

        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          min={0}
          max={25000}
        />
      </div> */}
      <fieldset className='w-28 flex justify-center mx-auto'>
        <Typography component="legend">Ratings Above</Typography>
        <Slider
          value={rating}
          onChange={(e,newRating) => {
            setRating(newRating);
          }}
          aria-labelledby='continuous-slider'
          min={0}
          max={5}
        />
      </fieldset>
      <div className="categories mx-4">
      {categories.map((category) => {
        return <li
          className='category-link'
          key={category}
          onClick={() => setCategory(category)}
        >
          {category}
        </li>
      })}
      </div>
      {resultPerPage >= filteredProductsCount ? <></> :
        <div className='pagination-box'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText={"next"}
            prevPageText={"prev"}
            firstPageText={"1st"}
            lastPageText={"last"}
            itemClass='page-item'
            linkClass='page-link'
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
          />
        </div>
      }
    </div>
  )
}

export default Product;