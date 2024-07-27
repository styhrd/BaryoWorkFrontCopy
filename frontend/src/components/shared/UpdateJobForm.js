import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateJobForm = ({ jobId }) => {
    const [jobDetails, setJobDetails] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        company: '',
        jobtitle: '',
        location: '',
        skillsreq: '',
        cnum: '',
        cper: '',
        details: ''
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:8080/api/v1/job/get-job/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setJobDetails(response.data.job);
                // Set the form data with the fetched job details
                setFormData(response.data.job);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('Error fetching job details');
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:8080/api/v1/job/update-job/${jobId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Job updated successfully');
            window.location.reload()
        } catch (error) {
            console.error('Error updating job:', error);
            setError('Error updating job');
        }
    };

    return (
        <div>
            {error && <p>Error fetching job details: {error}</p>}
            {jobDetails && (
                <form onSubmit={handleSubmit} className='profupdate jobcreate'>
                    <h2>EDIT JOB</h2>
                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="company">Company:</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="jobtitle">Job Title:</label>
                        <input type="text" id="jobtitle" name="jobtitle" value={formData.jobtitle} onChange={handleChange} />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="skillsreq">Skills Required:</label>
                        <input type="text" id="skillsreq" name="skillsreq" value={formData.skillsreq} onChange={handleChange} />

                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="cnum">Contact Number:</label>
                        <input type="text" id="cnum" name="cnum" value={formData.cnum} onChange={handleChange} />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="cper">Contact Person:</label>
                        <input type="text" id="cper" name="cper" value={formData.cper} onChange={handleChange} />

                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="details">Details:</label>
                        <input type="text" id="details" name="details" value={formData.details} onChange={handleChange} />
                    </div>


                    <div className='formbutts'><button type="submit" onClick={handleSubmit}>Submit</button></div>

                </form>
            )}
        </div>
    );
};

export default UpdateJobForm;
