// MyComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/feedback/', { author: "admin123", answer: "admin", mark: "4" });
            setData(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
            {data && <div>{JSON.stringify(data)}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default MyComponent;
