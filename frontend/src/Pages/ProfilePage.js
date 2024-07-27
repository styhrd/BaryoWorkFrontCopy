import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateProfileForm from '../components/shared/UpdateProfileForm';
import CreateProfileForm from '../components/shared/createProfile'; // Import the update profile form component
import ExperienceForm from '../components/shared/Experience';
import EducationForm from '../components/shared/Education';
import '../styles/profile.css'


const ProfilePage = () => {
    // State variables
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasProfile, setHasProfile] = useState(false); // New state to track if user has profile
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the update modal visibility

    //EXP
    const [showexpmodal, setshowexpmodal] = useState(false);
    const [experienceDetails, setExperienceDetails] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [showUpdateExpModal, setShowUpdateExpModal] = useState(false);
    const [updatedExperience, setUpdatedExperience] = useState(null);
    const [imageFilename, setImageFilename] = useState(null);
    //EDUC
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [educationDetails, setEducationDetails] = useState([]);
    const [selectedEducation, setselectedEducation] = useState(null);
    const [showUpdateEducModal, setshowUpdateEducModal] = useState(false);
    const [updatedEducation, setupdatedEducation] = useState(null);

    const [fullname, setFullname] = useState('');
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
                setProfile(response.data.profile);
                setHasProfile(response.data.profile !== null);

                const imageId = response.data.profile.image

                const imageResponse = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/image/get-image/${imageId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setImageFilename(imageResponse.data.image.image);
                console.log(imageFilename)
                // Extract experience IDs from the profile and fetch details
                const experienceIds = response.data.profile.experience || [];
                const educationIds = response.data.profile.education || [];

                fetchExperienceDetails(experienceIds);
                fetchEducationDetails(educationIds);

            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

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

            }
        };

        fetchUserFullname();

    }, []);



    // Function to fetch details of each experience
    const fetchExperienceDetails = async (experienceIds) => {
        try {
            const token = localStorage.getItem('token');
            const detailsPromises = experienceIds.map(async (id) => {
                const response = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/experience/get-exp/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                return response.data.experience;
            });
            const experienceData = await Promise.all(detailsPromises);
            setExperienceDetails(experienceData);
        } catch (error) {
            console.error('Error fetching experience details:', error);
            setError('Failed to fetch experience details');
        }
    };

    const fetchEducationDetails = async (educationIds) => {
        try {
            const token = localStorage.getItem('token');
            const detailsPromises2 = educationIds.map(async (id) => {
                const response2 = await axios.get(
                    `https://baryoworkcopyapi.onrender.com/api/v1/education/get-educ/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                return response2.data.education; // Corrected from response2.data.experience
            });
            const educationData = await Promise.all(detailsPromises2);
            setEducationDetails(educationData);
        } catch (error) {
            console.error('Error fetching education details:', error);
            setError('Failed to fetch education details');
        }
    };


    //UPDATE EDUCATION
    const updateEducation = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `https://baryoworkcopyapi.onrender.com/api/v1/education/update-educ/${selectedEducation._id}`, // Make sure the URL is correct
                updatedEducation, // Send the updatedEducation object as the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Update the education in the UI
            const updatedIndex2 = educationDetails.findIndex(educ => educ._id === selectedEducation._id);
            const updatedDetails2 = [...educationDetails];
            updatedDetails2[updatedIndex2] = response.data.education;
            setEducationDetails(updatedDetails2);
            // Close the modal
            toggleUpdateEducModal();
        } catch (error) {
            console.error('Error updating education:', error);
            setError('Failed to update education');
        }
    };
    const handleEditEducation = (education) => {
        setselectedEducation(education);
        setupdatedEducation({ ...education }); // Initialize updated experience with current experience details
        toggleUpdateEducModal(); // Open the modal for editing
    };

    const deleteEducation = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `https://baryoworkcopyapi.onrender.com/api/v1/education/delete-educ/${id}`, // Endpoint for deleting education
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Remove the deleted education from the UI
            setEducationDetails(educationDetails.filter(educ => educ._id !== id));
        } catch (error) {
            console.error('Error deleting education:', error);
            setError('Failed to delete education');
        }
    };



    // Function to toggle the update modal visibility
    const toggleUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    };

    // Function to toggle the add experience modal visibility
    const toggleExpModal = () => {
        setshowexpmodal(!showexpmodal);
    };

    // Function to toggle the update experience modal visibility
    const toggleUpdateExpModal = () => {
        setShowUpdateExpModal(!showUpdateExpModal);
    };

    const toggleEducationModal = () => {
        setShowEducationModal(!showEducationModal);
    };

    const toggleUpdateEducModal = () => {
        setshowUpdateEducModal(!showUpdateEducModal);
    };


    const fetchAndSetProfileId = async () => {
        try {
            // Get the user ID from local storage
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                console.error('User ID or token not found in local storage');
                return;
            }

            // Fetch the user data
            const response = await axios.get(`https://baryoworkcopyapi.onrender.com/api/v1/user/get-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Extract profile ID from the user object in the response
            const profileId = response.data.user.profile;

            // Add the profile ID to local storage
            localStorage.setItem('profileId', profileId);
            console.log('Profile ID has been set in local storage:', profileId);
        } catch (error) {
            console.error('Error fetching user profile ID:', error);
        }
    };

    fetchAndSetProfileId()


    // Function to handle deletion of an experience
    const deleteExperience = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `https://baryoworkcopyapi.onrender.com/api/v1/experience/delete-exp/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Remove the deleted experience from the UI
            setExperienceDetails(experienceDetails.filter(exp => exp._id !== id));
        } catch (error) {
            console.error('Error deleting experience:', error);
            setError('Failed to delete experience');
        }
    };



    // Function to handle updating an experience
    const updateExperience = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `https://baryoworkcopyapi.onrender.com/api/v1/experience/update-exp/${selectedExperience._id}`,
                updatedExperience,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Update the experience in the UI
            const updatedIndex = experienceDetails.findIndex(exp => exp._id === selectedExperience._id);
            const updatedDetails = [...experienceDetails];
            updatedDetails[updatedIndex] = response.data.experience;
            setExperienceDetails(updatedDetails);
            // Close the modal
            toggleUpdateExpModal();
        } catch (error) {
            console.error('Error updating experience:', error);
            setError('Failed to update experience');
        }
    };

    // Function to handle editing an experience
    const handleEditExperience = (experience) => {
        setSelectedExperience(experience);
        setUpdatedExperience({ ...experience }); // Initialize updated experience with current experience details
        toggleUpdateExpModal(); // Open the modal for editing
    };


    // You can use the hasProfile variable to conditionally render components or perform other actions
    return (
        <>
            {hasProfile ? (
                <div className='profilepage'>
                    {/* Render components for users with profile */}
                    <div className='welcies'>
                        <h1>PROFILE</h1>
                    </div>
                    <div className='imgcont'>
                        <div className='profimg'>
                            {imageFilename && ( // Check if imageFilename exists
                                <img src={`/assets/images/uploads/${imageFilename} `} alt={`${imageFilename}`} />
                            )}
                        </div>



                        <div className='profdeets'>
                            <h3>{fullname}</h3>
                            <p>{profile.description}</p>
                            <p>Location: {profile.location}</p>
                            <p>Skills: {profile.skills.join(', ')}</p>
                            <div className='profbutts'>
                                <button onClick={toggleUpdateModal}>Edit Profile</button>
                                <button onClick={toggleExpModal}>Add Experience</button>
                                <button onClick={toggleEducationModal}>Add Education</button>
                            </div>

                        </div>

                    </div>


                    {showUpdateModal && (
                        <div className="profmodal">
                            <div className="prof-modal-content">

                                <svg onClick={toggleUpdateModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                                <UpdateProfileForm profile={profile} />
                            </div>
                        </div>
                    )}

                    {showexpmodal && (
                        <div className="profmodal">
                            <div className="prof-modal-content">
                                <svg onClick={toggleExpModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                                <ExperienceForm /> {/* Pass the profile data to the update form */}
                            </div>
                        </div>
                    )}

                    {showEducationModal && (
                        <div className="profmodal">
                            <div className="prof-modal-content">
                                <svg onClick={toggleEducationModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                                <EducationForm /> {/* Render the EducationForm component inside the modal */}
                            </div>
                        </div>
                    )}


                    <div className='profexp'>

                        <h2>EXPERIENCE</h2>
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error: {error}</div>
                        ) : (
                            <div className='exp'>
                                {experienceDetails.map((experience, index) => (
                                    <div className='expcard' key={index}>
                                        <h3>{experience.company}</h3>
                                        <p>Start Date: {new Date(experience.startDate).toISOString().split('T')[0]}</p>
                                        <p>End Date: {new Date(experience.endDate).toISOString().split('T')[0]}</p>
                                        <div className='breaks'> <p>Details: {experience.details}</p></div>


                                        <div className='expbutts'>
                                            <button onClick={() => deleteExperience(experience._id)}>Delete</button>

                                            <button onClick={() => handleEditExperience(experience)}>Edit</button>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        )}
                    </div>

                    <div className='profeduc'>
                        <h2>EDUCATION</h2>
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error: {error}</div>
                        ) : (
                            <div className='educations'>
                                {educationDetails.map((education, index) => (
                                    <div className='educcard' key={index}>
                                        {education.school && <h3>{education.school}</h3>}
                                        <p>Start Date: {new Date(education.startDate).toISOString().split('T')[0]}</p>
                                        <p>End Date: {new Date(education.endDate).toISOString().split('T')[0]}</p>
                                        <p>Course: {education.course}</p>

                                        <div className='expbutts'>
                                            <button onClick={() => deleteEducation(education._id)}>Delete</button>
                                            {/* Add button to edit education */}
                                            <button onClick={() => handleEditEducation(education)}>Edit</button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>







                </div>
            ) : (
                <div className='profconts'>
                    {/* Render components for users without profile */}
                    <CreateProfileForm />
                    {/* Render the form to create a profile here */}
                </div>
            )}

            {/* Render the update experience modal */}
            {showUpdateExpModal && selectedExperience && (
                <div className="profmodal">
                    <div className="prof-modal-content">
                        <svg onClick={toggleUpdateExpModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>

                        <div className='profupdate'>
                            <form onSubmit={updateExperience} className='formfield2'>
                                <div className='cents'>
                                    <h2>EDIT EXPERIENCE</h2>
                                </div>
                                <label htmlFor="company">Company:</label>
                                <input
                                    type="text"
                                    id="company"
                                    value={updatedExperience.company}
                                    onChange={(e) => setUpdatedExperience({ ...updatedExperience, company: e.target.value })}
                                    required
                                />

                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={updatedExperience.startDate}
                                    onChange={(e) => setUpdatedExperience({ ...updatedExperience, startDate: e.target.value })}
                                    required
                                />

                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={updatedExperience.endDate}
                                    onChange={(e) => setUpdatedExperience({ ...updatedExperience, endDate: e.target.value })}
                                    required
                                />

                                <label htmlFor="details">Details:</label>
                                <textarea
                                    id="details"
                                    value={updatedExperience.details}
                                    onChange={(e) => setUpdatedExperience({ ...updatedExperience, details: e.target.value })}
                                    required
                                />
                                <br></br>
                                <div className='formbutts'><button type="submit">Update</button></div>

                            </form>
                        </div>

                    </div>
                </div>
            )}

            {showUpdateEducModal && selectedEducation && (
                <div className="profmodal">
                    <div className="prof-modal-content">
                        <svg onClick={toggleUpdateEducModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                        <div className='profupdate'>
                            <form onSubmit={updateEducation} className='formfield2'>
                                <div className='cents'>
                                    <h2>EDIT EDUCATION</h2>
                                </div>
                                <label htmlFor="school">School:</label>
                                <input
                                    type="text"
                                    id="school"
                                    value={updatedEducation.school}
                                    onChange={(e) => setupdatedEducation({ ...updatedEducation, school: e.target.value })}
                                    required
                                />

                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={updatedEducation.startDate}
                                    onChange={(e) => setupdatedEducation({ ...updatedEducation, startDate: e.target.value })}
                                    required
                                />

                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={updatedEducation.endDate}
                                    onChange={(e) => setupdatedEducation({ ...updatedEducation, endDate: e.target.value })}
                                    required
                                />

                                <label htmlFor="course">Course:</label>
                                <input
                                    type="text"
                                    id="course"
                                    value={updatedEducation.course}
                                    onChange={(e) => setupdatedEducation({ ...updatedEducation, course: e.target.value })}
                                    required
                                />
                                <div className='formbutts'> <button type="submit">Update</button></div>

                            </form>
                        </div>
                        {/* Render the form to edit the education */}

                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
