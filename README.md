# Learning Management System (For R/Pathagama Maha Vidyalaya)

## Overview
The **LMS** is a feature-rich Learning Management System crafted to enhance the teaching and learning process. Developed using the modern **MERN Stack (MongoDB, Express.js, React, and Node.js)**, it provides a powerful and scalable platform for managing courses, students, assignments, and reports.

## Key Features
- **Teacher Dashboard**: Oversee courses, monitor assignments, and analyze reports.
- **Student Dashboard**: View assignments, track grades, and manage schedules.
- **Authentication**: Secure access for teachers and students with role-based permissions.
- **Responsive Design**: Optimized for seamless use on desktops, tablets, and mobile devices.
- **Real-time Notifications**: Instant updates for assignments and important announcements.
- **Discussion Forum**: A collaborative space for students and teachers to interact.

## Technologies Used
- **Frontend**: React.js (with Vite for efficient development)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL database)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Authentication**: JSON Web Tokens (JWT)

## Installation
### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based like MongoDB Atlas)

### Steps to Run the Project Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/Pathagama-LMS.git
   cd Pathagama-LMS
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
   CLIENT_URL=http://localhost:3000
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
Pathagama-LMS/
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
│   ├── config/             # Configuration files (e.g., database connection)
│   └── server.js           # Entry point for the backend
└── README.md               # Project documentation
```

## API Endpoints
### Authentication
- `POST /api/auth/login/teacher`: Teacher authentication
- `POST /api/auth/login/student`: Student authentication

### Teacher Routes
- `GET /api/teachers/:id`: Retrieve teacher details
- `POST /api/teachers`: Register a teacher
- `PUT /api/teachers/:id`: Modify teacher details
- `DELETE /api/teachers/:id`: Delete a teacher

### Student Routes
- `GET /api/students/:id`: Retrieve student details
- `POST /api/students`: Register a student
- `PUT /api/students/:id`: Modify student details
- `DELETE /api/students/:id`: Delete a student

## Future Enhancements
- Integration with third-party services for virtual classrooms and document sharing.
- AI-driven analytics for performance insights and personalized learning recommendations.
- Mobile application support for Android and iOS.
- Dark mode for improved accessibility and user experience.

## Contributing
We encourage contributions! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

**Pathagama LMS**: Advancing education through digital innovation.

