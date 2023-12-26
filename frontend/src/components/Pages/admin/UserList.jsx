import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch , useSelector } from 'react-redux'
import { getAllUsers , deleteUser , clearErrors } from '../../../actions/userAction'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Sidebar from "./Sidebar"
import { DELETE_USER_RESET } from '../../../constants/userConstants'

const UserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error , users} = useSelector((state) => state.allUsers);

    const {error: deleteError , isDeleted , message} = useSelector((state) => state.profile);

    const deleteProductHandler = (id) => {
        dispatch(deleteUser(id));
    }

    const renderColCells = (params) => {
        const id = params.id;
        return (
            <Fragment>
                <Link to={`/admin/user/${id}`}>Edit</Link>
                <Button onClick={() => deleteProductHandler(id)}> delete </Button>
            </Fragment>
        )
    }

    const columns = [
        {field: 'id' , headerName: 'User ID' , minWidth: 200, flex: 0.5},
        {field: 'email' , headerName: 'Email' , minWidth: 350, flex: 1},
        {field: 'name' , headerName: 'Name' , minWidth: 150, flex: 0.5 },
        {field: 'role' , headerName: 'Role' , minWidth: 270, flex: 0.3},
        {field: 'actions' , headerName: 'Actions' , minWidth: 150, flex: 0.3 , type:"number",
        sortable: false,
        renderCell: (params) => renderColCells(params),
    },
    ]

    const rows = [];

    users && users.forEach((item) =>{
        rows.push({
            id: item._id,
            email: item.email,
            name: item.name,
            role: item.role,
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
            alert.success(message);
            navigate("/admin/users");
            dispatch({type: DELETE_USER_RESET});
        }

        dispatch(getAllUsers());

    } , [dispatch , alert , error , deleteError , isDeleted , navigate , message]);

  return (
    <Fragment>
         <MetaData title={"ALL Users -- Admin"} />
        <div>
            <Sidebar/>
            <div>
                <h1>All Users</h1>
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

export default UserList