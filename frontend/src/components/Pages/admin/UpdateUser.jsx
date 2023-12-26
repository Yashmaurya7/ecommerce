import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { useAlert } from 'react-alert'
import { updateUser, clearErrors, getUserDetails } from '../../../actions/userAction'
import Sidebar from './Sidebar'
import { UPDATE_USER_RESET } from '../../../constants/userConstants'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../layout/Loader/Loader'

const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { userId } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error: updateError, isUpdated , message } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const roles = [
        { value: "admin", name: "Admin" },
        { value: "user", name: "User" },
    ];

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success(message);
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }

    }, [dispatch, alert, error, navigate, isUpdated, updateError, loading, user, userId , message]);

    useEffect(() => {
        dispatch(getUserDetails(userId));
    },[])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId , myForm));
    }

    return (
        <Fragment>
            <MetaData title='Update User' />
            <div>
                <Sidebar />
                { loading ? <Loader /> :
                    <div>
                        <form encType='multipart/form-data' onSubmit={formSubmitHandler} className='p-12 flex flex-col justify-center items-center gap-8'>
                            <h1>Update User</h1>
                            <div><input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                            <div><input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} /></div>
                            <div>
                                <select defaultValue={user.role} onChange={(e) => setRole(e.target.value)} className='bg-[#f85903] p-4'>
                                    <option value="">Choose Role</option>
                                    {roles.map((role) => {
                                        return <option key={role.value} value={role.value}>{role.name}</option>
                                    })}

                                </select>
                            </div>
                            <Button type='submit' disabled={updateLoading === true ? true : false || role === "" ? true : false}>Update</Button>
                        </form>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default UpdateUser