import { useState } from 'react'
import '../styles/ViewClasses.css'

const ViewClasses = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('active')
  const [classes, setClasses] = useState({
    active: [
      { 
        id: 1, 
        name: 'Matematik 101', 
        code: 'MAT101',
        semester: '2023-2024 Bahar',
        students: 25
      },
      { 
        id: 2, 
        name: 'Fizik 101', 
        code: 'FIZ101',
        semester: '2023-2024 Bahar',
        students: 30
      }
    ],
    archived: [
      { 
        id: 3, 
        name: 'Kimya 101', 
        code: 'KIM101',
        semester: '2023-2024 Güz',
        students: 28
      }
    ]
  })

  const handleArchiveClass = async (classId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/classes/${classId}/archive`, {
      //   method: 'PUT'
      // })

      const classToArchive = classes.active.find(c => c.id === classId)
      if (classToArchive) {
        setClasses({
          active: classes.active.filter(c => c.id !== classId),
          archived: [...classes.archived, classToArchive]
        })
      }
    } catch (error) {
      console.error('Ders arşivlenirken hata oluştu:', error)
    }
  }

  const handleRestoreClass = async (classId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/classes/${classId}/restore`, {
      //   method: 'PUT'
      // })

      const classToRestore = classes.archived.find(c => c.id === classId)
      if (classToRestore) {
        setClasses({
          archived: classes.archived.filter(c => c.id !== classId),
          active: [...classes.active, classToRestore]
        })
      }
    } catch (error) {
      console.error('Ders geri yüklenirken hata oluştu:', error)
    }
  }

  const handleDeleteClass = async (classId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/classes/${classId}`, {
      //   method: 'DELETE'
      // })

      const confirmed = window.confirm('Bu dersi kalıcı olarak silmek istediğinize emin misiniz?')
      if (confirmed) {
        setClasses({
          ...classes,
          archived: classes.archived.filter(c => c.id !== classId)
        })
      }
    } catch (error) {
      console.error('Ders silinirken hata oluştu:', error)
    }
  }

  return (
    <div className="view-classes-container">
      <div className="page-header">
        <button 
          className="back-btn"
          onClick={() => setCurrentPage('welcome')}
        >
          <i className="fas fa-arrow-left"></i> Geri Dön
        </button>
        <div className="classes-header">
          <h1>Derslerim</h1>
          <button 
            className="create-class-btn"
            onClick={() => setCurrentPage('createClass')}
          >
            Yeni Ders Oluştur
          </button>
        </div>
      </div>

      <div className="classes-tabs">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Aktif Dersler
        </button>
        <button 
          className={`tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
          onClick={() => setActiveTab('archived')}
        >
          Arşivlenmiş Dersler
        </button>
      </div>

      <div className="classes-list">
        {activeTab === 'active' ? (
          classes.active.length > 0 ? (
            classes.active.map(classItem => (
              <div key={classItem.id} className="class-card">
                <div className="class-info">
                  <h3>{classItem.name}</h3>
                  <p>Ders Kodu: {classItem.code}</p>
                  <p>Dönem: {classItem.semester}</p>
                  <p>Öğrenci Sayısı: {classItem.students}</p>
                </div>
                <div className="class-actions">
                  <button 
                    className="view-btn"
                    onClick={() => setCurrentPage('classDetail')}
                  >
                    Görüntüle
                  </button>
                  <button 
                    className="archive-btn"
                    onClick={() => handleArchiveClass(classItem.id)}
                  >
                    Arşivle
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Aktif ders bulunmamaktadır.</p>
            </div>
          )
        ) : (
          classes.archived.length > 0 ? (
            classes.archived.map(classItem => (
              <div key={classItem.id} className="class-card archived">
                <div className="class-info">
                  <h3>{classItem.name}</h3>
                  <p>Ders Kodu: {classItem.code}</p>
                  <p>Dönem: {classItem.semester}</p>
                  <p>Öğrenci Sayısı: {classItem.students}</p>
                </div>
                <div className="class-actions">
                  <button 
                    className="restore-btn"
                    onClick={() => handleRestoreClass(classItem.id)}
                  >
                    Geri Yükle
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteClass(classItem.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Arşivlenmiş ders bulunmamaktadır.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ViewClasses 