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
import HomeworkList from './pages/HomeworkList';
import ClassNotes from './pages/ClassNotes';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedClass, setSelectedClass] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <Welcome setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'teacher':
        return <TeacherDashboard setCurrentPage={setCurrentPage} />;
      case 'createClass':
        return <CreateClass setCurrentPage={setCurrentPage} />;
      case 'viewClasses':
        return (
          <ViewClasses 
            setCurrentPage={setCurrentPage} 
            setSelectedClass={setSelectedClass} 
          />
        );
      case 'classDetail':
        return (
          <ClassDetail 
            setCurrentPage={setCurrentPage} 
            selectedClass={selectedClass} 
          />
        );
      case 'student':
        return <StudentDashboard setCurrentPage={setCurrentPage} />;
      case 'joinClass':
        return <JoinClass setCurrentPage={setCurrentPage} />;
      case 'studentClasses':
        return <StudentClasses setCurrentPage={setCurrentPage} />;
      case 'CreateAssignment':
        return <CreateAssignment setCurrentPage={setCurrentPage} />;
      case 'SendNote':
        return <SendNote setCurrentPage={setCurrentPage} />;
      case 'homeworkList':
        return <HomeworkList setCurrentPage={setCurrentPage} />;
      case 'classNotes':
        return <ClassNotes setCurrentPage={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

export default App;
