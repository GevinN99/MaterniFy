# Maternify API

Maternify API is a backend system designed to improve maternal health outcomes in underserved areas. This project includes functionalities to manage users, health plans, emergency contacts, and community posts. The system is built using **Node.js** and **MongoDB**, and incorporates secure authentication and image storage integration using Firebase.

---

## Features

- **User Management**:
    - Register, login, update profiles, and manage user data.
- **Health Plan Management**:
    - Create, retrieve, update, and delete personalized health plans.
    - Store Firebase-hosted images for health plan resources.
- **Emergency Contacts**:
    - Manage critical emergency contacts with images.
- **Community Posts**:
    - Create, retrieve, and manage posts with optional images.
- **Secure Authentication**:
    - JWT-based authentication for secure access.

---

## System UI

![System UI](assets/UI.png)

## System Architecture

The architecture follows a modular design:

- **Routes**: Define the API endpoints for each module.
- **Controllers**: Handle the logic for API requests.
- **Models**: Define the MongoDB schema and structure for the data.
- **Middleware**: Manage authentication and other reusable logic.

---

## Installation

### Prerequisites

- **Node.js** (v14+)
- **MongoDB**
- **Firebase** (for image storage)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/maternify-api.git
   cd maternify-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with the following keys:
   ```env
   SECRET_KEY=your-secret-key
   MONGO_URI=mongodb://localhost:27017/maternify
   PORT=8070
   FIREBASE_CREDENTIALS=path/to/firebase/credentials.json
   FIREBASE_BUCKET=your-firebase-storage-bucket
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Test the APIs using [Postman](https://www.postman.com/) or other tools. Import the provided Postman collection for easier testing.

---

## API Endpoints

### User Management

| Endpoint               | Method | Description         |
|------------------------|--------|---------------------|
| `/api/users/register`  | POST   | Register a new user |
| `/api/users/login`     | POST   | Login a user        |
| `/api/users/profile`   | GET    | Get user profile    |
| `/api/users/all-users` | GET    | Retrieve all users  |

### Health Plans

| Endpoint                      | Method | Description               |
|-------------------------------|--------|---------------------------|
| `/api/health-plans/create`    | POST   | Create a health plan      |
| `/api/health-plans`           | GET    | Retrieve a health plan    |
| `/api/health-plans/update`    | PUT    | Update health plan images |

### Emergency Contacts

| Endpoint                                | Method | Description              |
|-----------------------------------------|--------|--------------------------|
| `/api/emergency-contacts/add`          | POST   | Add an emergency contact |
| `/api/emergency-contacts`              | GET    | Get all emergency contacts |

### Community Posts

| Endpoint                         | Method | Description           |
|----------------------------------|--------|-----------------------|
| `/api/community-posts/create`    | POST   | Create a community post |
| `/api/community-posts`           | GET    | Retrieve community posts |

---

## Contributing

We welcome contributions to Maternify API! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
