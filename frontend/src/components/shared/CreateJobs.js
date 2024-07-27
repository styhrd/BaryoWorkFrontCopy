import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateJobForm = () => {
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [skillsReq, setSkillsReq] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [contactPerson, setContactPerson] = useState('');
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
                'http://localhost:8080/api/v1/job/create-job',
                {
                    company,
                    jobtitle: jobTitle,
                    location,
                    skillsreq: skillsReq.split(',').map(skill => skill.trim()),
                    cnum: contactNumber,
                    cper: contactPerson,
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
                console.log('Job created successfully');
                toast.success('Job created successfully');
                window.location.reload()
                // Optionally handle other actions after job creation
            } else {
                console.error('Failed to create job:', response.statusText);
                setError('Failed to create job');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred');
        }
    };

    return (
        <>
            <div>

                {error && <p>Error: {error}</p>}
                <form onSubmit={handleSubmit} className='profupdate jobcreate'>
                    <h2>CREATE JOB</h2>
                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="company">Company:</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="jobTitle">Job Title:</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>


                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="skillsReq">Skills Required (comma-separated):</label>
                        <input
                            type="text"
                            id="skillsReq"
                            name="skillsReq"
                            value={skillsReq}
                            onChange={(e) => setSkillsReq(e.target.value)}
                            required
                        />

                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>



                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="contactPerson">Contact Person:</label>
                        <input
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            required
                        />
                    </div>

                    <div className='formfield formfield2 formfield3'>
                        <label htmlFor="details">Details:</label>
                        <textarea
                            id="details"
                            name="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>



                    <div className='formbutts'><button type="submit">Submit</button></div>



                </form>
            </div>
        </>
    );
};

export default CreateJobForm;
