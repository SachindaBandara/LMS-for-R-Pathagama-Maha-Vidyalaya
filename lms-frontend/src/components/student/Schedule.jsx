import React, { useState, useEffect } from 'react';
import { FiBook, FiClock, FiAlertTriangle, FiCheckCircle, FiBarChart, FiBookOpen, FiCalendar, FiClipboard } from 'react-icons/fi';
import { FaGraduationCap, FaRegChartBar } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentSchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with API calls
  const sampleSchedule = [
    {
      day: "Monday",
      classes: [
        { time: "09:00 - 10:30", subject: "Mathematics", room: "Room 101" },
        { time: "11:00 - 12:30", subject: "Physics", room: "Lab 2" }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        { time: "10:00 - 11:30", subject: "Chemistry", room: "Room 202" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { time: "09:00 - 10:30", subject: "Mathematics", room: "Room 101" },
        { time: "14:00 - 15:30", subject: "Biology", room: "Lab 1" }
      ]
    },
    {
      day: "Thursday",
      classes: [
        { time: "11:00 - 12:30", subject: "Physics", room: "Lab 2" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { time: "09:00 - 10:30", subject: "Mathematics", room: "Room 101" },
        { time: "13:00 - 14:30", subject: "Chemistry", room: "Room 202" }
      ]
    }
  ];

  const sampleEvents = [
    {
      title: "Parent-Teacher Meeting",
      date: "2023-10-25",
      time: "14:00 - 16:00",
      location: "Auditorium"
    },
    {
      title: "Science Fair",
      date: "2023-11-01",
      time: "10:00 - 14:00",
      location: "School Grounds"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        setSchedule(sampleSchedule);
        setUpcomingEvents(sampleEvents);
      } catch (error) {
        toast.error('Failed to load schedule data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const DaySchedule = ({ day, classes }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-bold text-maroon-900 mb-4">{day}</h2>
      <div className="space-y-3">
        {classes.map((cls, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 p-3 bg-gold-100 rounded-full mr-4">
              <FiClock className="text-gold-600" />
            </div>
            <div>
              <p className="font-medium">{cls.subject}</p>
              <p className="text-sm text-gray-600">{cls.time}</p>
              <p className="text-sm text-gray-500">{cls.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UpcomingEvents = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-maroon-900 mb-4">Upcoming Events</h2>
      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full mr-4">
              <FiCalendar className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()} | {event.time}
              </p>
              <p className="text-sm text-gray-500">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
              <a href="/student/studentDasboard" className="flex items-center p-3 bg-gold-100 bg-opacity-10 rounded-lg">
                <FaGraduationCap className="mr-3" />
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
              <a href="/student/scedule" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiCalendar className="mr-3  text-gold-500" />
                Schedule
              </a>
            </li>
            <li>
              <a href="/student/grades" className="flex items-center p-3 hover:bg-gold-100 hover:bg-opacity-10 rounded-lg">
                <FiBarChart className="mr-3" />
                Grades
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-maroon-900">My Schedule</h1>
          <p className="text-gray-600">Weekly timetable and upcoming events</p>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading schedule...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Schedule */}
            <div className="lg:col-span-2">
              {schedule.map((daySchedule, index) => (
                <DaySchedule
                  key={index}
                  day={daySchedule.day}
                  classes={daySchedule.classes}
                />
              ))}
            </div>

            {/* Upcoming Events */}
            <div>
              <UpcomingEvents />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentSchedulePage;