'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    className = '',
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#00E676] text-black hover:bg-[#00C853] shadow-[0_0_15px_rgba(0,230,118,0.4)] hover:shadow-[0_0_25px_rgba(0,230,118,0.6)] focus:ring-[#00E676]",
        secondary: "bg-white text-black hover:bg-gray-100 shadow-lg focus:ring-white",
        outline: "border-2 border-[#00E676] text-[#00E676] hover:bg-[#00E676] hover:text-black hover:shadow-[0_0_15px_rgba(0,230,118,0.3)] focus:ring-[#00E676]",
        ghost: "text-gray-300 hover:text-white hover:bg-white/5 focus:ring-gray-400"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
