import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfileForm = ({ profile }) => {
    const [formData, setFormData] = useState({
        description: profile.description || '',
        location: profile.location || '',
        skills: profile.skills ? profile.skills.join(', ') : ''
    });
    const [error, setError] = useState(null);

    const profileId = localStorage.getItem('profileId');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token || !profileId) {
            console.error('Bearer token or profile ID not found in localStorage');
            return;
        }

        try {
            const response = await axios.patch( // Use axios.patch instead of axios.put
                `https://baryoworkcopyapi.onrender.com/api/v1/profile/update-profile/${profileId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                console.log('Profile updated successfully');
                window.location.reload();
                // Close the modal or perform any other actions upon successful update
            } else {
                console.error('Failed to update profile:', response.statusText);
                setError('Failed to update profile');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='profupdate'>
            <h2>EDIT PROFILE</h2>
            <div className='formfield formfield2'>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div className='formfield formfield2'>
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='formfield formfield2'>
                <label htmlFor="skills">Skills:</label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='formbutts'>
                <button type="submit">Update</button>
            </div>

            {error && <div>Error: {error}</div>}
        </form>
    );
};

export default UpdateProfileForm;

