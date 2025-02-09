// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => (
  <div className="card">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);
