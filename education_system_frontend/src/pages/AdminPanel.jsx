import React from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = ({ setCurrentPage }) => {
  return (
    <div className="admin-panel-container">
      <h1>Admin Paneli</h1>
      <div className="admin-buttons">
        <button onClick={() => setCurrentPage('adminClasses')}>Dersler</button>
        <button onClick={() => setCurrentPage('adminRegisters')}>Kullanıcılar</button>
      </div>
    </div>
  );
};

export default AdminPanel; 