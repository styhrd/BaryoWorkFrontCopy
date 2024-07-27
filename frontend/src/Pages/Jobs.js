import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateJobForm from '../components/shared/CreateJobs';
import UpdateJobForm from '../components/shared/UpdateJobForm';
import ApplicantProfilesModal from '../components/shared/ApplicantProfilesModal';
import AcceptedProfiles from '../components/shared/acceptedprofiles';
import '../styles/jobs.css'
import Spinner from '../components/shared/Spinner';

const Jobs = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showProfilesModal, setShowProfilesModal] = useState(false);
    const [showAcceptedProfiles, setShowAcceptedProfiles] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedApplicants, setSelectedApplicants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);


    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleShowUpdateModal = (id) => {
        setSelectedJobId(id);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedJobId(null);
    };

    const handleShowProfilesModal = (applicants) => {
        setSelectedApplicants(applicants);
        setShowProfilesModal(true);
    };

    const handleCloseProfilesModal = () => {
        setShowProfilesModal(false);
        setSelectedApplicants([]);
    };

    const handleShowAcceptedProfiles = (acceptedApplicants) => {
        setSelectedApplicants(acceptedApplicants);
        setShowAcceptedProfiles(true);
    };

    const handleCloseAcceptedProfiles = () => {
        setShowAcceptedProfiles(false);
        setSelectedApplicants([]);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:8080/api/v1/job/created-jobs',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            page: currentPage,
                            limit: 8
                        }
                    }
                );
                setLoading(false);
                setJobs(response.data.jobs);
                setTotalPages(response.data.totalPages); // Set total pages
            } catch (error) {
                setLoading(false);
                console.error('Error fetching created jobs:', error);
                setError('You have not created any listings...');
            }
        };

        fetchJobs();
    }, [currentPage]);


    const handleDeleteJob = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:8080/api/v1/job/delete-job/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            console.log('Job deleted successfully');
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Error deleting job');
        }
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (<> {loading ? (<Spinner />) : (<>
        <div>
            <div className='welcies'>
                <h1>LISTINGS</h1>
            </div>
            <div className='addlisting'>
                <button onClick={handleShowCreateModal}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>Add A Listing</button>
            </div>


            {showCreateModal && (
                <div className="profmodal">
                    <div className="prof-modal-content">
                        <svg onClick={handleCloseCreateModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                        <CreateJobForm />
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="profmodal">
                    <div className="prof-modal-content">
                        <svg onClick={handleCloseUpdateModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                        <UpdateJobForm jobId={selectedJobId} />
                    </div>
                </div>
            )}

            {showProfilesModal && (
                <ApplicantProfilesModal applicants={selectedApplicants} closeModal={handleCloseProfilesModal} />

            )}

            {showAcceptedProfiles && selectedApplicants.length > 0 && ( // Show AcceptedProfiles component only if selectedApplicants array is not empty
                <AcceptedProfiles acceptedApplicants={selectedApplicants} closeModal={handleCloseAcceptedProfiles} />
            )}
            <div className='pages'>
                <p>Pages: </p>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className='errorism'>{error}</div>

            <div className='yourjobs'>
                {jobs.map(job => (
                    <div className='perjob' key={job._id}>
                        <div className='jobtitle'>
                            <h2>{job.company}</h2>
                            <button onClick={() => handleShowUpdateModal(job._id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg></button>
                        </div>

                        <p>Title: {job.jobtitle}</p>
                        <p>Location: {job.location}</p>
                        <p>Skills:</p>
                        <ul>
                            {job.skillsreq.map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                            ))}
                        </ul>
                        <p> Details: {job.details}</p>
                        <p> Applicants: {job.applications.length}</p>
                        <p> Accepted: {job.acceptedapplicants.length}</p>
                        <div className='jobbutts'>
                            <button onClick={() => handleDeleteJob(job._id)}>Delete</button>

                            <button onClick={() => handleShowProfilesModal(job.applications)}>Applicants</button>
                            <button onClick={() => handleShowAcceptedProfiles(job.acceptedapplicants)}>Accepted Applicants</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    </>)}

    </>);
};

export default Jobs;
