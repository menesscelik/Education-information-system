import '../styles/TeacherDashboard.css'

const TeacherDashboard = ({ setCurrentPage }) => {
  return (
    <div className="teacher-container">
      <div className="teacher-header">
        <h1>Eğitmen Sayfası</h1>
      </div>
      <div className="teacher-content">
        <button 
          className="dashboard-btn"
          onClick={() => setCurrentPage('createClass')}
        >
          Sınıf Oluştur
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => setCurrentPage('viewClasses')}
        >
          Sınıf Görüntüle
        </button>
      </div>
    </div>
  )
}

export default TeacherDashboard 