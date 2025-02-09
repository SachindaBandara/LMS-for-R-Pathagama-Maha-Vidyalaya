// src/components/ui/select.jsx
import React from 'react';

export const Select = ({ children }) => (
  <select className="select">{children}</select>
);

export const SelectTrigger = ({ children }) => (
  <div className="select-trigger">{children}</div>
);

export const SelectContent = ({ children }) => (
  <div className="select-content">{children}</div>
);

export const SelectItem = ({ children, value }) => (
  <option className="select-item" value={value}>
    {children}
  </option>
);

export const SelectValue = ({ children }) => (
  <span className="select-value">{children}</span>
);
