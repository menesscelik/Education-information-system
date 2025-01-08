import { useState } from 'react'
import '../styles/Modal.css'

const StudentModal = ({ isOpen, onClose, onSubmit }) => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    studentNumber: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(studentData)
    setStudentData({ name: '', email: '', studentNumber: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Öğrenci Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Öğrenci Adı Soyadı:</label>
            <input
              type="text"
              value={studentData.name}
              onChange={(e) => setStudentData({...studentData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>E-posta:</label>
            <input
              type="email"
              value={studentData.email}
              onChange={(e) => setStudentData({...studentData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Öğrenci Numarası:</label>
            <input
              type="text"
              value={studentData.studentNumber}
              onChange={(e) => setStudentData({...studentData, studentNumber: e.target.value})}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              İptal
            </button>
            <button type="submit" className="submit-btn">
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentModal 