import React, { Fragment, useState, useRef, useEffect } from 'react'
import "./LoginSignUp.css"
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login , register } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import Loader from '../../layout/Loader/Loader';

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const { name, email, password } = user;

    const redirect = location.search ? `/${location.search.split("=")[1]}` : "/account";
    // console.log(location.search);
    // console.log(location.search.split("=")[0]);
    // console.log(location.search.split("=")[1]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }

    }, [dispatch, isAuthenticated, error, alert, navigate , redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            switcherTab.current.classList.remove("shiftToNeutralForm");
            switcherTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            switcherTab.current.classList.add("shiftToNeutralForm");
            switcherTab.current.classList.add("shiftToLeft");
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        console.log("Form Submitted!!");
    }
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        console.log("signup form submitted");
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className="login-singup-container">
                        <div className="login-signup-box">
                            <div>
                                <div className="login-signup-toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm flex' ref={loginTab} onSubmit={loginSubmit}>
                                <div className='loginFormBox'>
                                    <input type="text" placeholder='email' required onChange={(e) => setLoginEmail(e.target.value)} />
                                    <input type="password" placeholder='password' required onChange={(e) => setLoginPassword(e.target.value)} />
                                    <Link to="/password/forgot">Forgot Password ?</Link>
                                    <input type="submit" value="Login" />
                                </div>

                            </form>

                            <form className='singupForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                                <div className="signupName">
                                    <input type="text" name="name" value={name} required placeholder='Name' onChange={registerDataChange} />
                                    <input type="text" name="email" value={email} required placeholder='email' onChange={registerDataChange} />
                                    <div className="signupPassword">
                                        <input type="password" name="password" value={password} required placeholder='password' onChange={registerDataChange} />
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input type="file" name="avatar" accept='image/*' onChange={registerDataChange} />
                                        <input type="submit" value="Register" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}


export default LoginSignUp;

