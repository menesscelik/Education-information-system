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
          Authorization: `0e321d6972afa9c4a11570f5fadfae0da10bdcb37adb9b837b35ece1d5a032acff55a0b5098209aab04c8596ce9f4ea794a6cceb8b04304f0f367ea95ef7e7e0ba16d7daa2f8354a8468a4ca29e4e37fc8af996bca1469913145957b6f6fdb2abd68ed3b94554e17c43957912263dd2fe584300a3f6569aa78a3f75823f14c33`,
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
