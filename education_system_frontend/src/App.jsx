import { useState } from 'react'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import TeacherDashboard from './pages/TeacherDashboard'
import CreateClass from './pages/CreateClass'
import ViewClasses from './pages/ViewClasses'
import ClassDetail from './pages/ClassDetail'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  return (
    <div className="App">
      {currentPage === 'welcome' && <Welcome setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'teacher' && <TeacherDashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'createClass' && <CreateClass setCurrentPage={setCurrentPage} />}
      {currentPage === 'viewClasses' && <ViewClasses setCurrentPage={setCurrentPage} />}
      {currentPage === 'classDetail' && <ClassDetail setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App
