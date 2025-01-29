"use client"

import React from 'react';

const Alert = ({ children, type = 'info', className = '' }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  }[type];

  return (
    <div className={`${bgColor} border-l-4 p-4 rounded ${className}`}>
      {children}
    </div>
  );
};

export default Alert;