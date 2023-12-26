import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstants';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, isUpdated } = useSelector(state => state.profile);
    
    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
        console.log("Password submitted");
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate(`/account`);
            dispatch({ type: UPDATE_PASSWORD_RESET });
            console.log("Use Effect is Updated");
        }

    }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
    {loading ? <Loader /> : <Fragment>
        <div className=' w-fit m-auto'>
            <div>
                <form className='singupForm'
                    // ref={registerTab} 
                    encType='multipart/form-data'
                    onSubmit={updatePasswordSubmit}
                >
                    <div className="signupName">
                        <div className="signupPassword">
                            <input type="password" placeholder='Enter Old Password' value={oldPassword} required onChange={(e) => {setOldPassword(e.target.value)}}/>
                            <input type="password" placeholder='Enter New Password' value={newPassword} required onChange={(e) => {setNewPassword(e.target.value)}}/>
                            <input type="password" placeholder='Confirm New Password' value={confirmPassword} required onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            <input type="submit" value="Change Password" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>}
</Fragment>
  )
}

export default UpdatePassword