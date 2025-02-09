import React from 'react';
import { FiClipboard, FiCheckCircle, FiAlertTriangle, FiClock, FiUpload, FiBookOpen, FiCalendar , FiBarChart} from 'react-icons/fi';
import { FaGraduationCap, FaRegChartBar } from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Grades = () => {
  // Sample data for grades (modify as per your real data)
  const gradeData = {
    labels: ['Math', 'Science', 'English', 'History', 'Geography'],
    datasets: [
      {
        label: 'Grades',
        data: [85, 92, 76, 88, 95],
        backgroundColor: ['#ff9800', '#4caf50', '#f44336', '#2196f3', '#9c27b0'],
        borderColor: ['#ff9800', '#4caf50', '#f44336', '#2196f3', '#9c27b0'],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for grade distribution (for doughnut chart)
  const gradeDistribution = {
    labels: ['A (90+)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (<60)'],
    datasets: [
      {
        label: 'Grade Distribution',
        data: [3, 5, 2, 1, 0],
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336', '#9e9e9e'],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon-900 text-white p-4 fixed h-full">
        <div className="p-4 mb-8">
          <h2 className="text-2xl font-bold text-gold-500">Student Portal</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/student/studentDashboard" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBarChart className="mr-3 " />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/student/myCourses" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBookOpen className="mr-3" />
                My Courses
              </a>
            </li>
            <li>
              <a href="/student/studentAssignments" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiClipboard className="mr-3" />
                Assignments
              </a>
            </li>
            <li>
              <a href="/student/schedule" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiCalendar className="mr-3" />
                Schedule
              </a>
            </li>
            <li>
              <a href="/student/grades" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FiBarChart className="mr-3 text-gold-500" />
                Grades
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">Student Grades</h1>
        </header>

        {/* Grades Visualization */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Doughnut Chart for Grade Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
            <Doughnut data={gradeDistribution} />
          </div>

          {/* Bar Chart for Individual Grades */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Individual Grades</h2>
            <Bar data={gradeData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Subject-wise Grades',
                },
              },
            }} />
          </div>
        </section>

        {/* Grade Table (Optional) */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Grade Breakdown</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.labels.map((subject, index) => (
                <tr key={subject} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{subject}</td>
                  <td className="py-3 px-4">{gradeData.datasets[0].data[index]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Grades;
