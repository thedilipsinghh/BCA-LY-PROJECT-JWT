# JWT Based Authentication System

A full-stack, production-grade authentication module built as a Final Year BCA Project. It implements JWT-based stateless authentication with secure cookie handling, email OTP for password recovery, rate limiting, and a protected admin dashboard.

---

## Project Description

This application provides a complete authentication lifecycle: user registration with input validation, login with bcrypt-verified credentials, logout via server-side cookie clearing, and a two-step forgot password flow using time-bound OTPs delivered via email. All protected routes enforce JWT verification server-side before returning data.

---

## Features

- User registration with server-side validation
- Login with hashed password comparison (bcryptjs)
- JWT issued as an HTTP-only cookie on authentication
- Logout with server-side cookie invalidation
- Forgot password via email OTP (Nodemailer + Gmail)
- OTP expiry enforcement (configurable TTL)
- Password reset with secure token validation
- Protected admin dashboard with role-based access
- Rate limiting on auth endpoints (express-rate-limit)
- CORS policy enforced per environment
- Redux Toolkit for global auth state management
- Form validation using React Hook Form + Zod schemas

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16 | SSR/SSG React framework |
| React | 19 | UI rendering |
| Redux Toolkit | Latest | Global state management |
| Tailwind CSS | v4 | Utility-first styling |
| Bootstrap | 5.3 | Component library |
| Bootstrap Icons | Latest | Icon set |
| React Hook Form | 7 | Form handling |
| Zod | 4 | Schema-based validation |
| React Toastify | 11 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | JavaScript runtime |
| Express.js | 5 | HTTP server framework |
| MongoDB | Atlas/Local | NoSQL database |
| Mongoose | 9 | MongoDB ODM |
| jsonwebtoken | 9 | JWT generation and verification |
| bcryptjs | 3 | Password hashing |
| Nodemailer | 8 | Email delivery |
| cookie-parser | 1.4 | Cookie middleware |
| cors | 2.8 | Cross-origin policy |
| express-rate-limit | 8 | Request throttling |
| dotenv | 17 | Environment configuration |

---

## System Architecture

```
Client (Next.js)
     |
     |-- Redux Store (auth state, persisted across routes)
     |-- React Hook Form + Zod (client-side validation)
     |-- Axios/Fetch (HTTP requests with credentials: true)
     |
     v
Express.js API Server
     |
     |-- Rate Limiter Middleware (per-route throttling)
     |-- CORS Middleware (origin whitelisted per NODE_ENV)
     |-- cookie-parser (reads HTTP-only JWT cookie)
     |-- Route Handlers (auth.route, admin.route)
     |-- Controller Logic (business logic, OTP, JWT issue)
     |
     v
MongoDB (Mongoose ODM)
     |-- User model (name, email, mobile, password hash, OTP, resetToken)
     |-- Settings model (admin-configurable options)
```

JWT is issued at login and stored as an `HttpOnly` cookie — never exposed to JavaScript. All protected API routes validate the cookie token server-side before processing the request.

---

## Folder Structure

```
finalyproject/
├── client/                          # Next.js frontend
│   ├── app/
│   │   ├── (public)/                # Public-facing pages (no auth required)
│   │   │   ├── page.tsx             # Home / landing page
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forget-password/
│   │   │   └── reset-password/
│   │   ├── admin/                   # Protected admin pages
│   │   │   ├── page.tsx             # Admin dashboard
│   │   │   └── settings/
│   │   ├── _component/              # Shared UI components
│   │   │   ├── PublicNavbar.tsx
│   │   │   ├── AdminNavbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── redux/                   # Redux store slices and provider
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── layout.tsx               # Root layout with providers
│   │   └── globals.css
│   ├── constant/                    # API base URL and constants
│   ├── public/                      # Static assets
│   ├── .env                         # Frontend environment variables
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
└── server/                          # Express.js backend
    ├── controller/
    │   ├── auth.controller.js       # register, login, logout, OTP, reset
    │   └── admin.controller.js      # settings CRUD
    ├── middleware/
    │   └── limiter.js               # Rate limiters per route
    ├── model/
    │   ├── User.js                  # User schema
    │   └── settings.js              # App settings schema
    ├── routes/
    │   ├── auth.route.js            # /api/auth/*
    │   └── admin.route.js           # /api/admin/*
    ├── utils/
    │   ├── config.js                # FRONTEND_URL resolver
    │   ├── email.js                 # Nodemailer transport
    │   └── sms.js                   # SMS utility (Fast2SMS)
    ├── email-tem/                   # HTML email templates
    ├── seeder/                      # Database seed scripts
    ├── .env                         # Backend environment variables
    ├── index.js                     # Entry point
    └── package.json
```

---

## Installation

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas cluster)
- Gmail account with App Password enabled (for Nodemailer)

### Backend Setup

```bash
cd server
npm install
```

### Frontend Setup

```bash
cd client
npm install
```

---

## Environment Variables

### `server/.env`

```env
MONGO_URL=mongodb://localhost:27017/jwt-auth
PORT=5000
JWT_KEY=your_jwt_secret_key

NODE_ENV=development
LOCAL_URL=http://localhost:3000
LIVE_URL=https://your-production-domain.com

OTP_EXIPIRY=120

EMAIL=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

SMS_API_KEY=your_fast2sms_api_key
```

> `EMAIL_PASS` must be a Gmail App Password, not your account password. Enable 2FA and generate it at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

### `client/.env`

```env
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_LOCAL_URL=http://localhost:5000
NEXT_PUBLIC_LIVE_URL=https://your-api-domain.com
```

---

## Running the Project

### Development

```bash
# Terminal 1 — Backend
cd server
node index.js

# Terminal 2 — Frontend
cd client
npm run dev
```

Frontend: `http://localhost:3000`  
Backend API: `http://localhost:5000`

### Production Build (Frontend)

```bash
cd client
npm run build
npm run start
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Rate Limit | Description |
|---|---|---|---|
| POST | `/signup` | 5 req/min | Register new user |
| POST | `/signin` | 2 req/min | Login, issues JWT cookie |
| POST | `/signout` | None | Clears auth cookie |
| POST | `/send-otp` | 2 req/min | Send OTP to registered email |
| POST | `/verify-otp` | 2 req/min | Verify submitted OTP |
| POST | `/forget-password` | None | Initiate password reset |
| POST | `/reset-password` | None | Set new password using reset token |

### Admin Routes — `/api/admin`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/setting` | Retrieve app settings |
| PUT | `/setting/:sid` | Update app settings |

---

## Authentication Flow

```
1. Register
   Client -- POST /api/auth/signup --> Server
   Server: validate input, hash password (bcryptjs), save User to MongoDB
   Response: 201 Created

2. Login
   Client -- POST /api/auth/signin --> Server
   Server: find user by email, compare password hash
   If valid: sign JWT (jsonwebtoken), set as HttpOnly cookie
   Response: 200 OK + Set-Cookie header

3. Access Protected Route
   Client sends request with credentials (cookie auto-attached by browser)
   Server: cookie-parser reads cookie, verifies JWT signature
   If valid: proceed; If invalid/expired: 401 Unauthorized

4. Forgot Password
   Client -- POST /api/auth/send-otp --> Server
   Server: generate OTP, store hash + timestamp in User document, send email via Nodemailer
   Client submits OTP -- POST /api/auth/verify-otp --> Server validates within TTL window
   On success: issue resetToken, redirect to reset-password page

5. Reset Password
   Client -- POST /api/auth/reset-password (with resetToken) --> Server
   Server: validate token, hash new password, clear token, update User document

6. Logout
   Client -- POST /api/auth/signout --> Server
   Server: clears the HttpOnly cookie
   Redux store: auth state reset to null
```

---

## Security Practices

| Practice | Implementation |
|---|---|
| Password hashing | bcryptjs with default salt rounds |
| Token storage | JWT stored in HttpOnly cookie (not localStorage) |
| Cookie security | HttpOnly flag prevents client-side JS access |
| Rate limiting | express-rate-limit on signup, signin, and OTP routes |
| OTP expiry | OTP validated against `otpSendOn` + `OTP_EXPIRY` window |
| Environment isolation | Secrets in `.env`, never committed to version control |
| CORS policy | Origin restricted by `NODE_ENV` (local vs. live URL) |
| Input validation | Zod schemas on client; server-side validation in controllers |
| Reset token lifecycle | Single-use reset token cleared from DB after password update |

---

## Screenshots

> Replace placeholders with actual screenshots.

| View | Screenshot |
|---|---|
| Home Page | `./screenshots/home.png` |
| Register Page | `./screenshots/register.png` |
| Login Page | `./screenshots/login.png` |
| Forgot Password | `./screenshots/forgot-password.png` |
| OTP Verification | `./screenshots/otp-verify.png` |
| Admin Dashboard | `./screenshots/admin-dashboard.png` |

---

## Deployment

### Backend (Render / Railway / VPS)

1. Push the `server/` directory to a Git repository.
2. Set all environment variables from `server/.env` in the platform dashboard.
3. Set start command to `node index.js`.
4. Ensure `NODE_ENV=production` and `LIVE_URL` point to your frontend domain.

### Frontend (Vercel)

1. Push the `client/` directory (or monorepo root) to GitHub.
2. Import the repository in Vercel. Set root directory to `client/`.
3. Add all `NEXT_PUBLIC_*` environment variables in the Vercel project settings.
4. Deploy. Vercel auto-builds on push to `main`.

---

## Future Improvements

- OAuth 2.0 integration (Google, GitHub) via NextAuth.js
- Refresh token rotation with sliding session windows
- Email verification at registration (before account activation)
- SMS-based OTP as a primary channel over email
- Admin user management panel (ban, role assignment)
- Audit log for authentication events (login, failed attempts, resets)
- Two-factor authentication (TOTP via Authenticator apps)
- Docker Compose setup for reproducible local environments

---

## Author

**Dilip Singh**  
BCA Final Year Student

- GitHub: [github.com/thedilipsinghh](https://github.com/thedilipsinghh)
- LinkedIn: [linkedin.com/in/thedilipsinghh](https://www.linkedin.com/in/thedilipsinghh)
- Email: ds4718421@gmail.com

---

> This project was developed as a Final Year BCA project to demonstrate practical implementation of secure, stateless authentication in a full-stack JavaScript environment.



Very important step i run in another system 

create frontend .env file
with this variabel
NEXT_PUBLIC_NODE_ENV=

NEXT_PUBLIC_LIVE_URL=
NEXT_PUBLIC_LOCAL_URL=


next backend .env file
with is variable

MONGO_URL=
PORT=5000
JWT_KEY=
NODE_ENV=
LIVE_URL=
LOCAL_URL=
OTP_EXIPIRY=
EMAIL=
EMAIL_PASS=


