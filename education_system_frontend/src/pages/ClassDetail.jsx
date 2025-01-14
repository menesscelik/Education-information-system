import { useState, useEffect } from 'react';
import '../styles/ClassDetail.css';

const ClassDetail = ({ setCurrentPage }) => {
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classId = localStorage.getItem('SelectedClassId');
        console.log('Class ID:', classId); // Debug için log
    
        if (!classId) {
          setError('Seçilen sınıf bilgisi bulunamadı. Lütfen geri dönüp tekrar deneyin.');
          return;
        }
    
        // Filters ile API isteği
        const response = await fetch(
          `http://localhost:1337/api/classes?filters[id][$eq]=${classId}&populate=*`
        );
        console.log('API URL:', `http://localhost:1337/api/classes?filters[id][$eq]=${classId}&populate=*`);
    
        const data = await response.json();
        console.log('API Response:', data); // Debug için yanıtı kontrol edin
    
        if (response.ok && data.data.length > 0) {
          setClassDetails(data.data[0]); // İlk sonucu al
        } else {
          setError('Sınıf detayları alınırken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Hata:', error);
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    };
    

    fetchClassDetails();
  }, []);

  if (error) {
    return (
      <div className="class-detail-container">
        <p className="error-message">{error}</p>
        <button className="back-btn" onClick={() => setCurrentPage('viewClasses')}>
          Geri Dön
        </button>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="class-detail-container">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="class-detail-container">
      <div className="class-detail-header">
        <h1>{classDetails.attributes.Name}</h1>
        <p>Ders Kodu: {classDetails.attributes.Benzersiz}</p>
        <p>Açıklama: {classDetails.attributes.Aciklama}</p>
        <button className="back-btn" onClick={() => setCurrentPage('viewClasses')}>
          Geri Dön
        </button>
      </div>

      <div className="class-detail-content">
        <h2>Öğrenci Listesi</h2>
        {students.length > 0 ? (
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.StudentName} {student.StudentSirname} ({student.StudentID})
              </li>
            ))}
          </ul>
        ) : (
          <p>Bu sınıfta henüz öğrenci yok.</p>
        )}

        <h2>Ders Notları</h2>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <a href={note.NotFile} target="_blank" rel="noopener noreferrer">
                  {note.NotTitle} - {note.NotDescribe}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Bu sınıf için henüz not eklenmemiş.</p>
        )}

        <h2>Ödevler</h2>
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment, index) => (
              <li key={index}>
                <strong>{assignment.AssignmentName}:</strong> {assignment.AssignmentDescribe} - Teslim Tarihi: 
                {new Date(assignment.Assignment_Date).toLocaleDateString('tr-TR')}
              </li>
            ))}
          </ul>
        ) : (
          <p>Bu sınıf için henüz ödev eklenmemiş.</p>
        )}
      </div>
    </div>
  );
};

export default ClassDetail;
