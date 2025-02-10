import React from "react";
import {
  FiBookOpen,
  FiClipboard,
  FiUsers,
  FiBarChart,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Sidebar from './Sidebar';

const AnalyticsPage = () => {
  const data = [
    { name: "Students", value: 80 },
    { name: "Courses", value: 12 },
    { name: "Assignments", value: 30 },
    { name: "Lessons", value: 50 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="flex min-h-screen bg-gray-100">
           {/* Sidebar */}
    <Sidebar/>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Analytics</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Additional Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Total Students:</span>
                <span>80</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Total Courses:</span>
                <span>12</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Total Assignments:</span>
                <span>30</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Total Lessons:</span>
                <span>50</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
