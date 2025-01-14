import '../styles/JoinClass.css';
import { useState } from 'react';

const JoinClass = ({ setCurrentPage }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kullanıcı bilgilerini al
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserSirname = localStorage.getItem('userSirname');

    if (!storedUserId || !storedUserName || !storedUserSirname) {
      alert('Oturum bilgisi bulunamadı! Lütfen tekrar giriş yapın.');
      setCurrentPage('login');
      return;
    }

    const formData = new FormData(e.target);
    const classCode = formData.get('classCode');

    try {
      // Sınıfı bulmak için API isteği
      const classResponse = await fetch(
        `http://localhost:1337/api/classes?filters[Benzersiz][$eq]=${classCode}&populate=*`
      );

      if (!classResponse.ok) {
        const errorData = await classResponse.json();
        console.error('Sınıf Arama Hatası:', errorData);
        alert('Sınıf kodu geçersiz!');
        return;
      }

      const classData = await classResponse.json();

      if (!classData || !classData.data || classData.data.length === 0) {
        alert('Girdiğiniz sınıf kodu ile eşleşen bir sınıf bulunamadı. Lütfen kodu kontrol edin.');
        return;
      }

      const classId = classData.data[0].id;

      // Öğrencinin bu sınıfa zaten kaydolup olmadığını kontrol et
      const checkExistingResponse = await fetch(
        `http://localhost:1337/api/studentlists?filters[StudentName][$eq]=${storedUserName}&filters[StudentSirname][$eq]=${storedUserSirname}&filters[classes][id][$eq]=${classId}`
      );

      if (!checkExistingResponse.ok) {
        const errorText = await checkExistingResponse.text();
        console.error('Kayıt Kontrol Hatası:', errorText);
        alert('Kayıt kontrolü yapılırken bir hata oluştu!');
        return;
      }

      const existingData = await checkExistingResponse.json();

      if (existingData.data.length > 0) {
        alert('Bu sınıfa zaten kayıtlısınız!');
        return;
      }

      // Öğrenciyi sınıfa kaydetmek için POST isteği
      const studentListData = {
        data: {
          StudentName: storedUserName,
          StudentSirname: storedUserSirname,
          classes: [
            {
              id: classId, // Many-to-Many ilişki için class ID
            },
          ],
        },
      };

      const studentListResponse = await fetch('http://localhost:1337/api/studentlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentListData),
      });

      if (studentListResponse.ok) {
        setSuccessMessage('Sınıfa başarıyla katıldınız!');
        setTimeout(() => {
          setCurrentPage('studentClasses');
        }, 2000);
      } else {
        const error = await studentListResponse.json();
        console.error('Sınıfa Katılma Hatası Detayı:', error);
        alert(`Sınıfa katılırken bir hata oluştu: ${error.error?.message || 'Bilinmeyen hata'}`);
      }
    } catch (err) {
      console.error('Sınıfa Katılma Hatası:', err);
      alert(`Bir hata oluştu: ${err.message}`);
    }
  };

  return (
    <div className="join-class-container">
      <div className="join-class-box">
        <h1>Sınıfa Katıl</h1>
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        <form className="join-class-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sınıf Kodu:</label>
            <input
              type="text"
              name="classCode"
              placeholder="Sınıf kodunu giriniz"
              required
              maxLength="7"
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="back-btn"
              onClick={() => setCurrentPage('student')}
            >
              Geri Dön
            </button>
            <button type="submit" className="join-btn">
              Sınıfa Katıl
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinClass;