// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    className="input"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
  />
);
