import '../styles/Login.css'

const Login = ({ setCurrentPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('teacher');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Giriş</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-posta"
            required 
          />
          <input 
            type="password" 
            placeholder="Şifre"
            required 
          />
          <div className="button-group">
            <button 
              type="button" 
              className="back-btn"
              onClick={() => setCurrentPage('welcome')}
            >
              Geri Dön
            </button>
            <button type="submit" className="login-submit-btn">
              Giriş Yap
            </button>
          </div>
          <button 
            type="button" 
            className="teacher-btn"
            onClick={() => setCurrentPage('teacher')}
          >
            Eğitmen Girişi
          </button>
          <button 
            type="button" 
            className="register-link"
            onClick={() => setCurrentPage('register')}
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login