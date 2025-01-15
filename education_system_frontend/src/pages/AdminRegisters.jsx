import React, { useState, useEffect } from 'react';
import '../styles/AdminRegisters.css';

const AdminRegisters = ({ setCurrentPage }) => {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegisters = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/registers');
        if (!response.ok) {
          throw new Error('Kayıtlar alınamadı');
        }
        const data = await response.json();
        setRegisters(data.data); // Kayıtları state'e ata
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisters();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      localStorage.setItem('registerToDelete', documentId);

      const response = await fetch(`http://localhost:1337/api/registers/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const registerToDelete = localStorage.getItem('registerToDelete');
        setRegisters(registers.filter((register) => register.documentId !== registerToDelete));
        localStorage.removeItem('registerToDelete'); // İşlem sonrası temizle
      } else {
        throw new Error('Kayıt silinemedi');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Kayıtlar yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="admin-registers-container">
      <div className="header">
        <h1>Tüm Kayıtlar</h1>
        <button className="back-button" onClick={() => setCurrentPage('adminPanel')}>
          Admin Paneline Dön
        </button>
      </div>
      <div className="registers-list">
        {registers.length > 0 ? (
          registers
            .filter((register) => register.Role !== 'Admin') // Admin rolü olmayanları filtrele
            .map((register) => (
              <div key={register.id} className="register-card">
                <strong>{register.Name} {register.Sirname}</strong>
                <p>Mail: {register.Mail}</p>
                <p>Rol: {register.Role}</p>
                <button onClick={() => handleDelete(register.documentId)}>Sil</button>
              </div>
            ))
        ) : (
          <p>Henüz kayıt bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default AdminRegisters;
