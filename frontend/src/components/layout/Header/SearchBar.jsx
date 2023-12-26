import React , {useState} from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import logo from "../../assets/logo.png"
import man from "../../assets/man.svg"
import cart from "../../assets/cart.svg"
import heart from "../../assets/heart.svg"
import { Link , useNavigate } from 'react-router-dom'

const SearchBar = () => {
  // https://drive.google.com/file/d/1SkytjGJOQiC_N6W5_EJh2I3MHhYNJLy4/view?usp=drive_link
  // const logo = "https://drive.google.com/uc?export=view&id=1SkytjGJOQiC_N6W5_EJh2I3MHhYNJLy4"
  // https://drive.google.com/file/d/1lq1p9IYzHQH1P-tfEGJGs_a6sW_rQZL_/view?usp=sharing
  // const man = "https://drive.google.com/uc?export=view&id=1lq1p9IYzHQH1P-tfEGJGs_a6sW_rQZL_"
  // https://drive.google.com/file/d/19ar94CctSMmTkbd6GgbvgAl50jks4cam/view?usp=sharing
  // const cart = "https://drive.google.com/uc?export=view&id=19ar94CctSMmTkbd6GgbvgAl50jks4cam"
  // https://drive.google.com/file/d/1s-opiQZD-tLaBSlRUGDvhyoJ3DieDVU4/view?usp=sharing
  // const heart = "https://drive.google.com/uc?export=view&id=1s-opiQZD-tLaBSlRUGDvhyoJ3DieDVU4"
  
  const [keyword , setKeyword] = useState("");

  // const {history} = useParams();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }else{
      navigate("/products");
    }
  };
  return (
    <div className="h-10vh flex justify-between z-50 px-40 py-4 flex-1 align-bottom">
        <Link to="/" className=' basis-1/5'>
            <img src={logo} alt="" />
        </Link>
        {/* <div className='flex basis-3/5 items-center justify-center pr-8'> */}
          <form onSubmit={submitHandler} className='flex basis-3/5 items-center justify-center pr-8'>
            <input 
            type="text" 
            className=' border-grey border-2 w-5/6 h-11'
            placeholder='Search Product ...'
            onChange = {(e) => setKeyword(e.target.value)}
            />
            <button className='h-11 w-14 flex items-center justify-center btn'><AiOutlineSearch className='white-icon'/></button>
          </form>
        {/* </div> */}
        <div className='flex basis-1/5 flex-1'>
            <Link to='/account' className='my-auto'><img src={man} alt="" className=' w-max'/></Link>
            <Link to='/cart' className='my-auto'><img src={cart} alt="" className=' w-max mx-6'/></Link>
            <Link to='/admin/dashboard' className='my-auto'><img src={heart} alt="" className=' w-max'/></Link>
        </div>
    </div>
  )
}

export default SearchBar;