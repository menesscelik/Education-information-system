import { useState, useEffect } from 'react';
import '../styles/SendNote.css';

const SendNote = ({ setCurrentPage }) => {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalıdır.');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.trim() || !title.trim()) {
      setError('Lütfen başlık ve not alanlarını doldurunuz.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      const classId = localStorage.getItem('selectedClassId');
      const className = localStorage.getItem('selectedClassName');

      if (!classId) {
        setError('Sınıf bilgisi bulunamadı.');
        return;
      }

      // Dosya yükleme işlemi
      let fileUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append('files', file);

        const uploadResponse = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          fileUrl = uploadData[0]?.url || null;
        } else {
          throw new Error('Dosya yükleme hatası');
        }
      }

      // Notu ilgili sınıfa gönderme
      const response = await fetch('http://localhost:1337/api/nots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            NotTitle: title,
            NotDescirbe: note,
            class: classId,
            NotFile: fileUrl,
            ClassID: classId,
          },
        }),
      });

      if (response.ok) {
        setSuccess('Not başarıyla gönderildi!');
        setNote('');
        setTitle('');
        setFile(null);

        setTimeout(() => {
          setCurrentPage('viewClasses');
        }, 2000);
      } else {
        setError('Not gönderilirken bir hata oluştu.');
      }
    } catch (err) {
      console.error('Hata:', err);
      setError('Not gönderilirken bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="send-note-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentPage('viewClasses')}>
          <i className="fas fa-arrow-left"></i> Geri Dön
        </button>
        <h1>Ders Notu Gönder</h1>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="note-form">
        <div className="note-input-section">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Not başlığı..."
            className="title-field"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ders notunuzu buraya yazın..."
            rows="10"
            className="note-textarea"
          />
          <div className="file-upload-section">
            <label className="file-upload-label">
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              />
              <span>{file ? file.name : 'Dosya Ekle (İsteğe Bağlı)'}</span>
            </label>
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="remove-file-btn"
              >
                Dosyayı Kaldır
              </button>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={uploading}>
          {uploading ? 'Gönderiliyor...' : 'Notu Gönder'}
        </button>
      </form>
    </div>
  );
};

export default SendNote;
