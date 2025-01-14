import React, { useState } from 'react';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateClass from './pages/CreateClass';
import ViewClasses from './pages/ViewClasses';
import ClassDetail from './pages/ClassDetail';
import StudentDashboard from './pages/StudentDashboard';
import JoinClass from './pages/JoinClass';
import StudentClasses from './pages/StudentClasses';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="App">
      {currentPage === 'welcome' && <Welcome setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'teacher' && <TeacherDashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'createClass' && <CreateClass setCurrentPage={setCurrentPage} />}
      {currentPage === 'viewClasses' && (
        <ViewClasses 
          setCurrentPage={setCurrentPage} 
          setSelectedClass={setSelectedClass} 
        />
      )}
      {currentPage === 'classDetail' && (
        <ClassDetail 
          setCurrentPage={setCurrentPage} 
          selectedClass={selectedClass} 
        />
      )}
      {currentPage === 'student' && (
        <StudentDashboard setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'joinClass' && (
        <JoinClass setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'studentClasses' && (
        <StudentClasses setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default App; 