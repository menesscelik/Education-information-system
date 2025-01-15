import React, { useState, useEffect } from 'react';
import '../styles/AdminClasses.css';

const AdminClasses = ({ setCurrentPage }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/classes');
        if (!response.ok) {
          throw new Error('Dersler alınamadı');
        }
        const data = await response.json();
        setClasses(data.data); // Dersleri state'e ata
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      // documentId'yi localStorage'a kaydet
      localStorage.setItem('classToDelete', documentId);

      const response = await fetch(`http://localhost:1337/api/classes/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // localStorage'deki documentId ile eşleşeni kaldır
        const classToDelete = localStorage.getItem('classToDelete');
        setClasses(classes.filter((classItem) => classItem.documentId !== classToDelete));
        localStorage.removeItem('classToDelete'); // İşlem sonrası temizle
      } else {
        throw new Error('Ders silinemedi');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Dersler yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="admin-classes-container">
      <div className="header">
        <h1>Tüm Dersler</h1>
        <button className="back-button" onClick={() => setCurrentPage('adminPanel')}>
          Admin Paneline Dön
        </button>
      </div>
      <div className="classes-list">
        {classes.length > 0 ? (
          classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <strong>{classItem.Name}</strong>
              <p>Ders Kodu: {classItem.Benzersiz}</p>
              <p>{classItem.Aciklama}</p>
              <button onClick={() => handleDelete(classItem.documentId)}>Sil</button>
            </div>
          ))
        ) : (
          <p>Henüz ders bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default AdminClasses;
