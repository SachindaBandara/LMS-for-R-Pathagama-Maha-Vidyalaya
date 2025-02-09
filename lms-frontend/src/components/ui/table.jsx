// src/components/ui/table.jsx
import React from 'react';

export const Table = ({ children }) => (
  <table className="table">{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }) => <tr>{children}</tr>;

export const TableCell = ({ children }) => <td>{children}</td>;
