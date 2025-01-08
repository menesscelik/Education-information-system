import '../styles/Welcome.css'

const Welcome = ({ setCurrentPage }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Hoş Geldiniz</h1>
        <div className="button-container">
          <button 
            className="login-btn"
            onClick={() => setCurrentPage('login')}
          >
            Giriş Yap
          </button>
          <button 
            className="register-btn"
            onClick={() => setCurrentPage('register')}
          >
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome 