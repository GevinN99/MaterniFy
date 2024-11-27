# **MaterniFy**

MaterniFy is a mobile-first application designed to assist pregnant women with their mental and physical health management. The app provides personalized health plans, real-time emergency assistance, a chatbot for quick support, and features to involve partners, all while ensuring data privacy and inclusivity.

---

## **Table of Contents**
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Project Overview**

MaterniFy aims to bridge the gap in maternal healthcare, especially in underserved and rural areas. The app focuses on accessibility, multilingual support, and offline functionality, ensuring that users can manage their health effectively and get timely assistance when needed.

---

## **Features**

- **User Registration and Authentication:** Secure login and signup functionality for mothers and their partners.  
- **Partner Involvement:** Share health updates and reminders with partners to encourage teamwork.  
- **Personalized Health Plans:** Generate or view custom health plans based on user preferences and medical history.  
- **Emergency Assistance:** Quick access to emergency resources and offline guidance.  
- **Chatbot Integration:** 24/7 virtual assistant for health tips, reminders, and support.  
- **Offline Access:** Access critical features without an internet connection.  
- **Multilingual Support:** Available in multiple languages for inclusivity.  
- **Educational Resources:** Searchable and offline-accessible materials on pregnancy, labor, and postpartum care.  

---

## **Tech Stack**

### **Frontend (React Native)**:
- React Native  
- React Navigation  
- Axios (for API calls)  

### **Backend (Node.js)**:
- Node.js  
- Express.js  
- MongoDB/MySQL (configurable)  
- JWT (for authentication)  

### **Other Tools**:
- Firebase (Notifications, Realtime Database)  
- AWS/Azure (Cloud hosting)  
- Twilio (SMS integration)  

---

## **Folder Structure**

```plaintext
MaterniFy/
├── frontend/                         # React Native frontend code
├── backend/                          # Node.js backend code
├── database/                         # Database schema and seed files
├── docs/                             # Documentation and design artifacts
├── tests/                            # Testing scripts and configurations
├── scripts/                          # Deployment and setup scripts
├── .env                              # Environment variables
├── .gitignore                        # Files to be ignored by Git
├── README.md                         # Project overview
```

For a detailed folder structure, see [Folder Structure Details](#folder-structure).

---

## **Getting Started**

### **Prerequisites**
1. **Node.js** (v16 or higher)  
2. **npm** or **yarn**  
3. **React Native CLI**  
4. **MongoDB** or **MySQL** (for the database)  
5. **Firebase Account** (for notifications)  

### **Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/YourUsername/MaterniFy.git
cd MaterniFy
```

#### **2. Set Up the Backend**
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` folder with the following variables:
  ```env
  PORT=5000
  DATABASE_URL=your_database_url
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend:
  ```bash
  npm start
  ```

#### **3. Set Up the Frontend**
```bash
cd ../frontend
npm install
```
- Start the React Native app:
  ```bash
  npm start
  ```

---

## **Usage**

1. **Register and Login:** Create an account and log in to access personalized features.  
2. **Invite Partners:** Involve partners to enhance collaboration in health management.  
3. **Emergency Assistance:** Access quick-call options or offline guidance for emergencies.  
4. **Chatbot:** Get instant answers to health-related questions.  
5. **Health Plan:** View or generate personalized health plans.  

---

## **Contributing**

Contributions are welcome! Please follow these steps:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m "Add feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Submit a pull request.  

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

