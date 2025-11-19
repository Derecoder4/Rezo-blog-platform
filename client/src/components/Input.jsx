import React from 'react';

const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    label,
    rows = 4,
    className = ''
}) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem',
        width: '100%',
    };

    const labelStyle = {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: '500',
        marginLeft: '0.2rem',
    };

    const inputStyle = {
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--surface-border)',
        background: 'rgba(0, 0, 0, 0.2)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        width: '100%',
        resize: 'vertical',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--primary-color)';
        e.target.style.boxShadow = '0 0 0 2px rgba(100, 108, 255, 0.2)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'var(--surface-border)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={containerStyle} className={className}>
            {label && <label style={labelStyle}>{label}</label>}
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
};

export default Input;
