import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchAnalyticsData } from "../../api";
import { FiUsers, FiBook } from "react-icons/fi";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to load analytics data");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-maroon-900 text-center">
        Analytics Dashboard
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-500">Loading analytics...</p>
        </div>
      ) : analyticsData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-maroon-900">
              Gender Distribution
            </h2>
            <Doughnut
              data={{
                labels: ["Male", "Female"],
                datasets: [
                  {
                    data: [analyticsData.maleStudents, analyticsData.femaleStudents],
                    backgroundColor: ["#4B9CD3", "#FF6384"],
                    hoverBackgroundColor: ["#1E7BB7", "#FF3D6E"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>

          {/* Overall Stats */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-maroon-900">
              Overall Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiUsers className="text-3xl text-gold-500" />
                <p className="text-lg">
                  <strong>Total Students:</strong> {analyticsData.totalStudents}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FiBook className="text-3xl text-gold-500" />
                <p className="text-lg">
                  <strong>Total Courses:</strong> {analyticsData.totalCourses}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-500">No analytics data available.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
