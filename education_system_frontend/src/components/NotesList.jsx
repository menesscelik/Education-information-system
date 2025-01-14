import { useState, useEffect } from 'react';
import '../styles/NotesList.css';

const NotesList = ({ classId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/nots?filters[class][id][$eq]=${classId}&populate=*`
        );
        
        if (!response.ok) {
          throw new Error('Notlar alınamadı');
        }

        const data = await response.json();
        setNotes(data.data.attributes?.notes?.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [classId]);

  if (loading) return <p>Notlar yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="notes-list">
      <h2>Ders Notları</h2>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.attributes.NotTitle}</strong>
              <p>{note.attributes.NotDescribe}</p>
              {note.attributes.NotFile && (
                <a href={note.attributes.NotFile} target="_blank" rel="noopener noreferrer">
                  Dosyayı İndir
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Bu sınıf için henüz not eklenmemiş.</p>
      )}
    </div>
  );
};

export default NotesList; 