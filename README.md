# Eğitim Yönetim Sistemi

Bu proje, eğitimciler ve öğrenciler için eğitim süreçlerini kolaylaştırmak ve dijital bir ortamda yönetim sağlamak amacıyla geliştirilmiştir. Sistem, kullanıcıların sınıf oluşturma, ödev verme, materyal yükleme, sınıfa katılım ve daha birçok işlemi gerçekleştirebilmesini sağlar.

---

## **Proje Özeti**

Eğitim Yönetim Sistemi, öğrencilerin ve eğitmenlerin ihtiyaç duyduğu birçok işlemi dijital olarak yapabilmesini amaçlar. Sistem, eğitmenlerin ders notları ve ödev paylaşmasını, öğrencilerin ise bu materyalleri görüntüleyip ödev teslim etmesini sağlar. Ayrıca admin kullanıcı, sistem yönetimi için çeşitli araçlara sahiptir.

---

## **Özellikler**

### **Eğitmen**
- Sınıf oluşturma ve kod paylaşımı.
- Ödev oluşturma ve Google Calendar entegrasyonu.
- Ders notu ve materyal yükleme.

### **Öğrenci**
- Sınıf kodu ile sınıfa katılma.
- Ödevleri görüntüleme ve teslim tarihi takibi.
- Materyalleri indirip inceleme.

### **Admin**
- Kullanıcı yönetimi (silme, düzenleme).
- Sınıf yönetimi (silme, düzenleme).

---

## **Hedef Kullanıcı Kitlesi**
- **Eğitmenler:** Ders oluşturma, ödev verme ve materyal paylaşımı.
- **Öğrenciler:** Sınıflara katılma, ödevleri görüntüleme ve materyalleri indirme.
- **Admin:** Kullanıcı ve sınıf yönetimi.

---

## **Kullanılan Teknolojiler**

### **Frontend**
- **React.js**: Kullanıcı arayüzü geliştirme.
- **CSS**: Kullanıcı dostu ve responsive tasarım.
- **Google reCAPTCHA API**: Güvenlik doğrulaması.

### **Backend**
- **Strapi**: İçerik yönetim sistemi.
- **SQLite**: Veritabanı (diğer veritabanlarıyla değiştirilebilir).
- **Google Calendar API**: Ödev teslim tarihlerini öğrencilerin takvimine entegre etme.
- **bcryptjs**: Şifre hashleme.

---

## **Kullanıcı Rolleri**

### **Eğitmen**
- Sınıf oluşturabilir ve kod paylaşabilir.
- Ödev ve ders materyali yükleyebilir.
- Öğrenci listesi görüntüleyebilir.

### **Öğrenci**
- Sınıf kodu ile sınıfa katılabilir.
- Materyal ve ödevleri görüntüleyebilir.
- Ödevlerin teslim tarihini Google Calendar ile takip edebilir.

### **Admin**
- Kullanıcıları silebilir ve düzenleyebilir.
- Sınıfları yönetebilir.

---

## **Kurulum**

### **1. Gereksinimler**
- **Node.js**: [Node.js İndir](https://nodejs.org/)
- **Strapi**: [Strapi Kurulumu](https://strapi.io/)
- **Google API Key**: Google Calendar ve reCAPTCHA entegrasyonu için gerekli.

---

### **2. Backend (Strapi)**
1. **Strapi Projesini Kurun**:
   ```bash
   npx create-strapi-app backend --quickstart
