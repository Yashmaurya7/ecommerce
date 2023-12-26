import React , {Fragment , useEffect , useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
// import Loader from '../../layout/Loader/Loader'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { clearErrors , createNewProduct } from '../../../actions/productAction'
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    
    const {loading , error , success} = useSelector((state) => state.newProduct);
    
    const [name , setName] = useState("");
    const [description , setDescription] = useState("");
    const [category , setCategory] = useState("");
    const [price , setPrice] = useState(0);
    const [stock , setStock] = useState(0);
    const [images , setImages] = useState([]);
    const [imagesPreview , setImagesPreview] = useState([]);

    const categories = [
        "Dining Table",
        "Sofa",
        "Bed",
        "Lamp",
        "Bean Bag",
        "Chemical",
    ];

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET});
        }

    },[dispatch , alert , error , navigate , success]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("price" , price);
        myForm.set("stock" , stock);
        myForm.set("description" , description);
        myForm.set("category" , category);

        images.forEach((image) => {
            myForm.append("images" , image);
        });
        dispatch(createNewProduct(myForm));
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
             
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old , reader.result]);
                    setImages((old) => [...old , reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }


  return (
    <Fragment>
        <MetaData title='Create New Product' />
        <div>
            <Sidebar/>
            <div>
                <form encType='multipart/form-data' onSubmit={formSubmitHandler}>
                    <h1>Create Product</h1>
                    <div><input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)}/></div>
                    <div><input type="number" placeholder='Price' required value={price} onChange={(e) => setPrice(e.target.value)}/></div>
                    <div><input type="text" placeholder='Product Desctiption' required value={description} onChange={(e) => setDescription(e.target.value)}/></div>
                    <div>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) => {
                                return <option key={cate} value={cate}>{cate}</option>
                            })}
                        </select>
                    </div>
                    <div><input type="number" placeholder='Stock' required value={stock} onChange={(e) => setStock(e.target.value)}/></div>
                    <div><input type="file" name='avatar' multiple onChange={createProductImagesChange} accept='image/*'/></div>
                    <div>
                        {imagesPreview.map((image , index) => {
                            return <img key={index} src={image} alt='Img Preview'/>
                        })}
                    </div>
                    <Button type='submit' disabled={loading === true ? true : false}>Submit</Button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct