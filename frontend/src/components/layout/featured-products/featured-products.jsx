import React from 'react'
import ProductCard from '../productCard/productCard'
import "./featured-products.css"
import ModernLivingRoom from "../../assets/modern-minimalist-in.png"
import Testimonial from './Testimonial'

const featuredProducts = () => {
    const mostWantedProds = [
        {
            // name: "Teak-Wood Table",
            name: "FURNY Wood 3 Seater Gaiety Sleeper Supersoft Sofa Cum Bed (Grey) ",
            description: "Well made table suitable for 4 people eating",
            price: "1200",
            beforeDiscountPrice: "1500",
            discountPercentage: "20",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1vxEnn7TvcnxlFmcyT8g_lDV-_T7N0Cdv",
                    url: require("../../assets/bed-with-blue-white-.png")
                }
            ],
            category: "Dining Table",
            ratings: 2.0,
            numberOfReviews: 30,
            bestSeller: true,
        },
        {
            // name: "Wood-Epoxy Table",
            name: "Wakefit Mattress | 10 Years Warranty | Mattress Double Bed, 8-Inch Memory Foam Mattress , Mattress Queen Size",
            description: "Well made table suitable for 10 people eating",
            price: "349",
            beforeDiscountPrice: "500",
            discountPercentage: "40",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/file/d/1dmlZdgps2KELtGlOtGUCp_vo9pikZ_cl/view?usp=sharing",
                    // url: "https://drive.google.com/uc?export=view&id=1dmlZdgps2KELtGlOtGUCp_vo9pikZ_cl",
                    url: require("../../assets/front-view-gray-couc.png")
                }
            ],
            category: "Dining Table",
            ratings: 3.0,
            numberOfReviews: 60,
            bestSeller: false,
        },
        {
            // name: "Teak-Wood Table",
            name: "FURNY Wood 3 Seater Gaiety Sleeper Supersoft Sofa Cum Bed (Grey) ",
            description: "Well made table suitable for 4 people eating",
            price: "1249",
            beforeDiscountPrice: "1500",
            discountPercentage: "20",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1vxEnn7TvcnxlFmcyT8g_lDV-_T7N0Cdv",
                    url: require("../../assets/restaurant-table-wit.png")
                }
            ],
            category: "Dining Table",
            ratings: 2.0,
            numberOfReviews: 36890,
            bestSeller: true,
        },
        {
            // name: "Wood-Epoxy Table",
            name: "Wakefit Mattress | 10 Years Warranty | Mattress Double Bed, 8-Inch Memory Foam Mattress , Mattress Queen Size",
            description: "Well made table suitable for 10 people eating",
            price: "349",
            beforeDiscountPrice: "500",
            discountPercentage: "40",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/file/d/1dmlZdgps2KELtGlOtGUCp_vo9pikZ_cl/view?usp=sharing",
                    // url: "https://drive.google.com/uc?export=view&id=1dmlZdgps2KELtGlOtGUCp_vo9pikZ_cl",
                    url: require("../../assets/green-couch.png")
                }
            ],
            category: "Dining Table",
            ratings: 3.0,
            numberOfReviews: 6000,
            bestSeller: false,
        },
        // {
        //     // name: "Teak-Wood Table",
        //     name: "FURNY Wood 3 Seater Gaiety Sleeper Supersoft Sofa Cum Bed (Grey) ",
        //     description: "Well made table suitable for 4 people eating",
        //     price: "1200",
        //     beforeDiscountPrice: "1500",
        //     discountPercentage: "20",
        //     images: [
        //         {
        //             public_id: "Sample Image public_id",
        //             url: "https://drive.google.com/uc?export=view&id=1vxEnn7TvcnxlFmcyT8g_lDV-_T7N0Cdv",
        //         }
        //     ],
        //     category: "Dining Table",
        //     ratings: 2.0,
        //     numberOfReviews: 30,
        //     bestSeller: true,
        // },

    ]
    const kitchenEssentials = [
        {
            // name: "Teak-Wood Table",
            name: "WOOD STREET Wooden Chopping Board with Handle , Medium size measure 29 x 19 x 1.8 cms",
            description: "Well made table suitable for 4 people eating",
            price: "39",
            beforeDiscountPrice: "51",
            discountPercentage: "23",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1t8pab8Noe_xgdRaZA40xQ6heRjWJw_Zd",
                    url: require("../../assets/wood-cutting-board.png")
                }
            ],
            category: "Dining Table",
            ratings: 4.5,
            numberOfReviews: 55000,
            bestSeller: true,
        },
        {
            // name: "Teak-Wood Table",
            name: "Craft Store 2 Compartment Wooden Cutlery Spoon Holder Multipurpose Kitchen Rack Organizer, 6 Inches-Brown",
            description: "Well made table suitable for 4 people eating",
            price: "20",
            beforeDiscountPrice: "23",
            discountPercentage: "13",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1eOdpO8p-4X1MGM1601acDow229aD2NQM",
                    url: require("../../assets/cutlery.png")
                }
            ],
            category: "Dining Table",
            ratings: 4.0,
            numberOfReviews: 40000,
            bestSeller: true,
        },
        {
            // name: "Teak-Wood Table",
            name: "KITCHENKING Sheesham Wooden masala box/spices box/with Glass top for Kitchen. (12 CONTAINERS)",
            description: "Well made table suitable for 4 people eating",
            price: "32",
            beforeDiscountPrice: "27",
            discountPercentage: "15",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1hIn5D9_LPN5VBWVpDnCT4Leq2HS9vhNU",
                    url: require("../../assets/spice box.png")
                }
            ],
            category: "Dining Table",
            ratings: 4.5,
            numberOfReviews: 78000,
            bestSeller: true,
        },
        {
            // name: "Teak-Wood Table",
            name: "SPICE EXPERT Salt and Pepper Grinder Set Wooden Grinder with Wood Color (1 Pcs)",
            description: "Well made table suitable for 4 people eating",
            price: "19",
            beforeDiscountPrice: "22",
            discountPercentage: "13",
            images: [
                {
                    public_id: "Sample Image public_id",
                    // url: "https://drive.google.com/uc?export=view&id=1TuRvzeViWL2KhWTiVdEH-RPDJ4BXszGJ",
                    url: require("../../assets/wooden-salt-pepper-g.png")
                }
            ],
            category: "Dining Table",
            ratings: 4.5,
            numberOfReviews: 8000,
            bestSeller: true,
        },
    ];
    const testimonials = [
        {
            0:{
                rating: 4.0,
                review: "Love my new furniture from! Stylish and excellent quality. I am very happy. Highly recommend.",
                name: "Mrs.Shelly",
                location: "New York",
                mid: false,
            },
            1:{
                rating: 5.0,
                review: "I recently purchased a dining set from, and I must say I am thoroughly impressed! The whole process, from browsing their website to the delivery, was smooth and hassle-free.",
                name: "Ms.Lisa",
                location: "California",
                mid: true,
            },
            2:{
                rating: 5.0,
                review: "I was hesitant to buy furniture online, but [Furniture Website] proved me wrong. I’m so happy with my purchase",
                name: "Mr.Jed",
                location: "Chicago",
                mid: false,
            },
        }
    ];
    // https://drive.google.com/file/d/1fN9DelTDuaiDxFYfmPPyGj4peDFoCV46/view?usp=sharing
    // const ModernLivingRoom = "https://drive.google.com/uc?export=view&id=1fN9DelTDuaiDxFYfmPPyGj4peDFoCV46"
    return (
        <div>
            <div className='featured-section flex-wrap'>
                <h2 className="featured-head">Discover the Most Wanted</h2>
                <h3 className="featured-subhead">Find Your Ideal Pieces</h3>
                <div className='flex gap-16'>
                    {mostWantedProds.map((prod) => {
                        return <ProductCard key={prod._id} props={prod} />
                    })}
                </div>
            </div>
            <div className="personalized-ad-section">
                <img src={ModernLivingRoom} alt="" className='personlized-img img-hor' />
                <h3 className="personlized-subhead">Design Your Dream Home Now</h3>
                <h2 className="personlized-head">Explore Personalized Decor With Our Experts</h2>
                <button className='explore-now-btn'>Explore now</button>
            </div>
            <div className="kitchen-section featured-section">
                <h2 className='kitchen-head featured-head'>Kitchen Essentials</h2>
                <h3 className="kitchen-subhead featured-subhead">Trendy Kitchen Accessories</h3>
                <div className="flex gap-16">
                    {kitchenEssentials.map(prod => {
                        return <ProductCard key={prod._id} props={prod} />
                    })}
                </div>
            </div>
            <div className="testimonials-section">
                <h2 className="featured-head">Happy Customers, Happy Us</h2>
                <h3 className="featured-subhead">Feedback That Warms Our Hearts</h3>
                {testimonials.map(testi => {
                    return <Testimonial key={testi._id} props={testi} />
                })}
            </div>
        </div>
    )
}

export default featuredProducts;