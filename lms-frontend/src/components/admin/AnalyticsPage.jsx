import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FiUsers, FiBook, FiSettings, FiActivity, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import Sidebar from "./Sidebar"; 
import axios from 'axios';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const [stats, setStats] = useState({
    students: 60,
    teachers: 30,
    courses: 10,
    attendance: 85,
    activeCourses: 8,
    assignmentsDue: 5,
    newMessages: 12,
    pendingApprovals: 3,
    recentActivities: [
      { _id: '1', description: 'Student A submitted Assignment 1', timestamp: new Date() },
      { _id: '2', description: 'Teacher B graded Assignment 2', timestamp: new Date() },
      { _id: '3', description: 'Course C was updated', timestamp: new Date() },
    ],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    const fetchAnalytics = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchAnalytics();
  }, []);

  const ChartCard = ({ title, value, color, Icon }) => {
    const data = {
      labels: ['Value', 'Remaining'],
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: [color, '#f0f0f0'],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: '80%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-maroon-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color.replace('text', 'bg')} bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
        <div className="w-full h-40">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    );
  };

  const QuickStatCard = ({ title, value, color, Icon }) => (
    <div className={`p-4 ${color} rounded-lg`}>
      <p className="text-sm text-white">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">System Analytics</h1>
          <p className="text-gray-600">Key performance indicators and statistics</p>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading analytics...</p>
        ) : (
          <>
            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ChartCard
                title="Total Students"
                value={stats.students}
                color="text-blue-500"
                Icon={FiUsers}
              />
              <ChartCard
                title="Total Teachers"
                value={stats.teachers}
                color="text-green-500"
                Icon={FiUsers}
              />
              <ChartCard
                title="Courses Offered"
                value={stats.courses}
                color="text-purple-500"
                Icon={FiBook}
              />
              <ChartCard
                title="Avg. Attendance"
                value={stats.attendance}
                color="text-gold-500"
                Icon={FiActivity}
              />
            </div>

            {/* Additional Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {stats.recentActivities.map((activity) => (
                    <div key={activity._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-gold-100 rounded-lg mr-4">
                        <FiActivity className="text-gold-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Quick Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <QuickStatCard
                    title="Active Courses"
                    value={stats.activeCourses}
                    color="bg-blue-500"
                    Icon={FiBook}
                  />
                  <QuickStatCard
                    title="Assignments Due"
                    value={stats.assignmentsDue}
                    color="bg-green-500"
                    Icon={FiActivity}
                  />
                  <QuickStatCard
                    title="New Messages"
                    value={stats.newMessages}
                    color="bg-purple-500"
                    Icon={FiMessageSquare}
                  />
                  <QuickStatCard
                    title="Pending Approvals"
                    value={stats.pendingApprovals}
                    color="bg-gold-500"
                    Icon={FiCheckCircle}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AnalyticsPage;