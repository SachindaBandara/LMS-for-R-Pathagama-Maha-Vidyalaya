// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => (
  <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
    {children}
  </button>
);
