import { useState, useEffect } from 'react';
import '../styles/StudentList.css';

const StudentList = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/studentlists?filters[class][id][$eq]=${classId}&populate=*`
        );
        
        if (!response.ok) {
          throw new Error('Öğrenci listesi alınamadı');
        }

        const data = await response.json();
        setStudents(data.data.attributes?.students?.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  if (loading) return <p>Öğrenciler yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="student-list">
      <h2>Öğrenci Listesi</h2>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>
                {student.attributes.StudentName} {student.attributes.StudentSirname}
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bu sınıfta henüz öğrenci yok.</p>
      )}
    </div>
  );
};

export default StudentList; 