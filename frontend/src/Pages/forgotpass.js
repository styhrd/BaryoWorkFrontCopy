import React, { useState } from 'react';
import InputForm from '../components/shared/InputForm';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://baryoworkcopyapi.onrender.com/api/v1/user/forgotpass`, { email });
            if (response.data.Status === "Success") {
                toast.success('Password reset link sent successfully');
                navigate('/login');
            } else {
                toast.error('User not found');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <div className='container'>
            <div className='form-container logincont'>
                <img src="/assets/images/logo1.png" className='logo' alt='logo'></img>
                <p className='appname'>BaryoWork</p>
                <form onSubmit={handleSubmit}>
                    <InputForm
                        htmlFor="email"
                        placeholder={'Email'}
                        type={"email"}
                        value={email}
                        handleChange={((e) => setEmail(e.target.value))}
                        name="Email"
                    />
                    <button type='submit' className='btn btn-primary loginbtt'> Send Email</button>
                    <p className='text'>Remembered Your Password? <Link className='linktext' to={'/login'}>Login</Link></p>
                </form>
            </div>
        </div >
    );
};

export default Forgotpass;
