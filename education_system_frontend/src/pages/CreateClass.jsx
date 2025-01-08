import '../styles/CreateClass.css'

const CreateClass = ({ setCurrentPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend'den sınıf kodu alınacak
    setCurrentPage('teacher');
  };

  return (
    <div className="create-class-container">
      <div className="create-class-box">
        <h1>Sınıf Oluştur</h1>
        <form className="create-class-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ders İsmi"
            required 
          />
          <input 
            type="text" 
            placeholder="Ders Açıklaması"
            required 
          />
          <div className="button-group">
            <button 
              type="button" 
              className="back-btn"
              onClick={() => setCurrentPage('teacher')}
            >
              Geri Dön
            </button>
            <button type="submit" className="create-btn">
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClass 