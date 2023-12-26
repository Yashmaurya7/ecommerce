import React, { Fragment , useState , useEffect } from 'react'
import Loader from '../../layout/Loader/Loader'
import { useSelector , useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { forgotPassword , clearErrors } from '../../../actions/userAction'

const ForgotPassword = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const { loading, message, error } = useSelector((state) => state.forgotPassword);
    const [email , setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email" , email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, navigate, message]);

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className=' w-fit m-auto'>
                    <h2>Forgot Password</h2>
                    <form className='singupForm'
                        onSubmit={forgotPasswordSubmit}
                    >
                        <input type="text" name="email" value={email} required placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ForgotPassword