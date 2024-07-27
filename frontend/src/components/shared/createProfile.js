import React, { useState } from 'react';
import axios from 'axios';
import AddImage from './Addimage';
import { toast } from 'react-toastify';

const CreateProfileForm = () => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Bearer token not found in localStorage');
            return;
        }

        try {
            const response = await axios.post(
                'https://baryoworkcopyapi.onrender.com/api/v1/profile/create-profile',
                {
                    description,
                    location,
                    skills: skills.split(',').map(skill => skill.trim())
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );



            if (response.status === 201) {
                console.log('Profile created successfully');
                toast.success('Profile created successfully');
                localStorage.setItem('profileId', response.data.profile._id);
            } else {
                console.error('Failed to create profile:', response.statusText);
                setError('Failed to create profile');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred');
        }
    };

    return (<>
        <div className='form-container profcreatecont'>
            <h1>CREATE PROFILE</h1>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit} className='cret'>
                <div className='formfield'>
                    <label htmlFor="description">Description:</label><br />
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Describe Yourself'
                        required
                    /><br />
                </div>

                <div className='formfield'>
                    <label htmlFor="location">Location:</label><br />
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder='City (Makati, Manila)'
                        required
                    /><br />
                </div>


                <div className='formfield'>
                    <label htmlFor="skills">Skills (comma-separated):</label><br />
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder='Carpentry, Plumbing, Welding'
                        required
                    /><br />
                </div>


                <button type="submit">Submit</button>
            </form>
            <AddImage />
        </div>



    </>);
};

export default CreateProfileForm;
