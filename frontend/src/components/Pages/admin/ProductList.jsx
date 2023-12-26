import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch , useSelector } from 'react-redux'
import { clearErrors , getAdminProducts , deleteProduct } from '../../../actions/productAction'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Sidebar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstants'
// import DeleteIcon from "@mui/icons-material"

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error , products} = useSelector((state) => state.products);

    const {error: deleteError , isDeleted} = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    const renderColCells = (params) => {
        const id = params.id;
        return (
            <Fragment>
                <Link to={`/admin/products/${id}`}>Edit</Link>
                <Button onClick={() => deleteProductHandler(id)}> delete </Button>
            </Fragment>
        )
    }

    const columns = [
        {field: 'id' , headerName: 'Product ID' , minWidth: 200, flex: 0.5},
        {field: 'name' , headerName: 'Name' , minWidth: 350, flex: 1},
        {field: 'stock' , headerName: 'Stock' , minWidth: 150, flex: 0.3 , type:"number"},
        {field: 'price' , headerName: 'Price' , minWidth: 270, flex: 0.5 , type:"number"},
        {field: 'actions' , headerName: 'Actions' , minWidth: 150, flex: 0.3 , type:"number",
        sortable: false,
        renderCell: (params) => renderColCells(params),
    },
    ]

    const rows = [];

    products && products.forEach((item) =>{
        rows.push({
            id: item._id,
            stock: item.stock,
            name: item.name,
            price: item.price,
        })
    })

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted === true){
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({type: DELETE_PRODUCT_RESET});
        }

        dispatch(getAdminProducts());

    } , [dispatch , alert , error , deleteError , isDeleted , navigate]);

  return (
    <Fragment>
         <MetaData title={"ALL Products -- Admin"} />
        <div>
            <Sidebar/>
            <div>
                <h1>All Products</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>

        </div>
    </Fragment>
  )
}

export default ProductList