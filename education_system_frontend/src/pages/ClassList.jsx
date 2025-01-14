import { useState, useEffect } from 'react';
import '../styles/ClassList.css';

const ClassList = ({ classId, onClose }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!classId) {
          setError('Sınıf ID bilgisi bulunamadı.');
          return;
        }

        // Sadece sınıfa kayıtlı öğrencileri getir
        const response = await fetch(
          `http://localhost:1337/api/studentlists?filters[classes][id][$eq]=${classId}&populate=*`
        );

        if (!response.ok) {
          throw new Error('Öğrenci listesi yüklenirken bir hata oluştu.');
        }

        const data = await response.json();
        setStudents(data.data || []);
      } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    fetchStudents();
  }, [classId]);

  return (
    <div className="class-list-modal">
      <div className="class-list-content">
        <div className="class-list-header">
          <h2>Öğrenci Listesi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="students-list">
            {students.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Öğrenci Adı</th>
                    <th>Öğrenci Numarası</th>
                    <th>E-posta</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.StudentName || 'Belirtilmemiş'}</td>
                      <td>{student.StudentID || 'Belirtilmemiş'}</td>
                      <td>{student.Mail || 'Belirtilmemiş'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-students">Bu sınıfta henüz öğrenci bulunmamaktadır.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassList;
