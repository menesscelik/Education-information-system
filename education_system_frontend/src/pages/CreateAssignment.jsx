import React, { useState } from 'react';
import '../styles/CreateAssignment.css';

const CreateAssignment = ({ setCurrentPage }) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [description, setDescription] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classId = localStorage.getItem('selectedClassId');

    if (!classId) {
      alert('Sınıf bilgisi bulunamadı!');
      return;
    }

    const assignmentData = {
      data: {
        AssigmentName: assignmentName,
        AssigmentDescribe: description,
        Assigment_Date: assignmentDate,
        ClassID: parseInt(classId),
        classes: [], // Eğer sınıf ilişkisi gerekliyse boş dizi olarak başlanabilir
      },
    };

    try {
      const response = await fetch('http://localhost:1337/api/assigments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentData),
      });

      if (response.ok) {
        console.log('Ödev Oluşturuldu:', assignmentData);
        alert('Ödev başarıyla oluşturuldu!');
        localStorage.removeItem('selectedClassId');
        setCurrentPage('viewClasses');
      } else {
        const errorData = await response.json();
        console.error('Ödev oluşturulurken hata:', errorData);
        alert('Ödev oluşturulurken bir hata oluştu!');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin!');
    }
  };

  return (
    <div className="create-assignment-container">
      <h1>Ödev Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ödev Adı:</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
            placeholder="Ödev başlığını giriniz"
          />
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Ödev açıklamasını giriniz"
          />
        </div>
        <div>
          <label>Teslim Tarihi:</label>
          <input
            type="datetime-local"
            value={assignmentDate}
            onChange={(e) => setAssignmentDate(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Oluştur</button>
          <button type="button" onClick={() => setCurrentPage('viewClasses')}>Geri Dön</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
