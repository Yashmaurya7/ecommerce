import React , {useState} from "react";
import { Link } from "react-router-dom";
import {FaTimes} from "react-icons/fa"
import {CiMenuFries} from "react-icons/ci"

const Nav = () => {

    const handleClick = () =>{
        setClick(!click);
    }
    const [click, setClick] = useState(false);

    const content = (
        <>
            <div className="block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
                <ul className="text-center text-xl p-20">

                    <Link spy={true} smooth={true} to="Home">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Home1</li>
                    </Link>

                    <Link spy={true} smooth={true} to="About">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">About</li>
                    </Link>

                    <Link spy={true} smooth={true} to="Services">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Services</li>
                    </Link>

                    <Link spy={true} smooth={true} to="Product">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Products</li>
                    </Link>

                    <Link spy={true} smooth={true} to="Contact">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Contact</li>
                    </Link>

                </ul>
            </div>
        </>
    );
    return (
        <nav>
            <div className="h-10vh flex text-white justify-between z-50 lg:py-5 px-20 py-4 flex-1 ">
                <div className="flex items-center flex-1">
                    <span className="text-3xl font-bold">Logo</span>
                </div>

                <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
                    <div className="flex-10">
                        <ul className="flex gap-8 mr-16 text-[18px]">

                            <Link spy={true} smooth={true} to="Home">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Home</li>
                            </Link>

                            <Link spy={true} smooth={true} to="About">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">About</li>
                            </Link>

                            <Link spy={true} smooth={true} to="Services">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Services</li>
                            </Link>

                            <Link spy={true} smooth={true} to="Product">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Products</li>
                            </Link>

                            <Link spy={true} smooth={true} to="Contact">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Contact</li>
                            </Link>

                        </ul>
                    </div>
                </div>

                    <div>
                        {click && content}
                    </div>

                    <button className="block sm:hidden transition" onClick={handleClick}>
                        {click ? <FaTimes/> : <CiMenuFries />}
                    </button>

            </div>
        </nav>
    );
};

export default Nav;
