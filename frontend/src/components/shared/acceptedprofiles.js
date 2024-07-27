import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptedProfiles = ({ acceptedApplicants, closeModal }) => {
    const [acceptedProfiles, setAcceptedProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 1;

    useEffect(() => {
        const fetchAcceptedProfiles = async (page, limit) => {
            try {
                const token = localStorage.getItem('token');
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const applicantsForPage = acceptedApplicants.slice(startIndex, endIndex);
                // Assuming the acceptedApplicants array contains the IDs of applicants
                const profilesPromises = applicantsForPage.map(async (applicantId) => {
                    const response = await axios.get(`http://localhost:8080/api/v1/apply/getappprofile/${applicantId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return response.data; // Return the entire response data
                });

                // Wait for all profile fetch requests to complete
                const fetchedProfiles = await Promise.all(profilesPromises);
                setAcceptedProfiles(fetchedProfiles);
                const totalProfiles = fetchedProfiles.length;
                const totalPages = Math.ceil(totalProfiles / pageSize) + 1;
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching accepted profiles:', error);
                setError('Error fetching accepted profiles');
            }
        };

        fetchAcceptedProfiles(currentPage, pageSize);
    }, [acceptedApplicants, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="profmodal">
            <div className="prof-modal-content">
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>

                <div className='contapplicant'>
                    <div className='jobsapps'><h2>APPLICANT PROFILES</h2></div>
                    {acceptedProfiles.map(profile => (
                        <div key={profile._id} className='perapplicant'>
                            <h4>{profile.fullname}</h4>
                            <p>Email: {profile.email}</p>
                            <p>Description: {profile.description}</p>
                            <p>Location: {profile.location}</p>
                            <p>Skills: {profile.skills.join(', ')}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination jobbutts">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
                </div>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default AcceptedProfiles;
