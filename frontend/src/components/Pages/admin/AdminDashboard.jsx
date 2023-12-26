import React , {useEffect} from 'react'
import Sidebar from "./Sidebar.jsx"
import { Link } from 'react-router-dom'
import {Doughnut , Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { useSelector , useDispatch } from 'react-redux';
import { getAdminProducts } from '../../../actions/productAction.js';
import { getAllOrders } from '../../../actions/orderAction.js';
import { getAllUsers } from '../../../actions/userAction.js';


const AdminDashboard = () => {
    const dispatch = useDispatch()

    const { products} = useSelector((state) => state.products);
    const { orders} = useSelector((state) => state.allOrders);
    const { users} = useSelector((state) => state.allUsers);

    let outOfStock = 0;
    products && products.forEach((item) => {
        if(item.stock === 0) outOfStock += 1;
    })
    const lineState = {
        labels: ["Initial Amount" , "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#F85903"],
                hoverBackgroundColor: ["blue"],
                data: [0,4000],
            }
        ]

    };

    const doughnutState = {
        labels: ["Out of Stock" , "Instock"],
        datasets:[
            {
                backgroundColor: ["#F85903"],
                hoverBackgroundColor: ["blue"],
                data: [outOfStock,products.length - outOfStock],
            }
        ]
    }

    useEffect(() => {

        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

    } , [dispatch]);
  return (
    <div>
        <Sidebar/>
        <div>
            <h1>DashBoard</h1>
            <div className='flex gap-20'>
                <p>Total Amount: 2000</p>
                <Link to='/admin/products'>
                    <p>Products</p>
                    <p>{products && products.length}</p>
                </Link>
                <Link to='/admin/orders'>
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                </Link>
                <Link to='/admin/users'>
                    <p>Users</p>
                    <p>{users && users.length}</p>
                </Link>
            </div>
            <div className='w-[30rem]'>
                <Line data={lineState} />
            </div>
            <div className='w-[30rem]'>
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard