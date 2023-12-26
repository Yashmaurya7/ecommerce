import React from 'react'
import { Link } from "react-router-dom"
// import logo from "../assets/logo.png"

const Nav = () => {
    return (
        <div className="h-5vh flex text-white justify-between z-50 lg:py-4 px-40 py-4 flex-1 nav-section">
            {/* <div>
                <img src={logo} alt="" />
            </div> */}
            <div className="lg:flex md:flex lg:flex-1 items-center justify-start font-normal hidden">
                <div className="flex-10">
                    <ul className="flex gap-8 mr-16">
                        <Link>
                            <li>Sofa&Recliners</li>
                        </Link>
                        <Link>
                            <li>Bedroom&Matrress</li>
                        </Link>
                        <Link>
                            <li>Dining&Kitchen</li>
                        </Link>
                        <Link>
                            <li>Storage</li>
                        </Link>
                        <Link>
                            <li>Study&Office</li>
                        </Link>
                        <Link>
                            <li>Living</li>
                        </Link>
                        <Link>
                            <li>Decor</li>
                        </Link>
                        {/* <Link>
                            <li>Lamps&Lighting</li>
                        </Link> */}
                        {/* <Link>
                            <li>Furnishing</li>
                        </Link> */}
                        <Link>
                            <li>Outdoor</li>
                        </Link>
                        <Link>
                            <li>Indoor</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav