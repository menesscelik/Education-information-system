import { useState, useEffect } from 'react';
import '../styles/HomeworkList.css';

const HomeworkList = ({ setCurrentPage }) => {
  const [homeworks, setHomeworks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        // localStorage'dan documentId'yi al
        const documentId = localStorage.getItem('SelectedClassDocumentId');

        if (!documentId) {
          setError('Sınıf bilgisi bulunamadı. Lütfen tekrar seçim yapın.');
          return;
        }

        // API çağrısı: documentId'ye göre filtreleme
        const apiUrl = `http://localhost:1337/api/assigments?filters[class][documentId][$eq]=${documentId}&populate=class`;
        console.log('API çağrısı:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error('API Hatası:', errorDetails);
          setError('Ödevler yüklenirken bir hata oluştu.');
          return;
        }

        const data = await response.json();
        console.log('API Yanıtı:', data);

        if (data.data && data.data.length > 0) {
          setHomeworks(data.data); // Sadece filtrelenmiş ödevleri ata
        } else {
          setError('Bu sınıf için henüz ödev bulunamadı.');
        }
      } catch (err) {
        console.error('Hata:', err);
        setError('Ödevler yüklenirken bir hata oluştu.');
      }
    };

    fetchHomeworks();
  }, []);

  // Kullanıcı rolüne göre geri dönüş sayfasını belirle
  const handleBack = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'Öğrenci') {
      setCurrentPage('studentClasses');
    } else {
      setCurrentPage('viewClasses');
    }
  };

  return (
    <div className="homework-list-container">
      <button className="back-btn" onClick={handleBack}>
        Geri Dön
      </button>
      <h1>Sınıf Ödevleri</h1>
      {error && <p className="error-message">{error}</p>}
      {homeworks.length > 0 ? (
        <ul className="homework-list">
          {homeworks.map((homework) => (
            <li key={homework.id} className="homework-item">
              <h3>{homework.AssigmentName}</h3>
              <p>{homework.AssigmentDescribe}</p>
              <p>
                Teslim Tarihi:{' '}
                {new Date(homework.Assigment_Date).toLocaleDateString('tr-TR')}
              </p>
              <p>
                İlişkili Sınıf: {homework.class?.Name || 'Belirtilmemiş'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bu sınıf için henüz ödev bulunamadı.</p>
      )}
    </div>
  );
};

export default HomeworkList;
