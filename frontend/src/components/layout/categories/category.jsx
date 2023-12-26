import React from 'react'
import category1 from "../../assets/category - living-room-interior.png"
import category2 from "../../assets/category-bookshelf-with-plant (1).png"
import category3 from "../../assets/category - empty-table-chair (1).png"
import category4 from "../../assets/category-beautiful-view-moder (1).png"
import category5 from "../../assets/category-beautiful-view-moder (1).png"
// import category5 from "../../assets/luxurious-dining-tab.png"
import "./category.css"
import { NavLink } from "react-router-dom"

// import {AiOutlineArrowRight} from "react-icons/ai"

const category = () => {
    // https://drive.google.com/file/d/1Xxhd96S8rY2B2EjWLM6teCtOQg3u0RQt/view?usp=sharing
    // const category1 = "https://drive.google.com/uc?export=view&id=1Xxhd96S8rY2B2EjWLM6teCtOQg3u0RQt"
    // https://drive.google.com/file/d/1AfCEMDDh_tv0Ca4A_tD0xA7JIMdvqq-i/view?usp=sharing
    // const category2 = "https://drive.google.com/uc?export=view&id=1AfCEMDDh_tv0Ca4A_tD0xA7JIMdvqq-i"
    // https://drive.google.com/file/d/1bFNwlnAkZTNS9S-VKhit-BD5enY01NuP/view?usp=sharing
    // const category3 = "https://drive.google.com/uc?export=view&id=1bFNwlnAkZTNS9S-VKhit-BD5enY01NuP"
    // https://drive.google.com/file/d/12YADd_F_7_9JSOht8pclD2WpYWbLjuio/view?usp=sharing
    // const category4 = "https://drive.google.com/uc?export=view&id=12YADd_F_7_9JSOht8pclD2WpYWbLjuio"
    // const category5 = "https://drive.google.com/uc?export=view&id=12YADd_F_7_9JSOht8pclD2WpYWbLjuio"
    
    // https://drive.google.com/file/d/13tBjKNKmHUE2wY03fpI3FAEQp85DJWji/view?usp=sharing
    // const category5 = "https://drive.google.com/uc?export=view&id=13tBjKNKmHUE2wY03fpI3FAEQp85DJWji"

    // const category5 = "https://drive.google.com/uc?export=view&id="
    return (
        <div className='categories'>
            <h2 className="category-head">Unveiling Furniture Category</h2>
            <p className="category-subhead">Your Furniture Journey Begins Here</p>
            <div className="category-images">
                <div className="category-img">
                    <NavLink to='/sr' className='category-img-nav'>
                        <img src={category1} alt="" />
                        <p className='cate-img-text'>Sofa & Recliners</p>
                    </NavLink>
                </div>
                <div className="category-img">
                    <NavLink to='/sr' className='category-img-nav'>
                        <img src={category2} alt="" />
                        <p>Book Shelves</p>
                    </NavLink>
                </div>
                <div className="category-img">
                    <NavLink to='/sr' className='category-img-nav'>
                        <img src={category3} alt="" />
                        <p>Coffee Table</p>
                    </NavLink>
                </div>
                <div className="category-img">
                    <NavLink to='/sr' className='category-img-nav'>
                        <img src={category4} alt="" />
                        <p>Beds</p>
                    </NavLink>
                </div>
                <div className="category-img">
                    <NavLink to='/sr' className='category-img-nav'>
                        <img src={category5} alt="" />
                        <p>Dining Table Set</p>
                    </NavLink>
                </div>
            </div>
            <button className='category-btn'>View more</button>
        </div>
    )
}

export default category