import React, { useState } from 'react';

const EditEducationModal = ({ education, onUpdate, onCancel }) => {
    const [school, setSchool] = useState(education.school);
    const [startDate, setStartDate] = useState(education.startDate);
    const [endDate, setEndDate] = useState(education.endDate);
    const [course, setCourse] = useState(education.course);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEducation = {
            school,
            startDate,
            endDate,
            course
        };
        onUpdate(updatedEducation);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Edit Education</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="school">School:</label><br />
                    <input
                        type="text"
                        id="school"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
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

                    <label htmlFor="course">Course:</label><br />
                    <input
                        type="text"
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    /><br />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditEducationModal;
