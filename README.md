# Gamify Wellness

## 🏆 Overview
**Gamify Wellness** is a web application designed to make wellness activities engaging through gamification. Users can track their yoga sessions, participate in leaderboards, and manage their profiles.

## 🚀 Tech Stack
### Frontend:
- React with Vite
- React Router
- Tailwind CSS (Styling)
- Netlify (Deployment)

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Render (Deployment)

---

## 🛠 Installation & Setup
### Prerequisites:
- Node.js & npm installed
- MongoDB Atlas or local MongoDB instance

### Clone the Repository
```sh
git clone https://github.com/Shkmr07/RS_Innovators.git
```

### Backend Setup
```sh
cd Backend
npm install
```
Create a `.env` file in the **backend** folder:
```env
PORT = 3000
SECRET_KEY = your_secret_key
DB = your_mongodb password
EXP = 1d
```
Run the backend server:
```sh
$ npm run server
```

### Frontend Setup
```sh
cd Frontend/Gamify_wellness
npm install
```
Create a `.env` file in the **frontend** folder:
```env
.env
```
Run the frontend app:
```sh
$ npm run server
```

---

## 📡 API Endpoints (Backend)
### Authentication
- **POST** `/api/user/signup` → Register a user
- **POST** `/api/user/login` → Authenticate user & return tokens
- **POST** `/api/user/logout` → Logout user & blacklist tokens

### Yoga Sessions
- **POST** `/api/yoga` → Create a new yoga session
- **GET** `/api/yoga` → Get all yoga sessions
- **GET** `/api/yoga/:id` → Get session by ID
- **PUT** `/api/yoga/:id` → Update session
- **DELETE** `/api/yoga/:id` → Delete session

### Leaderboard
- **GET** `/api/user/leaderboard` → Fetch leaderboard rankings

---

## 🎨 Frontend Features
- **Authentication**: Users can sign up, log in, and manage their profiles.
- **Yoga Sessions**: Users can track and manage yoga activities.
- **Leaderboard**: Displays user rankings based on engagement.
- **Responsive UI**: Built with Tailwind CSS for a seamless experience.

---

## 🚀 Deployment
- **Frontend**: Deployed on Netlify → [Live Demo](https://gamifywellness.netlify.app/)
- **Backend**: Deployed on Render → [API Base URL](https://rs-innovators.onrender.com/)

---

## 🤝 Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License
MIT License

---

## 📞 Contact
For any queries, feel free to reach out at **shkmrsingh@gmail.com**

