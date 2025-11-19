import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) => {
    const baseStyles = {
        padding: '0.8rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        opacity: disabled ? 0.6 : 1,
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--primary-color), #8e44ad)',
            color: '#fff',
            boxShadow: '0 4px 15px var(--accent-glow)',
        },
        secondary: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-border)',
        },
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyles, ...variants[variant] }}
            className={className}
            whileHover={!disabled ? {
                scale: 1.05,
                boxShadow: variant === 'primary' ? '0 6px 20px var(--accent-glow)' : 'none'
            } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            {children}
        </motion.button>
    );
};

export default Button;
