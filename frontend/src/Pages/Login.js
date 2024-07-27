import React, { useState } from 'react';
import InputForm from '../components/shared/InputForm';
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from "../redux/features/alert.Slice"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../styles/Register.css';
import '../styles/Login.css';



const Login = () => {


    const { loading } = useSelector(state => state.alerts)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { data } = await axios.post('https://baryoworkcopyapi.onrender.com/api/v1/auth/login', { email, password });
            dispatch(hideLoading());

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user._id);
                window.location.reload()
                navigate('/dashboard');
            } else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Invalid Credentials');
            console.log(error);
        }

    };


    return (<>
        {loading ? (<Spinner />) : (
            <div className='container'>
                <div className='form-container logincont'>
                    <img src="/assets/images/logo1.png" className='logo' alt='logo'></img>
                    <p className='appname'>BaryoWork</p>
                    <form onSubmit={handleSubmit}>

                        <InputForm htmlFor="email"
                            placeholder={'Email'}
                            type={"email"}
                            value={email}
                            handleChange={((e) => setEmail(e.target.value))}
                            name="Email" />

                        <InputForm htmlFor="password"
                            placeholder={'Password'}
                            type={"password"}
                            value={password}
                            handleChange={((e) => setPassword(e.target.value))}
                            name="Password" />
                        <div className='forpass'><Link to={'/forgotpass'}>Forgot Password? </Link></div>


                        <button type='submit' className='btn btn-primary loginbtt'>LOGIN</button>
                        <p className='text'>Create an Account? <Link className='linktext' to={'/Register'}>Sign Up</Link></p>
                    </form>


                    <p className='textwicon'>BaryoWork<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle icon" viewBox="0 0 16 16">
                        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
                    </svg> 2024</p>
                </div>
            </div >
        )}
    </>)
}

export default Login