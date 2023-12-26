import React from 'react'

const carosuelItem = ({item}) => {
  return (
    <div className='carosuel-item'>
        <div className="carosuel-left">
            <h2 className="carosuel-head badooni-font-heading text-[60px]">{item.title}</h2>
            <p className="carosuel-subhead text-[18px] pr-24">{item.description}</p>
            <button type="submit" className='carosuel-btn mt-4 p-3 w-40 bg-[#F85903] border-none cursor-pointer text-white text-[15px] mb-8'>Know More</button>
        </div>
        <div className="carosuel-right">
            <img src={item.image} alt="" className='carosuel-image'/>
        </div>
    </div>
  )
}

export default carosuelItem