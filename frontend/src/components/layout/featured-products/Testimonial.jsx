import React from 'react'
import ReactStars from "react-rating-stars-component"
import "./Testimonial.css"
import leftShort from "../../assets/small-top-quotes-orange.svg"
import rightShort from "../../assets/small-bottom-quotes-orange.svg"
import leftBig from "../../assets/big-top-quotes-orange.png"
import rightBig from "../../assets/big-bottom-quotes-orange.svg"

const Testimonial = ({ props }) => {
    const options1 = {
        edit: false,
        value: props[0].rating,
        activeColor: "#FACA00",
        // activeColor: "red",
        isHalf: true,
    }
    const options2 = {
        edit: false,
        value: props[1].rating,
        activeColor: "#FACA00",
        // activeColor: "red",
        isHalf: true,
    }
    const options3 = {
        edit: false,
        value: props[2].rating,
        activeColor: "#FACA00",
        // activeColor: "red",
        isHalf: true,
    };
    // https://drive.google.com/file/d/1OC9_izo_gxKE_wcpXWJV6VyqhApnvncB/view?usp=sharing
    // const leftShort = "https://drive.google.com/uc?export=view&id=1OC9_izo_gxKE_wcpXWJV6VyqhApnvncB"
    // https://drive.google.com/file/d/1IhUrkWCL-Bht22a4kT1azXxIX9tSABO4/view?usp=sharing
    // const rightShort = "https://drive.google.com/uc?export=view&id=1IhUrkWCL-Bht22a4kT1azXxIX9tSABO4"
    // https://drive.google.com/file/d/1e1jWsZBZofADFWkY8pzbfwxyU40-c_jp/view?usp=sharing
    // const leftBig = "https://drive.google.com/uc?export=view&id=1e1jWsZBZofADFWkY8pzbfwxyU40-c_jp"
    // https://drive.google.com/file/d/1oBh-EStOuscAGju9LmCrELY7Rnd04FpZ/view?usp=sharing
    // const rightBig = "https://drive.google.com/uc?export=view&id=1oBh-EStOuscAGju9LmCrELY7Rnd04FpZ"
    return (
        <div className='testimonials'>
            <div className="left-box">
                <img src={leftShort} alt="" className='left-short'/>
                <ReactStars {...options1} />
                <p className='test-review'>{props[0].review}</p>
                <div className='name-location'>
                    <p className='test-name'>{props[0].name}</p>
                    <p className='test-location'>{props[0].location}</p>
                </div>
                <img src={rightShort} alt="" className='right-short'/>
            </div>
            <div className="mid-box">
                <img src={leftBig} alt="" className='left-big'/>
                <ReactStars {...options2} />
                <p className='test-review'>{props[1].review}</p>
                <div className='name-location'>
                    <p className='test-name'>{props[1].name}</p>
                    <p className='test-location'>{props[1].location}</p>
                </div>
                <img src={rightBig} alt="" className='right-big'/>
            </div>
            <div className="right-box">
                <img src={leftShort} alt="" className='left-short'/>
                <ReactStars {...options3} />
                <p className='test-review'>{props[2].review}</p>
                <div className='name-location'>
                    <p className='test-name'>{props[2].name}</p>
                    <p className='test-location'>{props[2].location}</p>
                </div>
                <img src={rightShort} alt="" className='right-short'/>
            </div>
        </div>
    )
}

export default Testimonial
// {/* <div className="test-box"> */}
// {/* </div> */}