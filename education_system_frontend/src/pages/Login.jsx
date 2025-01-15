import '../styles/Login.css';
import { useState } from 'react';

const Login = ({ setCurrentPage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const enteredEmail = formData.get('email');
    const enteredPassword = formData.get('password');

    try {
      const response = await fetch('http://localhost:1337/api/registers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();

        const user = result.data.find(
          (register) =>
            register.Mail === enteredEmail && register.Password === enteredPassword
        );

        if (user) {
          // Kullanıcı bilgilerini localStorage'a kaydediyoruz
          localStorage.setItem('userId', user.id); // Kullanıcı ID'si
          localStorage.setItem('userEmail', user.Mail); // Kullanıcı e-posta adresi
          localStorage.setItem('userName', user.Name); // Kullanıcı adı
          localStorage.setItem('userSirname', user.Sirname); // Kullanıcı soyadı
          localStorage.setItem('userRole', user.Role); // Kullanıcı rolü

          if (user.Role === 'Öğretmen') {
            setCurrentPage('teacher');
          } else if (user.Role === 'Öğrenci') {
            setCurrentPage('student');
          } else if (user.Role === 'Admin') {
            setCurrentPage('adminPanel'); // Admin paneline yönlendir
          }

          alert('Giriş başarılı!');
        } else {
          alert('E-posta veya şifre hatalı!');
        }
      } else {
        alert('Sunucudan veri alınırken bir hata oluştu!');
      }
    } catch (err) {
      console.error('Login Hatası:', err);
      alert('Giriş sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Giriş</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            required
          />
          <input
            type="password"
            name="password"
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
            className="register-link"
            onClick={() => setCurrentPage('register')}
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
