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
import CreateAssignment from './pages/CreateAssignment';
import SendNote from './pages/SendNote';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedClass, setSelectedClass] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'SendNote':
        return <SendNote setCurrentPage={setCurrentPage} />;
      default:
        return null;
    }
  };

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
      {currentPage === 'CreateAssignment' && (
        <CreateAssignment setCurrentPage={setCurrentPage} />
      )}
      {renderPage()}
    </div>
  );
};

export default App;
