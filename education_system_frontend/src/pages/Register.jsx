import '../styles/Register.css';

const Register = ({ setCurrentPage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form bilgilerini alın
    const formData = new FormData(e.target);
    const data = {
      Name: formData.get('name'), // Strapi'de "Name" olarak tanımlandı
      Sirname: formData.get('sirname'), // Strapi'de "Sirname"
      Mail: formData.get('mail'), // Strapi'de "Mail"
      Password: formData.get('password'), // Strapi'de "Password"
      Role: formData.get('role'), // Strapi'de "Role"
    };

    try {
      // Strapi API'ye POST isteği
      const response = await fetch('http://localhost:1337/api/registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `95ac8d5eacf9bef8edf1a5cadfb2f36ff62ee3a34b88a7e5bd1e0f2a2b1043e3a13967ad174b139b214e42599cab3ad3bb021747b4bfe96b2f847b470ac937127b987e6a11f60daf970911bffad3b20e6264b02106a032eef0dad11fdee7ef930943edd118e32e4520cf3908380f922a4116bbfbac9029be4b1690dbd2cbef0d`,
        },
        body: JSON.stringify({ data }), // Strapi formatına uygun
      });

      if (response.ok) {
        const result = await response.json();
        alert('Kayıt başarıyla tamamlandı!');
        setCurrentPage('login'); // Login sayfasına yönlendirme
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error.message || 'Bilinmeyen bir hata oluştu'}`);
      }
    } catch (err) {
      alert('Kayıt sırasında bir hata oluştu.');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Kayıt Ol</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Ad"
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="sirname"
              placeholder="Soyad"
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="mail"
              placeholder="E-posta"
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="password"
              placeholder="Şifre"
              required 
            />
          </div>
          <div className="form-group">
          <select name="role" required>
            <option value="">Rol Seçiniz</option>
            <option value="Öğrenci">Öğrenci</option>
            <option value="Öğretmen">Öğretmen</option>
          </select>
          </div>
          <div className="button-group">
            <button 
              type="button" 
              className="back-btn"
              onClick={() => setCurrentPage('welcome')}
            >
              Geri Dön
            </button>
            <button type="submit" className="register-btn">
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
