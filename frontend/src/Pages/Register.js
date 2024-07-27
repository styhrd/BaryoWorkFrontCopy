import React, { useState } from 'react';
import InputForm from '../components/shared/InputForm';
import '../styles/Register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import Tcmodal from '../components/shared/Tcmodal'; // Import the Tcmodal component

const Register = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!fullname || !email || !password) {
                return alert('Provide All Fields');
            }
            setLoading(true); // Show loading spinner
            const { data } = await axios.post('https://baryoworkcopyapi.onrender.com/api/v1/auth/register', { fullname, email, password });
            setLoading(false); // Hide loading spinner
            if (data.success) {
                toast.success('Registered Successfully');
                navigate('/login');
            }
        } catch (error) {
            setLoading(false); // Hide loading spinner
            toast.error('Email Already Used');
            console.log(error);
        }
    }

    const handleCheckboxChange = () => {
        setShowModal(!showModal); // Toggle modal visibility
    }

    return (
        <>
            {loading ? (<Spinner />) : (
                <div className='container '>
                    <div className='form-container logincont'>
                        <img src="/assets/images/logo1.png" className='logo' alt='logo' />
                        <p className='appname'>BaryoWork</p>
                        <form onSubmit={handleSubmit}>
                            <InputForm
                                htmlFor="fullname"
                                placeholder={'Fullname'}
                                type={"text"}
                                value={fullname}
                                handleChange={(e) => setFullName(e.target.value)}
                                name="Full Name"
                            />

                            <InputForm
                                htmlFor="email"
                                placeholder={'Email'}
                                type={"email"}
                                value={email}
                                handleChange={(e) => setEmail(e.target.value)}
                                name="Email"
                            />

                            <InputForm
                                htmlFor="password"
                                placeholder={'Password'}
                                type={"password"}
                                value={password}
                                handleChange={(e) => setPassword(e.target.value)}
                                name="Password"
                            />

                            <div className='checkbox'>
                                <input
                                    type="checkbox"
                                    id="termsAndConditions"
                                    name="termsAndConditions"
                                    required
                                    onChange={handleCheckboxChange} // Handle checkbox change event
                                />
                                <label htmlFor="termsAndConditions">Terms and Conditions & Privacy Policy</label>
                            </div>

                            <button type='submit' className='btn reg-btn loginbtt'>SIGN UP</button>

                            <p className='text'>Have an Account?    <Link className='linktext' to={'/login'}>Login Here</Link></p>

                        </form>

                        <p className='textwicon'>BaryoWork<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle icon" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
                        </svg> 2024</p>
                    </div>
                    <div className='tcmodal'>
                        {showModal && <Tcmodal onClose={() => setShowModal(false)} />} {/* Render the modal if showModal is true */}
                    </div>
                </div >
            )}


        </>
    );
}

export default Register;
