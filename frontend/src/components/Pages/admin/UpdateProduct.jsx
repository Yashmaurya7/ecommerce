import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../../layout/Loader/Loader'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { clearErrors, updateProduct, getProductDetails } from '../../../actions/productAction'
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../../constants/productConstants'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {productId} = useParams();

    console.log([].length);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
    const { error: detailsError, product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const categories = [
        "Dining Table",
        "Sofa",
        "Bed",
        "Lamp",
        "Bean Bag",
        "Chemical",
    ];

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (detailsError) {
            alert.error(detailsError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

    }, [dispatch, alert, updateError, navigate, isUpdated, product, productId, detailsError]);

    useEffect(() => {
        dispatch(getProductDetails(productId));
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images);
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("stock", stock);
        myForm.set("description", description);
        myForm.set("category", category);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    }

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }


    return (
        <Fragment>
            <MetaData title='Update New Product' />
            <div>
                <Sidebar />
                <div>
                    <form encType='multipart/form-data' onSubmit={formSubmitHandler}>
                        <h1>Update Product</h1>
                        <div><input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} /></div>
                        <div><input type="number" placeholder='Price' required value={price} onChange={(e) => setPrice(e.target.value)} /></div>
                        <div><input type="text" placeholder='Product Desctiption' required value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                        <div>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => {
                                    return <option key={cate} value={cate}>{cate}</option>
                                })}
                            </select>
                        </div>
                        <div><input type="number" placeholder='Stock' required value={stock} onChange={(e) => setStock(e.target.value)} /></div>
                        <div><input type="file" name='avatar' multiple onChange={updateProductImagesChange} accept='image/*' /></div>
                        <div>
                            {oldImages && oldImages.map((image, index) => {
                                return <img key={index} src={image.url} alt='Old Product Preview' />
                            })}
                        </div>
                        <div>
                            {imagesPreview.map((image, index) => {
                                return <img key={index} src={image} alt='Product Preview' />
                            })}
                        </div>
                        <Button type='submit' disabled={loading === true ? true : false}>Submit</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct