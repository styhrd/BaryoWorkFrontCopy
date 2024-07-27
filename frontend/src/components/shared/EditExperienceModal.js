import React, { useState } from 'react';

const EditExperienceModal = ({ experience, onUpdate, onCancel }) => {
    const [company, setCompany] = useState(experience.company);
    const [startDate, setStartDate] = useState(experience.startDate);
    const [endDate, setEndDate] = useState(experience.endDate);
    const [details, setDetails] = useState(experience.details);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExperience = {
            company,
            startDate,
            endDate,
            details
        };
        onUpdate(updatedExperience);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Edit Experience</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="company">Company:</label><br />
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="startDate">Start Date:</label><br />
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="endDate">End Date:</label><br />
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="details">Details:</label><br />
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    /><br />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditExperienceModal;
