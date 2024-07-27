import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EducationForm = () => {
    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
                'https://baryoworkcopyapi.onrender.com/api/v1/education/create-educ',
                {
                    school,
                    course,
                    startDate,
                    endDate
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                console.log('Education created successfully');
                toast.success('Education created successfully');
                window.location.reload();
            } else {
                console.error('Failed to create education:', response.statusText);
                setError('Failed to create education');
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
                    <h2>ADD EDUCATION</h2>
                </div>
                <label htmlFor="school">School:</label>
                <input
                    type="text"
                    id="school"
                    name="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    required
                />

                <label htmlFor="course">Course:</label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
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

                <div className='formbutts'><button type="submit">Submit</button></div>

            </form>
        </div>
    );
};

export default EducationForm;
