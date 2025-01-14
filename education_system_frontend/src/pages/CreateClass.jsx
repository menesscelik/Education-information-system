import '../styles/CreateClass.css';
import { useState, useEffect } from 'react';

const CreateClass = ({ setCurrentPage }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [classCode, setClassCode] = useState('');

  const generateClassCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    setClassCode(generateClassCode());
  }, []);

  const handleGenerateNewCode = () => {
    setClassCode(generateClassCode());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken'); // Eğer token kullanıyorsanız

    if (!storedUserId) {
      alert('Oturum bilgisi bulunamadı!');
      return;
    }

    const formData = new FormData(e.target);
    const classData = {
      Name: formData.get('className'),
      Aciklama: formData.get('classDescription'),
      Benzersiz: classCode,
      register: storedUserId, // Backend'in register ilişkisi için
    };

    console.log('Gönderilen Veri:', classData);

    try {
      const response = await fetch('http://localhost:1337/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userToken && { Authorization: `Bearer ${userToken}` }), // Token kullanıyorsanız ekleyin
        },
        body: JSON.stringify({ data: classData }),
      });

      if (response.ok) {
        setSuccessMessage('Sınıf başarıyla oluşturuldu!');
        setTimeout(() => {
          setCurrentPage('teacher');
        }, 2000);
      } else {
        const error = await response.json();
        console.error('Hata Detayı:', error);
        alert('Sınıf oluşturulurken bir hata oluştu.');
      }
    } catch (err) {
      console.error('Sınıf Oluşturma Hatası:', err);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="create-class-container">
      <div className="create-class-box">
        <h1>Sınıf Oluştur</h1>
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        <form className="create-class-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ders Kodu:</label>
            <div className="class-code-container">
              <input
                type="text"
                name="classCode"
                value={classCode}
                readOnly
                className="readonly-input"
              />
              <button
                type="button"
                onClick={handleGenerateNewCode}
                className="generate-code-btn"
              >
                Yeni Kod Oluştur
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Ders İsmi:</label>
            <input
              type="text"
              name="className"
              placeholder="Örn: Matematik 101"
              required
            />
          </div>
          <div className="form-group">
            <label>Ders Açıklaması:</label>
            <textarea
              name="classDescription"
              placeholder="Ders hakkında kısa bir açıklama yazın..."
              required
              rows="4"
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="back-btn"
              onClick={() => setCurrentPage('teacher')}
            >
              Geri Dön
            </button>
            <button type="submit" className="create-btn">
              Sınıf Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
