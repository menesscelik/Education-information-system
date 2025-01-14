import '../styles/StudentDashboard.css'

const StudentDashboard = ({ setCurrentPage }) => {
  const handleLogout = () => {
    // Yerel depolamadaki kullanıcı bilgilerini temizle
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    // Kullanıcıyı karşılama sayfasına yönlendir
    setCurrentPage('welcome');
  };

  return (
    <div className="student-container">
      <div className="student-header">
        <h1>Öğrenci Sayfası</h1>
      </div>
      <div className="student-content">
        <button 
          className="dashboard-btn"
          onClick={() => setCurrentPage('joinClass')}
        >
          Sınıfa Kayıt Ol
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => setCurrentPage('studentClasses')}
        >
          Sınıflarım
        </button>
        <button 
          className="dashboard-btn logout-btn"
          onClick={handleLogout}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}

export default StudentDashboard 