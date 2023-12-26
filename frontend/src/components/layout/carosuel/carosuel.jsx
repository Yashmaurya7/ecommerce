import React , {useState} from 'react'
import "./carosuel.css"
import CarosuelItem from "./carosuleItems"
import {BiSolidCircle} from "react-icons/bi"
import {BsCircle} from "react-icons/bs"
const Carosuel = () => {
    const [currentIndex , setCurrentIndex] = useState(0);
    // const image1 = "https://drive.google.com/uc?export=view&id=1p9tkDDp11n5kR2jru55dbLnN83s-U2mt"
    // https://drive.google.com/file/d/1p9tkDDp11n5kR2jru55dbLnN83s-U2mt/view?usp=sharing
    const caroItems = [
        {
            _id: '1',
            // image: image1,
            image: require("../../assets/modern-interior-livi.png"),
            title: 'Elevate Your Comfort & Longevity One',
            description: 'Trendy sofa set of all styles are available at best offers.'
        },
        {
            _id: '2',
            image: require("../../assets/modern-interior-livi.png"),
            // image: image1,
            title: 'Elevate Your Comfort & Longevity Two',
            description: 'Trendy sofa set of all styles are available at best offers.'
        },
        {
            _id: '3',
            // image: image1,
            image: require("../../assets/modern-interior-livi.png"),
            title: 'Elevate Your Comfort & Longevity ',
            description: 'Trendy sofa set of all styles are available at best offers.'
        },
        {
            _id: '4',
            // image: image1,
            image: require("../../assets/modern-interior-livi.png"),
            title: 'Elevate Your Comfort & Longevity Four',
            description: 'Trendy sofa set of all styles are available at best offers.'
        }
    ]
    const updateIndex = (newIndex) => {
        if (newIndex < 0){
            newIndex = 0;
        }else if (newIndex >= caroItems.length){
            newIndex = caroItems.length - 1;
        }
        setCurrentIndex(newIndex);
    }

  return (
    <div className='carosuel'>
        <div className="inner"
        style={{transform: `translate(-${currentIndex * 100}%)`}}
        >
            {caroItems.map((item) => {
                return <CarosuelItem key={item._id} item={item}/>
            } )}
        </div>
        
        <div className="carosuel-buttons">
            <div className="indicators">
                {caroItems.map((item , index) => {
                    return(
                    <button onClick={() => {
                        updateIndex(index)
                    }} className="indicator-btns">
                        {index === currentIndex 
                        ? <BiSolidCircle className='indicator-circle'/> 
                        : <BsCircle className='indicator-circle'/>}
                    </button>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Carosuel