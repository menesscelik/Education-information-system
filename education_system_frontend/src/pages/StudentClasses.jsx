import { useState, useEffect } from 'react';
import '../styles/ViewClasses.css';

const StudentsClasses = ({ setCurrentPage }) => {
  const [classes, setClasses] = useState([]); // Öğrencinin sınıfları
  const [error, setError] = useState(''); // Hata mesajları

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const storedUserName = localStorage.getItem('userName'); // Öğrenci adı
        const storedUserSirname = localStorage.getItem('userSirname'); // Öğrenci soyadı

        if (!storedUserName || !storedUserSirname) {
          setError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          console.error('Kullanıcı adı veya soyadı bulunamadı. localStorage:', { storedUserName, storedUserSirname });
          return;
        }

        // API sorgusunun loglanması
        const apiUrl = `http://localhost:1337/api/studentlists?filters[StudentName][$eq]=${storedUserName}&filters[StudentSirname][$eq]=${storedUserSirname}&populate=classes`;
        console.log('API URL:', apiUrl);

        // Strapi API ile öğrencinin bilgilerini ve ilişkili sınıfları al
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error('API Hatası:', errorDetails);
          setError('Dersler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
          return;
        }

        const data = await response.json();
        console.log('API Yanıtı:', data);

        if (!data || !data.data || data.data.length === 0) {
          setError('Henüz bir sınıfa kayıt olmadınız.');
          console.warn('API Yanıtı boş:', data);
          return;
        }

        // Gelen sınıfları al ve state'e ata
        const studentClasses = data.data.flatMap(
          (student) => student.classes || []
        );
        setClasses(studentClasses);
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