import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const { error, loading, isUpdated } = useSelector(state => state.profile);

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        // dispatch(loadUser());
        console.log("signup form submitted");
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate(`/account`);
            dispatch({ type: UPDATE_PROFILE_RESET });
            console.log("Use Effect is Updated");
        }

    }, [dispatch, error, alert, navigate, isUpdated, user]);




    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className=' w-fit m-auto'>
                    <div>
                        <form className='singupForm'
                            // ref={registerTab} 
                            encType='multipart/form-data'
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="signupName">
                                <input type="text" name="name" value={name} required placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                                <input type="text" name="email" value={email} required placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                                <div className="signupPassword">
                                    {/* <input type="password" name="password" value={password} required placeholder='password' onChange={registerDataChange} /> */}
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept='image/*' onChange={updateProfileDataChange} />
                                    <input type="submit" value="Update Profile" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>

    )
}

export default UpdateProfile