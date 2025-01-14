import '../styles/StudentClasses.css';
import { useEffect, useState } from 'react';

const StudentClasses = ({ setCurrentPage }) => {
  const [classes, setClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      const storedUserName = localStorage.getItem('userName');
      const storedUserSirname = localStorage.getItem('userSurname');

      if (!storedUserName || !storedUserSirname) {
        setErrorMessage('Kullanıcı bilgisi bulunamadı! Lütfen tekrar giriş yapın.');
        return;
      }

      try {
        // StudentName ve StudentSirname filtreleme
        const response = await fetch(
          `http://localhost:1337/api/studentlists?filters[StudentName][$eq]=${storedUserName}&filters[StudentSirname][$eq]=${storedUserSirname}&populate=classes`
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Sınıflar Alınırken Hata:', errorData);
          setErrorMessage('Sınıflar yüklenirken bir hata oluştu!');
          return;
        }

        const data = await response.json();

        if (!data || data.data.length === 0) {
          setErrorMessage('Henüz katıldığınız bir sınıf yok.');
          return;
        }

        // Sınıf bilgilerini ayıkla
        const classesData = data.data.flatMap((item) =>
          item.classes.map((classItem) => ({
            id: classItem.id,
            Name: classItem.Name,
            Code: classItem.Benzersiz,
            Description: classItem.Aciklama,
          }))
        );

        setClasses(classesData);
      } catch (err) {
        console.error('Sınıflar Yükleme Hatası:', err);
        setErrorMessage('Bir hata oluştu!');
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="student-classes-container">
      <h1>Derslerim</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {classes.length === 0 ? (
        <p>Henüz katıldığınız bir sınıf yok.</p>
      ) : (
        <div className="class-cards">
          {classes.map((studentClass) => (
            <div className="class-card" key={studentClass.id}>
              <h2>{studentClass.Name}</h2>
              <p>Ders Kodu: {studentClass.Code}</p>
              <p>{studentClass.Description}</p>
              <button className="details-button" onClick={() => alert(`Ders: ${studentClass.Name}`)}>
                Ders Ayrıntılarını Gör
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setCurrentPage('student')}>Geri Dön</button>
    </div>
  );
};

export default StudentClasses;
