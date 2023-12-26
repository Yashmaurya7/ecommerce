import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch , useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Sidebar from "./Sidebar"
import { DELETE_ORDER_RSEST  } from '../../../constants/orderConstants'
import { getAllOrders , deleteOrder , clearErrors } from '../../../actions/orderAction'
// import DeleteIcon from "@mui/icons-material"

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error , orders } = useSelector((state) => state.allOrders);

    const {error: deleteError , isDeleted} = useSelector((state) => state.order);

    const deleteProductHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const renderColCells = (params) => {
        const id = params.id;
        return (
            <Fragment>
                <Link to={`/admin/order/${id}`}>Edit</Link>
                <Button onClick={() => deleteProductHandler(id)}> delete </Button>
            </Fragment>
        )
    }

    const columns = [
      {field: "id" , headerName:"Order Id" , minWidth: 300 , flex: 1} ,
      {field: "status" , headerName:"Status" , minWidth: 150 , flex: 0.5} ,
      {field: "itemsQty" , headerName:"Items Qty" , type: "number", minWidth: 150 , flex: 0.3} ,
      {field: "amount" , headerName:"Amount" , type: "number", minWidth: 270 , flex: 0.5} ,
        {field: 'actions' , headerName: 'Actions' , minWidth: 150, flex: 0.3 , type:"number",
        sortable: false,
        renderCell: (params) => renderColCells(params),
    },
    ]

    const rows = [];

    orders && orders.forEach((item) =>{
        rows.push({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
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
            navigate("/admin/orders");
            dispatch({type: DELETE_ORDER_RSEST});
        }

        dispatch(getAllOrders());

    } , [dispatch , alert , error , deleteError , isDeleted , navigate]);

  return (
    <Fragment>
         <MetaData title={"ALL Orders -- Admin"} />
        <div>
            <Sidebar/>
            <div>
                <h1>All Orders</h1>
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

export default OrderList