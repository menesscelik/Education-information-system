# **Education Management System**

This project is developed to facilitate educational processes for educators and students, providing a digital platform for efficient management. The system allows users to create classes, assign homework, upload materials, join classes, and perform various other tasks.

---

## **Project Overview**

The Education Management System aims to enable students and educators to carry out essential educational tasks digitally. Educators can share lecture notes and assignments, while students can view these materials and submit their assignments. Additionally, the admin user has various tools for system management.

---

## **Features**

### **Educator**
- Create classes and share class codes.
- Assign homework with Google Calendar integration.
- Upload lecture notes and materials.

### **Student**
- Join classes using a class code.
- View assignments and track deadlines.
- Download and review course materials.

### **Admin**
- Manage users (delete, edit).
- Manage classes (delete, edit).

---

## **Target User Group**
- **Educators:** Create courses, assign homework, and share materials.
- **Students:** Join classes, view assignments, and download materials.
- **Admin:** Manage users and classes.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For user interface development.
- **CSS**: For user-friendly and responsive design.
- **Google reCAPTCHA API**: For security verification.

### **Backend**
- **Strapi**: Content Management System.
- **SQLite**: Database (can be replaced with other databases).
- **Google Calendar API**: For integrating assignment deadlines into students’ calendars.
- **bcryptjs**: For password hashing.

---

## **User Roles**

### **Educator**
- Can create classes and share codes.
- Can upload assignments and course materials.
- Can view the student list.

### **Student**
- Can join classes using a class code.
- Can view materials and assignments.
- Can track assignment deadlines via Google Calendar.

### **Admin**
- Can delete and edit users.
- Can manage classes.

---

## **Installation**

### **1. Requirements**
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Strapi**: [Strapi Installation](https://strapi.io/)
- **Google API Key**: Required for Google Calendar and reCAPTCHA integration.

---

### **2. Backend (Strapi)**
1. **Install Strapi Project**:
   ```bash
   npx create-strapi-app backend --quickstart
   ```

## **Downloading and Running the Project**

### **Download from GitHub**
1. Visit the GitHub repository and click the "Code" button.
2. Download the project as a ZIP file or clone it using SSH/HTTPS:
   ```bash
   git clone https://github.com/menesscelik/Egitim-bilgi-sistemi.git
   ```

### **Running the Project**

#### **Backend (Strapi) Setup**
1. Navigate to the project directory:
   ```bash
   cd education_system_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Strapi:
   ```bash
   npm run develop
   ```

#### **Frontend (React) Setup**
1. Navigate to the frontend directory:
   ```bash
   cd education_system_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm run dev
   ```

---

## **What Can It Do?**

This system allows educators and students to manage their educational processes digitally. Educators can create classes, assign homework, and upload materials, while students can join classes, view assignments, and review materials. Admin users have various tools for system management.

## **GitHub Repository**

You can access the source code of the project on GitHub: [Education Management System GitHub Repository](https://github.com/menesscelik/Egitim-bilgi-sistemi.git)

