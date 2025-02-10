## Learning Management System (For R/Pthagama Maa Vidyalaya)

## Overview
The **LMS** is a comprehensive Learning Management System designed to streamline the teaching and learning experience. Built using the modern **MERN Stack (MongoDB, Express.js, React, and Node.js)**, it provides a robust and scalable platform for managing courses, students, assignments, and analytics.

## Key Features
- **Teacher Dashboard**: Manage courses, track assignments, and view analytics.
- **Student Dashboard**: Access assignments, grades, and schedules.
- **Authentication**: Secure login for teachers and students with role-based access.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

## Technologies Used
- **Frontend**: React.js (with Vite for fast development)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL database)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Notifications**: React Toastify

## Installation
### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Steps to Run the Project Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/GAP-Pathum-LMS.git
   cd GAP-Pathum-LMS
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Setup Environment Variables**:
   Create a `.env` file in the `server` directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the Application**:
   Open your browser and navigate to:
   - Teacher Portal: `http://localhost:3000/teacherLogin`
   - Student Portal: `http://localhost:3000/studentLogin`

## Folder Structure
```
GAP-Pathum-LMS/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Application pages
│       ├── redux/          # State management
│       └── App.jsx         # Main application file
├── server/                 # Backend Node.js application
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication and other middleware
│   └── server.js           # Entry point for the backend
└── README.md               # Project documentation
```

## API Endpoints
### Authentication
- `POST /api/auth/login/teacher`: Teacher login
- `POST /api/auth/login/student`: Student login

### Teacher Routes
- `GET /api/teachers/:id`: Get teacher details
- `POST /api/teachers`: Create a teacher
- `PUT /api/teachers/:id`: Update teacher details

### Student Routes
- `GET /api/students/:id`: Get student details
- `POST /api/students`: Create a student
- `PUT /api/students/:id`: Update student details

## Future Enhancements
- Integration with third-party services for video conferencing and document sharing.
- Real-time notifications for assignments and events.
- AI-powered analytics for personalized feedback.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Create a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

**GAP-Pathum LMS**: Empowering education through technology.

