import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../../layout/Loader/Loader';
// import { UPDATE_PASSWORD_RESET } from '../../../constants/productConstants';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, success } = useSelector(state => state.forgotPassword);
    
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const {token} = useParams();


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token , myForm));
        console.log("Password submitted");
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate(`/login`);
        }

    }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
    {loading ? <Loader /> : <Fragment>
        <div className=' w-fit m-auto'>
            <div>
                <h2 className="text-center">Reset Password</h2>
                <form className='singupForm'
                    // ref={registerTab} 
                    encType='multipart/form-data'
                    onSubmit={resetPasswordSubmit}
                >
                    <div className="signupName">
                        <div className="signupPassword">
                            <input type="password" placeholder='Enter New Password' value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
                            <input type="password" placeholder='Confirm New Password' value={confirmPassword} required onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            <input type="submit" value="Update" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>}
</Fragment>
  )
}

export default ForgotPassword