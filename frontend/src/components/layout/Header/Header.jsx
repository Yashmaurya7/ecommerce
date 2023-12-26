import React, { useEffect , Fragment } from 'react'
import Loader from '../Loader/Loader'
import { Link } from "react-router-dom"
// import { BsFillTelephoneFill } from "react-icons/bs"
// import { MdLocationOn } from "react-icons/md"
import { getProducts } from '../../../actions/productAction'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import location from "../../assets/location.svg"
import phone from "../../assets/phone.svg"
import ProductCard from '../productCard/productCard'

const Header = () => {
    const dispatch = useDispatch();

    const {products , loading , error} = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])



    // const location = "https://drive.google.com/uc?export=view&id=1c7EhiA-tyJ2dvA4z8zFJVgqAP9z-ghtU"
    // const phone = "https://drive.google.com/uc?export=view&id=17MJur9LibhlYI6fiNpfSChN0Fib9Yi8S"
    return (
        <div className='h-10vh flex justify-between z-50 px-40 py-4 flex-1 header-section'>
            <div className='lg:flex md:flex items-center font-normal hidden'>
                <div className='flex-10'>
                    <ul className='flex gap-8 mr-16 items-center'>
                        <Link>
                            <div className='flex items-center'>
                                {/* <MdLocationOn className='mr-2 icon'/> */}
                                {/* <img src="https://drive.google.com/uc?export=view&id=1c7EhiA-tyJ2dvA4z8zFJVgqAP9z-ghtU" alt="" className='mr-2'/> */}
                                <img src={location} alt="" className='mr-2' />
                                <li>Find a store</li>
                                {/* https://drive.google.com/file/d/1c7EhiA-tyJ2dvA4z8zFJVgqAP9z-ghtU/view?usp=sharing */}
                            </div>
                        </Link>
                        <Link>
                            <div className='flex'>
                                {/* <BsFillTelephoneFill className='mr-2 icon'/> */}
                                {/* <img src="https://drive.google.com/uc?export=view&id=17MJur9LibhlYI6fiNpfSChN0Fib9Yi8S" alt="" className='mr-2'/> */}
                                <img src={phone} alt="" className='mr-2' />
                                <li>+91 - 9234234321</li>
                                {/* https://drive.google.com/file/d/17MJur9LibhlYI6fiNpfSChN0Fib9Yi8S/view?usp=drive_link */}
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className='lg:flex md:flex items-center font-normal hidden'>
                <div className='flex-10'>
                    <ul className='flex gap-8 mr-16 items-center'>
                        <Link>
                            <li>Bulk Order</li>
                        </Link>
                        <Link>
                            <li>Track Order</li>
                        </Link>
                        <Link>
                            <li>Help Center</li>
                        </Link>
                    </ul>
                </div>
            </div>
            {/* <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex gap-16 flex-wrap">
                        {products && products?.map(prod => {
                            return <ProductCard key={prod._id} props={prod} />
                        })}
                    </div>
                )}
            </Fragment> */}
        </div>
    )
}

export default Header