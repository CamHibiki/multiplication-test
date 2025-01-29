"use client"

import React from 'react';

const Input = ({ value, onChange, type = 'text', className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;