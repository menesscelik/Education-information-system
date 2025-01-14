import { useState, useEffect } from 'react';
import '../styles/ViewClasses.css';

const ViewClasses = ({ setCurrentPage, setSelectedClass }) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const storedUserId = localStorage.getItem('userId'); // Öğretmenin kimliği

        if (!storedUserId) {
          setError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          return;
        }

        // Strapi API ile öğretmene ait dersleri filtrele
        const response = await fetch(
          `http://localhost:1337/api/classes?filters[register][$eq]=${storedUserId}&populate=*`
        );

        const data = await response.json();
        console.log('API Yanıtı:', data);

        if (response.ok) {
          if (!data || !data.data || data.data.length === 0) {
            setError('Henüz bir sınıf oluşturmadınız.');
            return;
          }

          // Gelen dersleri state'e ata
          setClasses(data.data);
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

  const handleDeleteClass = async (classId) => {
    try {
      const confirmed = window.confirm('Bu dersi kalıcı olarak silmek istediğinize emin misiniz?');
      if (confirmed) {
        const response = await fetch(`http://localhost:1337/api/classes/${classId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const updatedClasses = classes.filter((classItem) => classItem.id !== classId);
          setClasses(updatedClasses);
        } else {
          setError('Ders silinirken bir hata oluştu.');
        }
      }
    } catch (error) {
      console.error('Ders silinirken hata oluştu:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // const handleClassClick = (classItem) => {
  //   setCurrentPage('classDetail'); // Detay sayfasına yönlendir

  //   const uniqueCode = classItem.attributes.Benzersiz; // Benzersiz kodu alın
  //   localStorage.setItem('Benzersiz', uniqueCode); // Benzersiz kodu localStorage'a kaydet
  //   //setSelectedClass(classItem); // Seçilen sınıfı detay sayfasına ilet
  // };
  // const handleClassClick = (classItem) => {
  //   // Sınıf detaylarına gitmek için gerekli işlemleri yap
  //   setCurrentPage('classDetail'); 
  
  //   // Sınıf ID'sini al ve localStorage'a kaydet
  //   const classId = classItem.id; 
  //   localStorage.setItem('SelectedClassId', classId);
  
  //   console.log('Seçilen Sınıf ID:', classId); // Kontrol için log ekleyin
  // };
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
          <button
            className="create-class-btn"
            onClick={() => setCurrentPage('createClass')}
          >
            Yeni Ders Oluştur
          </button>
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
                {/* <button
                  className="view-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Tıklamanın detaylara gitmesini engelle
                    handleClassClick(classItem);
                  }}
                >
                  Ders Ayrıntılarını Gör
                </button> */}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Tıklamanın detaylara gitmesini engelle
                    handleDeleteClass(classItem.id);
                  }}
                >
                  Sil
                </button>
                <div className="class-options" >
                <button 
                  className="assign-homework-btn"
                  onClick={() => {
                    localStorage.setItem('selectedClassId', classItem.id); // Sınıf ID'sini kaydet
                    setCurrentPage('CreateAssignment');
                  }}
                >
                  Ödev Ver
                </button>
                <button 
                  className="send-note-btn"
                  onClick={() => {
                    localStorage.setItem('selectedClassId', classItem.id);
                    setCurrentPage('SendNote');
                  }}
                >
                  Not Gönder
                </button>
                <button className="class-list-btn">Sınıf Listesi</button>
              </div>
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

export default ViewClasses;
