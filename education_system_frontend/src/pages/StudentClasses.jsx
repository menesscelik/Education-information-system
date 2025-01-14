import { useState, useEffect } from 'react';
import '../styles/ViewClasses.css';

const StudentsClasses = ({ setCurrentPage }) => {
  const [classes, setClasses] = useState([]); // Öğrencinin sınıfları
  const [error, setError] = useState(''); // Hata mesajları

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const storedUserEmail = localStorage.getItem('userEmail'); // Öğrenci e-postası

        if (!storedUserEmail) {
          setError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          return;
        }

        // Strapi API ile öğrencinin `studentlists` bilgilerini çek ve sınıfları `populate` ile getir
        const response = await fetch(
          `http://localhost:1337/api/studentlists?filters[Mail][$eq]=${storedUserEmail}&populate=classes`
        );

        const data = await response.json();
        console.log('API Yanıtı:', data);

        if (response.ok) {
          if (!data || !data.data || data.data.length === 0) {
            setError('Henüz bir sınıfa kayıt olmadınız.');
            return;
          }

          // Gelen sınıfları al ve state'e ata
          const studentClasses = data.data.flatMap((student) => student.classes);
          setClasses(studentClasses);
        } else {
          setError('Dersler yüklenirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Dersler yüklenirken hata oluştu:', error);
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    };

    fetchClasses();
  }, []);

  const handleClassClick = (classItem) => {
    localStorage.setItem('SelectedClassId', classItem.id); // Doğru ID'yi kaydediyoruz
    setCurrentPage('classDetail');
  };

  return (
    <div className="view-classes-container">
      <div className="page-header">
        <button
          className="back-btn"
          onClick={() => setCurrentPage('welcome')}
        >
          <i className="fas fa-arrow-left"></i> Geri Dön
        </button>
        <div className="classes-header">
          <h1>Derslerim</h1>
        </div>
      </div>

      <div className="classes-list">
        {error && <p className="error-message">{error}</p>}
        {classes.length > 0 ? (
          classes.map((classItem) => (
            <div 
              key={classItem.id} 
              className="class-card"
            >
              <div className="class-info">
                <h3>{classItem.Name}</h3>
                <p>Ders Kodu: {classItem.Benzersiz}</p>
                <p>{classItem.Aciklama}</p>
              </div>
              <div className="class-actions">
                <button
                  className="view-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Tıklamanın detaylara gitmesini engelle
                    handleClassClick(classItem);
                  }}
                >
                  Ders Ayrıntılarını Gör
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Henüz ders bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsClasses;
