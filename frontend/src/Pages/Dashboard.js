import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/dash.css';
import '../styles/MyApps.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
const Dashboard = () => {
    const [fullname, setFullname] = useState('');
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        const fetchUserFullname = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://baryoworkcopyapi.onrender.com/api/v1/user/get-user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFullname(response.data.user.fullname);
            } catch (error) {
                console.error('Error fetching user fullname:', error);
                toast.error('Failed to fetch user fullname');
            }
        };

        fetchUserFullname();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://baryoworkcopyapi.onrender.com/api/v1/profile/get-profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setHasProfile(response.data.profile !== null); // Update hasProfile state
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    const [joberror, setjoberror] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://baryoworkcopyapi.onrender.com/api/v1/job/get-jobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        sortBy: 'createdAt',
                        sortOrder: 'desc',
                        limit: 5
                    }
                });
                setJobs(response.data.jobs);
                setLoading(false);
            } catch (joberror) {
                setLoading(false);
                console.error('There are no Jobs Available Right now.');
                setjoberror('There are no Available Jobs For You...')
            }
        };

        fetchJobs();
    }, []);

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
            console.log('Application successful');
            window.location.reload();
            toast.success('Application successful');
        } catch (error) {
            console.error('Error applying to job:', error);
            toast.error('Failed to apply to job');
        }
    };

    const handleViewDetails = (job) => {
        setSelectedJob(selectedJob === job ? null : job);
    };
    const [ajerror, setajerror] = useState('');
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://baryoworkcopyapi.onrender.com/api/v1/apply/appliedJobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Filter applied jobs based on the user ID and limit to 5
                const userAppliedJobs = response.data.appliedJobs
                    .filter(job => job.userId === localStorage.getItem('userId'))
                    .slice(0, 5);
                setAppliedJobs(userAppliedJobs);
            } catch (ajerror) {
                console.error('Apply Jobs to See Your Applications');
                setajerror('Apply Jobs to see Your Applications here...')
            }
        };

        fetchAppliedJobs();
    }, []);

    return (
        <> {loading ? (<Spinner />) : (<>
            <div className='welcies'>
                <h1>DASHBOARD</h1>
                {fullname && <p className='welc'>Welcome, {fullname}</p>}
            </div>

            {/* Render the modal if the user doesn't have a profile */}
            {!hasProfile && (
                <div className='profmodal'>
                    <div className='prof-modal-content prof-modal-content2'>
                        <h1>Create a Profile</h1>
                        <p>You need to create a profile to apply for jobs.</p>
                        <Link to='/profile'>Create Profile</Link>
                    </div>

                </div>
            )}

            <div className='dashlinks'>
                <h2 className='header'>LATEST JOBS:</h2>
                <Link to={'/searchjobs'}>See More <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5" />
                </svg></Link>
            </div>
            <div className='errorism'>{joberror}</div>
            <div className='job-list'>

                {jobs.map((job) => (
                    <div key={job._id} className='dashlatest'>
                        <div className='dashcard'>
                            <h3>{job.jobtitle}</h3>
                            <p>Company: {job.company}</p>
                            <p>Location: {job.location}</p>
                        </div>
                        {selectedJob && selectedJob._id === job._id && (
                            <div className=''>
                                <div className='deets'>
                                    <p>Skills Required:
                                        {job.skillsreq.map((skill, idx) => (
                                            <li key={idx}>{skill}</li>
                                        ))}
                                    </p>
                                    <p>Contact Number: {selectedJob.cnum}</p>
                                    <p>Contact Person: {selectedJob.cper}</p>
                                    <div className='abt'>
                                        <h2>About This Job:</h2>
                                        <p>{selectedJob.details}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='butts'>
                            <button onClick={() => handleViewDetails(job)}>Details</button>
                            <button onClick={() => handleApply(job._id)}>Apply</button>
                        </div>
                    </div>
                ))}
            </div>


            <div className='dashlinks'>
                <h2 className='header'>APPLICATIONS:</h2>
                <Link to={'/myapps'}>See More <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5" />
                </svg></Link>
            </div>
            <div className='errorism'>{ajerror}</div>
            <div className='applied-jobs'>

                {appliedJobs.map((appliedJob) => (
                    <AppliedJobDetails key={appliedJob._id} appliedJob={appliedJob} />
                ))}
            </div>

            <div className='listings'>
                <div className='dashlinks'>
                    <h2 className='header'>YOUR LISTINGS:</h2>
                    <Link to={'/hire'}>See More <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5" />
                    </svg></Link>
                </div>
                <JobListings />
            </div>
        </>)}


        </>
    );
};

const AppliedJobDetails = ({ appliedJob }) => {
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/job/get-job/${appliedJob.jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }, params: {
                        limit: 5
                    }
                });
                setJobDetails(response.data.job);
            } catch (ajerror) {
                console.error(`Error fetching job details for job ID ${appliedJob.job._id}:`);

            }
        };

        fetchJobDetails();
    }, [appliedJob.jobId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#E8EC42';
            case 'accepted':
                return '#48BC2B';
            case 'rejected':
                return '#E93636 ';
            default:
                return 'black'; // Default color if status is not recognized
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (<>
        <div className='aj'>
            <div className='heads'>
                <div className="status-circle" style={{ backgroundColor: getStatusColor(appliedJob.status) }}><p>jsahdjksa</p></div>
                <h3>{jobDetails && jobDetails.company}</h3>
            </div>

            <p>{jobDetails && jobDetails.jobtitle}</p>
            <p>Location: {jobDetails && jobDetails.location}</p>
            <p>Number: {jobDetails && jobDetails.cnum}</p>
            <p>Status: <b>{capitalizeFirstLetter(appliedJob.status)}</b></p>
        </div>
    </>);
};

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [jerror, setjerror] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/v1/job/created-jobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }, params: {
                        limit: 5
                    }
                });
                setJobs(response.data.jobs);
            } catch (jerror) {
                console.error('Add Listings to see it here');
                setjerror('Add Job Listings to see it here... ')
            }
        };

        fetchJobs();
    }, []);

    return (<>{jerror && <div className='errorism'>
        <p>{jerror}</p>
    </div>}
        <div className='dashjobs'>


            {jobs.map((job) => (
                <div key={job._id} className='job'>
                    <h3>{job.jobtitle}</h3>
                    <p>Company: {job.company}</p>
                    <p>Location: {job.location}</p>
                    <button><Link to={'/hire'}>Manage</Link></button>
                </div>

            ))}
        </div>
    </>);
};

export default Dashboard;
