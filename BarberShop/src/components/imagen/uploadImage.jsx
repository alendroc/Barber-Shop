import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ onImageUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const res = await axios.post('http://localhost:9001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res.data);
                onImageUpload(res.data.filePath); // Use filePath instead of imageUrl
            } catch (err) {
                console.error('Error al subir la imagen:', err);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default UploadImage;
