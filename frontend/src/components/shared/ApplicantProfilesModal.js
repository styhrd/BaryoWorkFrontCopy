import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplicantProfilesModal = ({ applicants, closeModal }) => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const pageSize = 1;

    useEffect(() => {
        const fetchApplicantProfiles = async (page, limit) => {
            try {
                const token = localStorage.getItem('token');
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const applicantsForPage = applicants.slice(startIndex, endIndex);

                // Fetch profiles for each applicant asynchronously
                const profilesPromises = applicantsForPage.map(async (applicantId) => {
                    const response = await axios.get(`https://baryoworkcopyapi.onrender.com/api/v1/apply/getappprofile/${applicantId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return response.data; // Return the entire response data
                });

                // Wait for all profile fetch requests to complete
                const fetchedProfiles = await Promise.all(profilesPromises);
                setProfiles(fetchedProfiles);

                // Calculate total number of pages
                const totalProfiles = fetchedProfiles.length;
                const totalPages = Math.ceil(totalProfiles / pageSize) + 1;
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching applicant profiles:', error);

            }
        };

        // Fetch profiles for the initial page
        fetchApplicantProfiles(currentPage, pageSize);

    }, [applicants, currentPage]);


    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAcceptApplicant = async (applicantId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'https://baryoworkcopyapi.onrender.com/api/v1/apply/accept',
                { applicantId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Applicant Accepted')
            window.location.reload()
            // Optionally, update the UI or display a message indicating success
        } catch (error) {
            console.error('Error accepting applicant:', error);
            // Optionally, handle errors or display an error message
        }
    };

    const handleRejectApplicant = async (applicantId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'https://baryoworkcopyapi.onrender.com/api/v1/apply/reject',
                { applicantId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Applicant Rejected')
            window.location.reload();
            // Optionally, update the UI or display a message indicating success
        } catch (error) {
            console.error('Error rejecting applicant:', error);
            // Optionally, handle errors or display an error message
        }
    };

    return (
        <div className="profmodal">
            <div className="prof-modal-content">
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>

                <div className='contapplicant'>
                    <div className='jobsapps'><h2>APPLICANT PROFILES</h2></div>
                    {profiles.map(profile => (
                        <div key={profile._id} className='perapplicant'>
                            <h4>{profile.fullname}</h4>
                            <p>Email: {profile.email}</p>
                            <p>Description: {profile.description}</p>
                            <p>Location: {profile.location}</p>
                            <p>Skills: {profile.skills ? profile.skills.join(', ') : 'Skills not available'}</p>

                            <div className='formbutts jobbutts'><button className='buttsuccess' onClick={() => handleAcceptApplicant(profile.applicantId)}>Accept</button>
                                <button className='buttreject' onClick={() => handleRejectApplicant(profile.applicantId)}>Reject</button></div>

                        </div>
                    ))}

                </div>



                <div className="pagination jobbutts">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default ApplicantProfilesModal;
