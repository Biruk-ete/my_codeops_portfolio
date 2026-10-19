import React from 'react';
import './Loader.css';

const Loader = ({ size = 40, message = 'Loading...' }) => {
    return (
        <div className="loader-wrapper">
            <div
                className="loader-spinner"
                style={{ width: size, height: size }}
            ></div>
            {message && <p className="loader-message">{message}</p>}
        </div>
    );
};

export default Loader;