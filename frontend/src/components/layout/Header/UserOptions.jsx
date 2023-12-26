import React , {Fragment, useState} from 'react'
import "./Header.css"
import { SpeedDial , SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {
    const [open , setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    
    const orders = () => {
        navigate('/orders');
    }
    const account = () => {
        navigate('/account');
    }
    const dashboard = () => {
        navigate('/admin/dashboard');
    }
    const logoutUser = () => {
        dispatch(logout());
        alert.success("Logged Out Successfully");
    }
    
    const options = [
        {icon: <ListAltIcon/> , name: "Orders" , func: orders},
        {icon: <PersonIcon/> , name: "Profile" , func: account},
        {icon: <ExitToAppIcon/> , name: "Logout" , func: logoutUser},
    ]

    if(user.role === 'admin'){
        options.unshift({
            icon: <DashboardIcon/>,
            name: 'Dashboard',
            func: dashboard
        })
    }
  return (
    <Fragment>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose = {() => setOpen(false)}
            onOpen = {() => setOpen(true)}
            open = {open}
            direction='down'
            className='SpeedDial'
            icon = { <img src={user.avatar.url ? user.avatar.url : '/logo512.png'} alt='img' className=' w-auto'/>}
        >
        {options.map((item) => (
            <SpeedDialAction key={item.name} icon = {item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}

        </SpeedDial>


        {/* <SpeedDialAction icon={DashboardIcon} tooltipTitle = 'Dashboard'/> */}
        {/* hi */}
    </Fragment>
  )
}

export default UserOptions