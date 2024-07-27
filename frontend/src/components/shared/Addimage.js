import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddImage = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('testImage', image);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };
            // Make the POST request to upload the image
            const response = await axios.post('http://localhost:8080/api/v1/image/upload-image', formData, config);
            console.log('Image uploaded successfully:', response.data);
            localStorage.setItem('imageId', response.data.image._id);
            window.location.reload()
            // Redirect or perform any necessary actions after successful upload
            navigate('/dashboard'); // Redirect to the dashboard page, for example
        } catch (error) {
            setError('Failed to upload image');
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='addimage'>
            <h2>ADD IMAGE</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit" disabled={loading}>Upload Image</button>
            </form>
        </div>
    );
};

export default AddImage;
