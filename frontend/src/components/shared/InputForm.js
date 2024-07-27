import React from 'react';

const InputForm = ({ htmlFor, type, name, value, handleChange, placeholder }) => {
    return (
        <div>
            <input
                placeholder={placeholder}
                type={type}
                className='form-inpt'
                name={name}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default InputForm;
