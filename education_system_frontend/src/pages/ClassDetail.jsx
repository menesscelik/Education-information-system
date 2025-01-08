import { useState } from 'react'
import ShareNoteModal from '../components/ShareNoteModal'
import StudentModal from '../components/StudentModal'
import HomeworkModal from '../components/HomeworkModal'
import '../styles/ClassDetail.css'

const ClassDetail = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('homework')
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false)
  const [notes, setNotes] = useState([
    { id: 1, title: 'Ders Notu 1', date: '2024-02-15', description: 'Hafta 1 notları', fileUrl: '#' },
    { id: 2, title: 'Ders Notu 2', date: '2024-02-16', description: 'Hafta 2 notları', fileUrl: '#' },
  ])
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', studentNumber: '2024001' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', studentNumber: '2024002' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', studentNumber: '2024003' },
  ])
  const [homeworks, setHomeworks] = useState([
    { 
      id: 1, 
      title: 'Hafta 1 Ödevi', 
      description: 'İlk hafta konularıyla ilgili alıştırmalar',
      dueDate: '2024-02-20', 
      status: 'active',
      fileUrl: null 
    },
    { 
      id: 2, 
      title: 'Hafta 2 Ödevi', 
      description: 'İkinci hafta konularıyla ilgili ödevler',
      dueDate: '2024-02-27', 
      status: 'active',
      fileUrl: null 
    },
  ])

  const handleNoteSubmit = async (formData) => {
    try {
      // API çağrısı yapılacak
      // const response = await fetch('API_URL/notes', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()

      // Şimdilik manuel olarak yeni not ekliyoruz
      const newNote = {
        id: notes.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        date: new Date().toISOString().split('T')[0],
        fileUrl: URL.createObjectURL(formData.get('file'))
      }

      setNotes([...notes, newNote])
    } catch (error) {
      console.error('Not paylaşılırken hata oluştu:', error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/notes/${noteId}`, {
      //   method: 'DELETE'
      // })

      setNotes(notes.filter(note => note.id !== noteId))
    } catch (error) {
      console.error('Not silinirken hata oluştu:', error)
    }
  }

  const handleAddStudent = async (studentData) => {
    try {
      // API çağrısı yapılacak
      // const response = await fetch('API_URL/students', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(studentData)
      // })
      // const data = await response.json()

      // Şimdilik manuel olarak yeni öğrenci ekliyoruz
      const newStudent = {
        id: students.length + 1,
        ...studentData
      }
      setStudents([...students, newStudent])
    } catch (error) {
      console.error('Öğrenci eklenirken hata oluştu:', error)
    }
  }

  const handleRemoveStudent = async (studentId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/students/${studentId}`, {
      //   method: 'DELETE'
      // })

      const confirmed = window.confirm('Bu öğrenciyi dersten çıkarmak istediğinize emin misiniz?')
      if (confirmed) {
        setStudents(students.filter(student => student.id !== studentId))
      }
    } catch (error) {
      console.error('Öğrenci silinirken hata oluştu:', error)
    }
  }

  const handleAddHomework = async (formData) => {
    try {
      // API çağrısı yapılacak
      // const response = await fetch('API_URL/homeworks', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()

      const newHomework = {
        id: homeworks.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        status: 'active',
        fileUrl: formData.get('file') ? URL.createObjectURL(formData.get('file')) : null
      }

      setHomeworks([...homeworks, newHomework])
    } catch (error) {
      console.error('Ödev eklenirken hata oluştu:', error)
    }
  }

  const handleDeleteHomework = async (homeworkId) => {
    try {
      // API çağrısı yapılacak
      // await fetch(`API_URL/homeworks/${homeworkId}`, {
      //   method: 'DELETE'
      // })

      const confirmed = window.confirm('Bu ödevi silmek istediğinize emin misiniz?')
      if (confirmed) {
        setHomeworks(homeworks.filter(hw => hw.id !== homeworkId))
      }
    } catch (error) {
      console.error('Ödev silinirken hata oluştu:', error)
    }
  }

  // Tab content kısmındaki notes bölümünü güncelleyelim
  const NotesSection = () => (
    <div className="notes-section">
      <div className="section-header">
        <h2>Ders Notları</h2>
        <button 
          className="add-btn"
          onClick={() => setIsNoteModalOpen(true)}
        >
          Not Paylaş
        </button>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-info">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p className="note-date">Paylaşım Tarihi: {note.date}</p>
            </div>
            <div className="note-actions">
              <a 
                href={note.fileUrl} 
                className="download-btn" 
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                İndir
              </a>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteNote(note.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
      <ShareNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSubmit={handleNoteSubmit}
      />
    </div>
  )

  // Students section'ı güncelleyelim
  const StudentsSection = () => (
    <div className="students-section">
      <div className="section-header">
        <h2>Öğrenci Listesi</h2>
        <button 
          className="add-btn"
          onClick={() => setIsStudentModalOpen(true)}
        >
          Öğrenci Ekle
        </button>
      </div>
      <div className="students-list">
        <table className="students-table">
          <thead>
            <tr>
              <th>Öğrenci No</th>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.studentNumber}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveStudent(student.id)}
                  >
                    Çıkar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  )

  // Homework section'ı güncelleyelim
  const HomeworkSection = () => (
    <div className="homework-section">
      <div className="section-header">
        <h2>Ödevler</h2>
        <button 
          className="add-btn"
          onClick={() => setIsHomeworkModalOpen(true)}
        >
          Yeni Ödev Ekle
        </button>
      </div>
      <div className="homework-list">
        {homeworks.map(homework => (
          <div key={homework.id} className="homework-card">
            <div className="homework-info">
              <h3>{homework.title}</h3>
              <p className="homework-description">{homework.description}</p>
              <p className="homework-due-date">
                Teslim Tarihi: {new Date(homework.dueDate).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="homework-actions">
              {homework.fileUrl && (
                <a 
                  href={homework.fileUrl} 
                  className="download-btn" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dosyayı İndir
                </a>
              )}
              <button 
                className="delete-btn"
                onClick={() => handleDeleteHomework(homework.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
      <HomeworkModal
        isOpen={isHomeworkModalOpen}
        onClose={() => setIsHomeworkModalOpen(false)}
        onSubmit={handleAddHomework}
      />
    </div>
  )

  return (
    <div className="class-detail-container">
      <div className="class-detail-header">
        <h1>Matematik 101</h1>
        <button 
          className="back-btn"
          onClick={() => setCurrentPage('viewClasses')}
        >
          Geri Dön
        </button>
      </div>

      <div className="class-detail-content">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'homework' ? 'active' : ''}`}
            onClick={() => setActiveTab('homework')}
          >
            Ödevler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Öğrenci Listesi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Ders Notları
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'homework' && <HomeworkSection />}

          {activeTab === 'students' && <StudentsSection />}

          {activeTab === 'notes' && <NotesSection />}
        </div>
      </div>
    </div>
  )
}

export default ClassDetail 