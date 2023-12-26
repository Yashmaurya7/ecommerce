import React , {Fragment, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch , useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { myOrders , clearErrors } from '../../actions/orderAction';
// import {LaunchIcon} from "@mui/icons-material"



const MyOrder = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state) => state.user);
    const {orders , loading , error} = useSelector((state) => state.myOrders);

    const renderIdCells = (params) => {
        const id = params.id;
        return <Link to={`/order/${id}`}>GO</Link>
    }

    const rows = [];
    const columns = [
        {field: "id" , headerName:"Order Id" , minWidth: 300 , flex: 1} ,
        {field: "status" , headerName:"Status" , minWidth: 150 , flex: 0.5} ,
        {field: "itemsQty" , headerName:"Items Qty" , type: "number", minWidth: 150 , flex: 0.3} ,
        {field: "amount" , headerName:"Amount" , type: "number", minWidth: 270 , flex: 0.5} ,
        {field:"actions" , headerName: "Actions" , type: "number" , sortable: false, minWidth: 150 , flex: 0.3 ,
            renderCell: (params) => renderIdCells(params),
            // {
            //     return(
            //         <Link to={`/order/${params.getValue(params.id , "id") || ''}`}>
            //             Open
            //         </Link>
            //     )
            // },
        }
    ];

    orders && orders.forEach((item , index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        })
    });

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch , alert , error]);

  return (
      <Fragment>
        <MetaData title={`${user?.name} - Orders`} />
        { loading ? <Loader/> : 
        <Fragment>
            <div>
                <DataGrid
                    rows={rows}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    autoHeight
                />
                <h1>{user?.name}'s Orders</h1>

            </div>
        </Fragment>

        }
    </Fragment>
  )
}

export default MyOrder