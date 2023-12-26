import React from 'react'
import yellowSofa from "../../assets/yellow-sofa-wooden-t.png"
import "./offer.css"
const offer = () => {
  // https://drive.google.com/file/d/1aKlI0fust4YJStuSr5YSIsyk6pLe0tQ6/view?usp=sharing
  // const yellowSofa = "https://drive.google.com/uc?export=view&id=1aKlI0fust4YJStuSr5YSIsyk6pLe0tQ6"
  return (
    <div className='offer'>

        <div className="offer-left">
            <h2 className='badooni-font-heading text-[50px]'>Get upto <span className='text-yellow'>50%</span> Off on sofa sets</h2>
            <p>Visit our nearest store to avail the offer</p>
            <button>See All</button>
        </div>

        <div className="offer-right">
            <img src={yellowSofa} alt="" />
        </div>

    </div>
  )
}

export default offer