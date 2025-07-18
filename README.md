# Money Guard 💰

---

### 🇺🇸 English

## 📋 Project Description

**Money Guard** is a comprehensive personal finance management application that helps users track their income, expenses, and manage their budget effectively. The application provides a modern, intuitive interface for financial planning and transaction monitoring.

## ✨ Key Features

- **User Authentication System**

  - User registration and login
  - Email verification
  - Password reset functionality
  - Secure logout

- **Transaction Management**

  - Create, read, update, and delete transactions
  - Income and expense tracking
  - Transaction pagination and sorting
  - Statistical summaries by period

- **Category Management**

  - Predefined spending and saving categories
  - Easy categorization of transactions

- **User Profile Management**
  - Update personal information
  - Manage account settings

## 🛠 Technology Stack

### Frontend

- **Framework:** React.js 18+
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Forms:** React Hook Form + Yup
- **Visualization:** Chart.js
- **Icons:** React Icons
- **Build Tool:** Vite
- **Hosting:** Vercel

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi
- **API Documentation:** Swagger
- **Middleware:** CORS
- **Password Hashing:** bcrypt
- **Image Storage:** Cloudinary
- **Deployment**: Render

## 🌐 Live Demo & Resources

- **🖥 Frontend Application**: [https://money-guard-frontend-five.vercel.app/](https://money-guard-frontend-five.vercel.app/)
- **📚 API Documentation**: [https://money-guard-backend-3e63.onrender.com/api-docs/](https://money-guard-backend-3e63.onrender.com/api-docs/)
- **💻 Frontend Repository**: [GitHub - Frontend](https://github.com/Ira-Panasiuk-2024/Money-Guard-frontend)
- **⚙️ Backend Repository**: [GitHub - Backend](https://github.com/Ira-Panasiuk-2024/Money-Guard-backend)

## 🚀 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login existing user
- `POST /auth/logout` - Logout user
- `GET /auth/verify` - Verify user's email
- `POST /auth/request-reset-password` - Request password reset
- `POST /auth/reset-password` - Reset user's password

### User Management

- `GET /users/current` - Get current user profile
- `PATCH /users/current` - Update current user profile

### Transactions

- `GET /transactions` - Get user's transactions with pagination and sorting
- `POST /transactions` - Create a new transaction
- `PATCH /transactions/{id}` - Update a transaction
- `DELETE /transactions/{id}` - Delete a transaction
- `GET /transactions/statistics` - Get user's transactions summary by period

### Categories

- `GET /categories` - Get all available categories

## 📱 Features Overview

1. **Secure Authentication**: Complete user authentication system with email verification
2. **Transaction Tracking**: Full CRUD operations for financial transactions
3. **Data Visualization**: Statistical summaries and period-based analysis
4. **Responsive Design**: Works seamlessly across desktop and mobile devices
5. **Real-time Updates**: Instant synchronization between frontend and backend

## 🏗 Installation & Setup

### Environment Variables

Before running the application, you need to set up the following environment variables:

#### Backend (.env)

```env
PORT=
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_DB=
JWT_SECRET=
APP_DOMAIN=
CLOUD_NAME=
API_KEY=
API_SECRET=
ENABLE_CLOUDINARY=
EMAIL_USER=
EMAIL_PASS=
EMAIL_HOST=
EMAIL_PORT=
BASE_URL=
FRONTEND_URL=
```

**Environment Variables Description:**
- `PORT` - Server port number
- `MONGODB_USER` - MongoDB database username
- `MONGODB_PASSWORD` - MongoDB database password
- `MONGODB_URL` - MongoDB connection URL
- `MONGODB_DB` - MongoDB database name
- `JWT_SECRET` - Secret key for JWT token generation
- `APP_DOMAIN` - Application domain name
- `CLOUD_NAME` - Cloudinary cloud name for image storage
- `API_KEY` - Cloudinary API key
- `API_SECRET` - Cloudinary API secret
- `ENABLE_CLOUDINARY` - Enable/disable Cloudinary service
- `EMAIL_USER` - Email service username (Gmail address)
- `EMAIL_PASS` - Email service password (App Password from Gmail)
- `EMAIL_HOST` - Email service host
- `EMAIL_PORT` - Email service port
- `BASE_URL` - Backend base URL
- `FRONTEND_URL` - Frontend application URL

#### Frontend (.env)

```env
VITE_API_URL=
```

**Environment Variables Description:**
- `VITE_API_URL` - Backend API base URL

### Frontend Setup

```bash
git clone https://github.com/Ira-Panasiuk-2024/Money-Guard-frontend.git
cd Money-Guard-frontend
npm install
npm run dev
npm run build
npm run preview
npm start

```

### Backend Setup

```bash
git clone https://github.com/Ira-Panasiuk-2024/Money-Guard-backend.git
cd Money-Guard-backend
npm install
npm run dev
npm start
```

## 👤 Author

**Ira Panasiuk** - Full Stack Developer

---

### 🇺🇦 Українська

## 📋 Опис проєкту

**Money Guard** - це комплексний додаток для управління особистими фінансами, який допомагає користувачам відстежувати доходи, витрати та ефективно керувати своїм бюджетом. Додаток надає сучасний, інтуїтивно зрозумілий інтерфейс для фінансового планування та моніторингу транзакцій.

## ✨ Основні функції

- **Система аутентифікації користувачів**

  - Реєстрація та вхід користувачів
  - Верифікація електронної пошти
  - Функціональність скидання пароля
  - Безпечний вихід з системи

- **Управління транзакціями**

  - Створення, читання, оновлення та видалення транзакцій
  - Відстеження доходів та витрат
  - Пагінація та сортування транзакцій
  - Статистичні зведення за періоди

- **Управління категоріями**

  - Попередньо визначені категорії витрат та заощаджень
  - Легка категоризація транзакцій

- **Управління профілем користувача**
  - Оновлення особистої інформації
  - Управління налаштуваннями акаунту

## 🛠 Технологічний стек

### Фронтенд

- **Framework:** React.js 18+
- **Стан додатку:** Redux Toolkit
- **Маршрутизація:** React Router DOM
- **HTTP клієнт:** Axios
- **Форми:** React Hook Form + Yup
- **Візуалізація:** Chart.js
- **Іконки:** React Icons
- **Збирання:** Vite
- **Хостинг:** Vercel

### Бекенд

- **Середовище виконання:** Node.js
- **Фреймворк:** Express.js
- **База даних:** MongoDB з Mongoose ODM
- **Автентифікація:** JWT (JSON Web Tokens)
- **Валідація:** Joi
- **Документація API:** Swagger
- **Middleware:** CORS
- **Хешування паролів:** bcrypt
- **Зберігання зображень:** Cloudinary
- **Розгортання**: Render

## 🌐 Демо та ресурси

- **🖥 Фронтенд додаток**: [https://money-guard-frontend-five.vercel.app/](https://money-guard-frontend-five.vercel.app/)
- **📚 Документація API**: [https://money-guard-backend-3e63.onrender.com/api-docs/](https://money-guard-backend-3e63.onrender.com/api-docs/)
- **💻 Репозиторій фронтенду**: [GitHub - Frontend](https://github.com/Ira-Panasiuk-2024/Money-Guard-frontend)
- **⚙️ Репозиторій бекенду**: [GitHub - Backend](https://github.com/Ira-Panasiuk-2024/Money-Guard-backend)

## 🚀 API ендпоінти

### Аутентифікація

- `POST /auth/register` - Реєстрація нового користувача
- `POST /auth/login` - Вхід існуючого користувача
- `POST /auth/logout` - Вихід користувача
- `GET /auth/verify` - Верифікація електронної пошти користувача
- `POST /auth/request-reset-password` - Запит на скидання пароля
- `POST /auth/reset-password` - Скидання пароля користувача

### Управління користувачами

- `GET /users/current` - Отримання профілю поточного користувача
- `PATCH /users/current` - Оновлення профілю поточного користувача

### Транзакції

- `GET /transactions` - Отримання транзакцій користувача з пагінацією та сортуванням
- `POST /transactions` - Створення нової транзакції
- `PATCH /transactions/{id}` - Оновлення транзакції
- `DELETE /transactions/{id}` - Видалення транзакції
- `GET /transactions/statistics` - Отримання статистичного зведення транзакцій за період

### Категорії

- `GET /categories` - Отримання всіх доступних категорій

## 📱 Огляд функцій

1. **Безпечна аутентифікація**: Повна система аутентифікації користувачів з верифікацією електронної пошти
2. **Відстеження транзакцій**: Повний набір CRUD операцій для фінансових транзакцій
3. **Візуалізація даних**: Статистичні зведення та аналіз за періодами
4. **Адаптивний дизайн**: Безпроблемна робота на настільних комп'ютерах та мобільних пристроях
5. **Оновлення в режимі реального часу**: Миттєва синхронізація між фронтендом та бекендом

## 🏗 Встановлення та налаштування

### Змінні оточення

Перед запуском додатку необхідно налаштувати наступні змінні оточення:

#### Бекенд (.env)

```env
PORT=
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_DB=
JWT_SECRET=
APP_DOMAIN=
CLOUD_NAME=
API_KEY=
API_SECRET=
ENABLE_CLOUDINARY=
EMAIL_USER=
EMAIL_PASS=
EMAIL_HOST=
EMAIL_PORT=
BASE_URL=
FRONTEND_URL=
```

**Опис змінних оточення:**
- `PORT` - Номер порту сервера
- `MONGODB_USER` - Ім'я користувача бази даних MongoDB
- `MONGODB_PASSWORD` - Пароль бази даних MongoDB
- `MONGODB_URL` - URL підключення до MongoDB
- `MONGODB_DB` - Назва бази даних MongoDB
- `JWT_SECRET` - Секретний ключ для генерації JWT токенів
- `APP_DOMAIN` - Доменне ім'я додатку
- `CLOUD_NAME` - Назва хмарного сховища Cloudinary
- `API_KEY` - API ключ Cloudinary
- `API_SECRET` - API секрет Cloudinary
- `ENABLE_CLOUDINARY` - Увімкнути/вимкнути сервіс Cloudinary
- `EMAIL_USER` - Ім'я користувача поштової служби (Gmail адреса)
- `EMAIL_PASS` - Пароль поштової служби (App Password від Gmail)
- `EMAIL_HOST` - Хост поштової служби
- `EMAIL_PORT` - Порт поштової служби
- `BASE_URL` - Базова URL бекенду
- `FRONTEND_URL` - URL фронтенд додатку

#### Фронтенд (.env)

```env
VITE_API_URL=
```

**Опис змінних оточення:**
- `VITE_API_URL` - Базова URL бекенд API

### Налаштування фронтенду

```bash
git clone https://github.com/Ira-Panasiuk-2024/Money-Guard-frontend.git
cd Money-Guard-frontend
npm install
npm run dev
npm run build
npm run preview
npm start
```

### Налаштування бекенду

```bash
git clone https://github.com/Ira-Panasiuk-2024/Money-Guard-backend.git
cd Money-Guard-backend
npm install
npm run dev
npm start
```

## 👤 Автор

**Ірина Панасюк** - Full Stack розробник
