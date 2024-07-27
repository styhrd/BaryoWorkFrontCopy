import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/sj.css';
import { toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';

const SearchJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [skillJobs, setSkillJobs] = useState([]);
    const [locationJobs, setLocationJobs] = useState([]);
    const [totalPagesForAllJobs, setTotalPagesForAllJobs] = useState(0);
    const [totalPagesForSkillJobs, setTotalPagesForSkillJobs] = useState(0);
    const [totalPagesForLocationJobs, setTotalPagesForLocationJobs] = useState(0);
    const [currentPageForAllJobs, setCurrentPageForAllJobs] = useState(1);
    const [currentPageForSkillJobs, setCurrentPageForSkillJobs] = useState(1);
    const [currentPageForLocationJobs, setCurrentPageForLocationJobs] = useState(1);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [expandedSkillIndex, setExpandedSkillIndex] = useState(null);
    const [expandedLocationIndex, setExpandedLocationIndex] = useState(null);
    const [skillerror, setskillerror] = useState('');
    const [locerror, setlocerror] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/job/get-jobs?page=${currentPageForAllJobs}&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setLoading(false);
                // Initialize showDetails property for each job as false
                const jobsWithDetails = response.data.jobs.map(job => ({ ...job, showDetails: false }));
                setAllJobs(jobsWithDetails);
                setTotalPagesForAllJobs(response.data.totalPages);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching all jobs:', error);
                setError('There are no Available Jobs For You Right Now...');
            }
        };

        fetchAllJobs();
    }, [currentPageForAllJobs, search]);

    useEffect(() => {
        const fetchSkillJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/job/job-skills?page=${currentPageForSkillJobs}&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSkillJobs(response.data.jobs);
                setTotalPagesForSkillJobs(response.data.totalPages);
            } catch (skillerror) {
                console.error('Error fetching skill jobs:');
                setskillerror('There are no Jobs Fit for your skillset...');
            }
        };

        fetchSkillJobs();
    }, [currentPageForSkillJobs]);

    useEffect(() => {
        const fetchLocationJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/job/job-location?page=${currentPageForLocationJobs}&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setLocationJobs(response.data.jobs);
                setTotalPagesForLocationJobs(response.data.totalPages);
            } catch (locerror) {
                console.error('Error fetching location jobs:');
                setlocerror('There are no jobs in you Location right now...');
            }
        };

        fetchLocationJobs();
    }, [currentPageForLocationJobs]);

    const handlePageChangeForAllJobs = (pageNumber) => {
        setCurrentPageForAllJobs(pageNumber);
    };

    const handlePageChangeForSkillJobs = (pageNumber) => {
        setCurrentPageForSkillJobs(pageNumber);
    };

    const handlePageChangeForLocationJobs = (pageNumber) => {
        setCurrentPageForLocationJobs(pageNumber);
    };

    const handleApply = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `https://baryoworkcopyapi.onrender.com/api/v1/apply/apply`,
                { jobId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Optionally, you can update the UI or show a success message upon successful application
            console.log('Application successful');
            toast.success('Application Successful')
            window.location.reload()
        } catch (error) {
            console.error('Error applying to job:', error);
            setError('Error applying to job');
        }
    };

    const handleToggleDetails = (index) => {
        // Toggle expandedIndex to show/hide details for the clicked job
        setExpandedIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleToggleSkillDetails = (index) => {
        // Toggle expandedSkillIndex to show/hide details for the clicked job in skillJobs
        setExpandedSkillIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleToggleLocationDetails = (index) => {
        // Toggle expandedLocationIndex to show/hide details for the clicked job in locationJobs
        setExpandedLocationIndex(prevIndex => prevIndex === index ? null : index);
    };


    return (<> {loading ? (<Spinner />) : (<>
        <div className='welcies'>
            <h1>JOBS</h1>
        </div>
        <div className='jobcontainer'>
            <div className='maincont'>
                <input placeholder='Search by Job Title' onChange={(e) => setSearch(e.target.value)} className='searchbar'>
                </input>
                <div className='jobsdisplay'>
                    <div className='alljobs'>
                        <div>
                            <p className='sheader'>ALL JOBS</p>
                            <div className='pages'>
                                <p>Pages:</p>
                                {Array.from({ length: totalPagesForAllJobs }, (_, index) => (
                                    <button key={index + 1} onClick={() => handlePageChangeForAllJobs(index + 1)}>{index + 1}</button>
                                ))}
                            </div>
                        </div>

                        <div className='card-container'>
                            {error && <div className='errorism'>{error}</div>}

                            {allJobs.filter((job) => {
                                return search.toLowerCase() === '' ? job : job.jobtitle.toLowerCase().includes(search.toLowerCase())
                            }).map((job, index) => (
                                <div className='alljobscard' key={job.id} >

                                    <h3>{job.jobtitle}</h3>

                                    <p>Company: {job.company}</p>

                                    <p>Location: {job.location}</p>

                                    {expandedIndex === index && (
                                        <div className='deets'>
                                            <p>Skills Required:</p>
                                            <ul>
                                                {job.skillsreq.map((skill, idx) => (
                                                    <li key={idx}>{skill}</li>
                                                ))}
                                            </ul>
                                            <p>Contact Number: {job.cnum}</p>
                                            <p>Contact Person: {job.cper}</p>
                                            <div>
                                                <h2>About This Job:</h2>
                                                <p>{job.details}</p>
                                            </div>

                                        </div>
                                    )}

                                    <div className='butts'>
                                        <button onClick={() => handleToggleDetails(index)}>{expandedIndex === index ? 'Hide Details' : 'Details'}</button>
                                        <button onClick={() => handleApply(job._id)}>Apply</button>
                                    </div>

                                </div>
                            ))}
                        </div>


                    </div>

                    <div className='skilljobs'>

                        <p className='sheader'>SUGGESTED JOBS</p>
                        <div className='pages'>
                            <p>Pages:</p>
                            {Array.from({ length: totalPagesForSkillJobs }, (_, index) => (
                                <button key={index + 1} onClick={() => handlePageChangeForSkillJobs(index + 1)}>{index + 1}</button>
                            ))}
                        </div>
                        <div className='errorism'> {skillerror}</div>
                        {skillJobs.map((job, index) => (
                            <div className='alljobscard' key={job.id}>
                                <h3>{job.jobtitle}</h3>
                                <p>Company: {job.company}</p>
                                <p>Location: {job.location}</p>
                                {expandedSkillIndex === index && (
                                    <div className='deets'>
                                        <p>Skills Required:</p>
                                        <ul>
                                            {job.skillsreq.map((skill, idx) => (
                                                <li key={idx}>{skill}</li>
                                            ))}
                                        </ul>
                                        <p>Contact Number: {job.cnum}</p>
                                        <p>Contact Person: {job.cper}</p>
                                        <div>
                                            <h2>About This Job:</h2>
                                            <p>{job.details}</p>
                                        </div>
                                    </div>
                                )}

                                <div className='butts'>
                                    <button onClick={() => handleToggleSkillDetails(index)}>{expandedSkillIndex === index ? 'Hide Details' : 'Details'}</button>
                                    <button onClick={() => handleApply(job._id)}>Apply</button>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className='locationjobs'>
                        <p className='sheader'>JOBS FROM YOUR LOCATION</p>
                        <div className='pages'>
                            <p>Pages:</p>
                            {Array.from({ length: totalPagesForLocationJobs }, (_, index) => (
                                <button key={index + 1} onClick={() => handlePageChangeForLocationJobs(index + 1)}>{index + 1}</button>
                            ))}
                        </div>
                        <div className='errorism'> {locerror}</div>
                        {locationJobs.map((job, index) => (
                            <div className='alljobscard' key={job.id} >
                                <h3>{job.jobtitle}</h3>
                                <p>Company: {job.company}</p>
                                <p>Location: {job.location}</p>
                                {expandedLocationIndex === index && (
                                    <div className='deets'>
                                        <p>Skills Required:</p>
                                        <ul>
                                            {job.skillsreq.map((skill, idx) => (
                                                <li key={idx}>{skill}</li>
                                            ))}
                                        </ul>
                                        <p>Contact Number: {job.cnum}</p>
                                        <p>Contact Person: {job.cper}</p>
                                        <div>
                                            <h2>About This Job:</h2>
                                            <p>{job.details}</p>
                                        </div>
                                    </div>
                                )}
                                <div className='butts'>
                                    <button onClick={() => handleToggleLocationDetails(index)}>{expandedLocationIndex === index ? 'Hide Details' : 'Show Details'}</button>
                                    <button onClick={() => handleApply(job._id)}>Apply</button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div></>)}
    </>);
};

export default SearchJobs;
