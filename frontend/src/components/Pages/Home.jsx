import React from 'react'
import Carosuel from '../layout/carosuel/carosuel'
import Category from '../layout/categories/category'
import Offer from '../layout/offer-hoomepage/offer-homepage'
import Products from '../layout/featured-products/featured-products'

const Home = () => {
  return (
    <div>
        <Carosuel/>
        <Category/>
        <Offer/>
        <Products/>
    </div>
  )
}

export default Home