"use client"

import React from 'react';

const Button = ({ children, onClick, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
