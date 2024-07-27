import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExperienceForm = () => {
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
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
                'http://localhost:8080/api/v1/experience/create-exp',
                {
                    company,
                    startDate,
                    endDate,
                    details
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                console.log('Experience created successfully');
                toast.success('Experience created successfully');
                const newExperienceId = response.data.experience._id;
                const experienceIds = JSON.parse(localStorage.getItem('experienceIds')) || [];
                experienceIds.push(newExperienceId);
                window.location.reload();
            } else {
                console.error('Failed to create experience:', response.statusText);
                setError('Failed to create experience');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred');
        }
    };

    return (
        <div className='profupdate'>

            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit} className='formfield2'>
                <div className='cents'>
                    <h2>ADD EXPERIENCE</h2>
                </div>

                <label htmlFor="company">Company:</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />

                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />

                <label htmlFor="details">Details:</label>
                <textarea
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                />
                <br></br>
                <div className='formbutts'><button type="submit">Submit</button></div>

            </form>
        </div>
    );
};

export default ExperienceForm;
