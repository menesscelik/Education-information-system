import { useState, useEffect } from 'react';
import '../styles/AssignmentList.css';

const AssignmentList = ({ classId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/assignments?filters[classes][id][$eq]=${classId}&populate=*`
        );
        
        if (!response.ok) {
          throw new Error('Ödevler alınamadı');
        }

        const data = await response.json();
        setAssignments(data.data.attributes?.assignments?.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId]);

  if (loading) return <p>Ödevler yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="assignments-list">
      <h2>Ödevler</h2>
      {assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>{assignment.attributes.AssignmentName}</strong>
              <p>{assignment.attributes.AssignmentDescribe}</p>
              <p>Teslim Tarihi: {new Date(assignment.attributes.Assignment_Date).toLocaleDateString('tr-TR')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bu sınıf için henüz ödev eklenmemiş.</p>
      )}
    </div>
  );
};

export default AssignmentList; 