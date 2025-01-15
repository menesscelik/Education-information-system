import { useState, useEffect } from 'react';
import '../styles/ClassNotes.css';

const ClassNotes = ({ setCurrentPage }) => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // localStorage'dan documentId'yi al
                const documentId = localStorage.getItem('SelectedClassDocumentId');

                if (!documentId) {
                    setError('Sınıf bilgisi bulunamadı. Lütfen tekrar seçim yapın.');
                    return;
                }

                // API çağrısı: documentId'ye göre filtreleme
                const apiUrl = `http://localhost:1337/api/nots?filters[class][documentId][$eq]=${documentId}&populate=class`;
                console.log('API çağrısı:', apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorDetails = await response.text();
                    console.error('API Hatası:', errorDetails);
                    setError('Ders notları yüklenirken bir hata oluştu.');
                    return;
                }

                const data = await response.json();

                if (!data?.data || data.data.length === 0) {
                    setError('Bu sınıf için henüz not paylaşılmamış.');
                    return;
                }

                // Notları state'e ata
                setNotes(data.data);
            } catch (error) {
                console.error('Notları alırken hata:', error);
                setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            }
        };

        fetchNotes();
    }, []);

    const handleDownload = async (fileUrl, fileName) => {
        try {
            const response = await fetch(`http://localhost:1337${fileUrl}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Dosya indirme hatası:', error);
            setError('Dosya indirilirken bir hata oluştu.');
        }
    };

    const handleView = (fileUrl) => {
        window.open(`http://localhost:1337${fileUrl}`, '_blank');
    };

    return (
        <div className="notes-container">
            <div className="page-header">
                <button
                    className="back-btn"
                    onClick={() => setCurrentPage('studentClasses')}
                >
                    <i className="fas fa-arrow-left"></i> Geri Dön
                </button>
                <div className="notes-header">
                    <h1>Ders Notları</h1>
                </div>
            </div>

            <div className="notes-list">
                {error && <p className="error-message">{error}</p>}
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="note-card">
                            <div className="note-info">
                                <h3>{note.NotTitle}</h3>
                                <p>{note.NotDescirbe}</p>
                                <p>
                                    Yüklenme Tarihi:{' '}
                                    {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                                </p>
                                <p>Sınıf Adı: {note.class?.Name || 'Belirtilmemiş'}</p>
                                <p>
                                    Sınıf Açıklaması: {note.class?.Aciklama || 'Belirtilmemiş'}
                                </p>
                                <p>Sınıf Kodu: {note.class?.Benzersiz || 'Belirtilmemiş'}</p>
                            </div>
                            <div className="note-actions">
                                {note.NotFile?.data && (
                                    <>
                                        <button
                                            className="view-btn"
                                            onClick={() => handleView(note.NotFile.data.url)}
                                        >
                                            <i className="fas fa-eye"></i> Görüntüle
                                        </button>
                                        <button
                                            className="download-btn"
                                            onClick={() =>
                                                handleDownload(
                                                    note.NotFile.data.url,
                                                    note.NotFile.data.name
                                                )
                                            }
                                        >
                                            <i className="fas fa-download"></i> İndir
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>Henüz ders notu paylaşılmamış.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassNotes;
