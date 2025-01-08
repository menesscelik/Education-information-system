import { useState } from 'react'
import '../styles/Modal.css'

const ShareNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    description: '',
    file: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', noteData.title)
    formData.append('description', noteData.description)
    formData.append('file', noteData.file)
    
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ders Notu Paylaş</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Not Başlığı:</label>
            <input
              type="text"
              value={noteData.title}
              onChange={(e) => setNoteData({...noteData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Açıklama:</label>
            <textarea
              value={noteData.description}
              onChange={(e) => setNoteData({...noteData, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Dosya:</label>
            <input
              type="file"
              onChange={(e) => setNoteData({...noteData, file: e.target.files[0]})}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              İptal
            </button>
            <button type="submit" className="submit-btn">
              Paylaş
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShareNoteModal 