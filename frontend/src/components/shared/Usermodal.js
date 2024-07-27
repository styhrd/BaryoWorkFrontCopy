import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Usermodal = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'https://baryoworkcopyapi.onrender.com/api/v1/user/update-user',
                { fullname: fullname, email: email, password: password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Update Successful");
            window.location.reload()
            console.log(response.data);
        } catch (error) {
            setError(error.response.data.message || 'An error occurred');
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit} className='profupdate'>
                <h2>EDIT USER</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className='formfield formfield2'>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className='formfield formfield2'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='formfield formfield2'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='formbutts'>
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>

    );
};

export default Usermodal;
