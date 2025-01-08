import { useState } from 'react'
import '../styles/Modal.css'

const HomeworkModal = ({ isOpen, onClose, onSubmit }) => {
  const [homeworkData, setHomeworkData] = useState({
    title: '',
    description: '',
    dueDate: '',
    file: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', homeworkData.title)
    formData.append('description', homeworkData.description)
    formData.append('dueDate', homeworkData.dueDate)
    if (homeworkData.file) {
      formData.append('file', homeworkData.file)
    }

    onSubmit(formData)
    setHomeworkData({ title: '', description: '', dueDate: '', file: null })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Yeni Ödev Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ödev Başlığı:</label>
            <input
              type="text"
              value={homeworkData.title}
              onChange={(e) => setHomeworkData({...homeworkData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Açıklama:</label>
            <textarea
              value={homeworkData.description}
              onChange={(e) => setHomeworkData({...homeworkData, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Teslim Tarihi:</label>
            <input
              type="date"
              value={homeworkData.dueDate}
              onChange={(e) => setHomeworkData({...homeworkData, dueDate: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Dosya (Opsiyonel):</label>
            <input
              type="file"
              onChange={(e) => setHomeworkData({...homeworkData, file: e.target.files[0]})}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              İptal
            </button>
            <button type="submit" className="submit-btn">
              Ödev Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomeworkModal 