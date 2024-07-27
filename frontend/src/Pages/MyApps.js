import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
const MyApps = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const perPage = 15; // Number of applied jobs per page

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/v1/apply/appliedJobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        page: currentPage,
                        limit: perPage // Use 'limit' instead of 'perPage'
                    }
                });
                const userAppliedJobs = response.data.appliedJobs.filter(job => job.userId === localStorage.getItem('userId'));
                setAppliedJobs(userAppliedJobs);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
                setError('You have not applied to any jobs...');
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [currentPage, perPage]); // Add 'perPage' to the dependency array

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (appliedJobId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/v1/apply/deleteaj/${appliedJobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // After successful deletion, update the appliedJobs state to reflect the change
            setAppliedJobs(prevAppliedJobs => prevAppliedJobs.filter(job => job._id !== appliedJobId));
        } catch (error) {
            console.error('Error deleting applied job:', error);
            toast.success('Deleted Succesfully')
        }
    };

    return (<> {loading ? (<Spinner />) : (<>
        <div>
            <div className='welcies'>
                <h1>MY APPLICATIONS</h1>
            </div>
            <div className='pages'>
                <p>Pages: </p>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePaginationClick(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>

            {error && <div className='errorism'>{error}</div>}
            <div className='applied-jobs'>
                {appliedJobs.map(appliedJob => (
                    <AppliedJobDetails key={appliedJob._id} appliedJob={appliedJob} onDelete={handleDelete} />
                ))}
            </div>


        </div>
    </>)}


    </>);
};

const AppliedJobDetails = ({ appliedJob, onDelete }) => {
    const [jobDetails, setJobDetails] = useState(null);
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/v1/job/get-job/${appliedJob.jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobDetails(response.data.job);
            } catch (error) {
                console.error(`Error fetching job details for job ID ${appliedJob.job._id}:`, error);
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        };

        fetchJobDetails();
        setFormattedDate(formatDate(appliedJob.appliedAt));
    }, [appliedJob.jobId, appliedJob.appliedAt]);

    const handleDeleteClick = () => {
        onDelete(appliedJob._id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#E8EC42'; // Yellow
            case 'accepted':
                return '#48BC2B'; // Green
            case 'rejected':
                return '#E93636'; // Red
            default:
                return 'black'; // Default color if status is not recognized
        }
    };

    return (
        <div className='aj'>
            <div className='heads'>
                <div className='status-circle' style={{ backgroundColor: getStatusColor(appliedJob.status) }}><p>asasd</p></div>
                <h3>{jobDetails && jobDetails.company}</h3>
            </div>
            <p>{jobDetails && jobDetails.jobtitle}</p>

            <p>Contact Number: {jobDetails && jobDetails.cnum}</p>
            <p>Status: {appliedJob.status}</p>
            <p>Applied At: {formattedDate}</p>
            {(appliedJob.status === 'rejected' || appliedJob.status === 'accepted') && (
                <button onClick={handleDeleteClick}>Delete</button>
            )}
        </div>
    );
};

export default MyApps;
