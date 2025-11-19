import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = false, delay = 0 }) => {
    const cardStyle = {
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-md)',
    };

    return (
        <motion.div
            className={`glass-panel ${className}`}
            style={cardStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
            } : {}}
        >
            {children}
        </motion.div>
    );
};

export default Card;
