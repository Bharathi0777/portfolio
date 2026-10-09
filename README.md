# Personal Portfolio Web Application (Full-Stack MERN + TypeScript)

A modern, dynamic, and responsive personal portfolio website designed for a **3rd-Year Information Technology Engineering Student**. Built with a clean decoupled architecture: **React + TypeScript + Vite + Plain CSS** on the frontend, and **Node.js + Express.js + TypeScript + MongoDB (Mongoose)** on the backend.

Includes a fully-featured **Admin Control Dashboard** with JWT authentication for dynamic CRUD management of profile details, technical skills, education timeline, projects, certifications, and visitor inquiries.

---

## 🌟 Key Highlights & Features

- **Dynamic Content via REST APIs**: Every project, skill, education milestone, certification, and profile bio is fetched dynamically from MongoDB through Express REST APIs.
- **Pure Plain CSS**: No Tailwind, Bootstrap, MUI, or CSS libraries. Styled using dedicated vanilla `.css` files (`Navbar.css`, `Hero.css`, `About.css`, `Skills.css`, `Education.css`, `Projects.css`, `Certifications.css`, `Resume.css`, `Contact.css`, `Footer.css`, `Admin.css`).
- **Dark Navy Theme & Light Mode Toggle**: Aesthetic developer palette utilizing CSS custom variables with persistent local preference.
- **Student-Centric Sections**:
  1. **Home / Hero**: Greeting, rotating roles, status badge, quick stats (CGPA, Solved DSA Problems, Projects), CTA buttons, and interactive avatar card.
  2. **About Me**: Student journey, career goals, technical interests, and interactive terminal code preview.
  3. **Skills**: Categorized into Frontend, Backend, Database, DevOps & Cloud, Core CS, and Tools with animated proficiency bars.
  4. **Education**: Timeline of B.Tech degree, high school, scores, CGPA, and relevant computer science coursework.
  5. **Projects**: Filterable project gallery with tags, key engineering highlights, GitHub repository, and live demo links.
  6. **Certifications**: Industry credentials from AWS, Meta, Oracle, and MongoDB with direct verification links.
  7. **Resume**: Interactive CV highlights, preview card, and direct PDF download.
  8. **Contact Form**: Interactive form with live validation, submission feedback, and spam protection via rate limiting.
  9. **Footer**: Social coding links (GitHub, LinkedIn, LeetCode, Twitter), quick navigation, and back-to-top button.
- **Secure Admin Dashboard (`/admin`)**:
  - Protected by JWT authentication and bcrypt password hashing.
  - Full CRUD control: Add, edit, or delete skills, education entries, projects, and certifications.
  - Instant Profile Editor: Update bio, contact info, CGPA, graduation year, and availability status.
  - Message Inbox: View received contact messages, mark as read, or delete.
- **Strict TypeScript**: Comprehensive interfaces across client and server with zero usage of `any`.

---

## 📁 Project Folder Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   └── sample-resume.pdf
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AdminProtected.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Resume.tsx
│   │   │   └── Skills.tsx
│   │   ├── hooks/
│   │   │   └── useTheme.ts
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   ├── Admin.css
│   │   │   ├── About.css
│   │   │   ├── Certifications.css
│   │   │   ├── Contact.css
│   │   │   ├── Education.css
│   │   │   ├── Footer.css
│   │   │   ├── Hero.css
│   │   │   ├── index.css
│   │   │   ├── Navbar.css
│   │   │   ├── Projects.css
│   │   │   ├── Resume.css
│   │   │   └── Skills.css
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── certificationController.ts
│   │   │   ├── contactController.ts
│   │   │   ├── educationController.ts
│   │   │   ├── profileController.ts
│   │   │   ├── projectController.ts
│   │   │   └── skillController.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   ├── Admin.ts
│   │   │   ├── Certification.ts
│   │   │   ├── ContactMessage.ts
│   │   │   ├── Education.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Project.ts
│   │   │   └── Skill.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── certificationRoutes.ts
│   │   │   ├── contactRoutes.ts
│   │   │   ├── educationRoutes.ts
│   │   │   ├── profileRoutes.ts
│   │   │   ├── projectRoutes.ts
│   │   │   └── skillRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Step-by-Step Getting Started Guide

### Prerequisites
- **Node.js**: v18.0 or newer (tested on v26+)
- **npm**: v9.0 or newer
- **MongoDB**: Local MongoDB instance running on `localhost:27017` or a MongoDB Atlas connection string URI.

---

### Step 1: Clone or Navigate to the Workspace
Open PowerShell or your preferred terminal inside the root project directory:
```powershell
cd "c:\Users\chand\OneDrive\Desktop\anti gravity\portfolio"
```

---

### Step 2: Configure Environment Variables
Inside `backend/`, copy `.env.example` to `.env` (already created for you):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=super_secret_portfolio_jwt_key_2026_change_in_production
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=Admin@123456
```

> **Note**: If you are using MongoDB Atlas, replace `MONGODB_URI` with your connection string:
> `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority`

---

### Step 3: Install Dependencies
Open terminal windows for both backend and frontend:

#### 1. Backend:
```bash
cd backend
npm install
```

#### 2. Frontend:
```bash
cd ../frontend
npm install
```

---

### Step 4: Seed Initial 3rd-Year IT Student Data
Run the database seed script to automatically populate realistic projects, skills, education, certifications, and admin credentials into MongoDB:
```bash
cd backend
npm run seed
```

Output:
```
Connecting to MongoDB at: mongodb://127.0.0.1:27017/portfolio_db
Seeding Admin account...
Admin created: admin@portfolio.local (password: Admin@123456)
Seeding Student Profile...
Seeding Skills...
Seeding Education...
Seeding Projects...
Seeding Certifications...
Seeding Sample Contact Messages...
Database seeded successfully with 3rd-year IT student portfolio data!
```

---

### Step 5: Start the Backend Server
```bash
cd backend
npm run dev
```
The server will start at: `http://localhost:5000`
- Healthcheck endpoint: `http://localhost:5000/api/health`

---

### Step 6: Start the Frontend Application
In a second terminal window:
```bash
cd frontend
npm run dev
```
The Vite development server will start at: `http://localhost:5173`

Open your web browser and navigate to:
👉 **`http://localhost:5173`**

---

## 🔒 Accessing the Admin Dashboard

1. Navigate to: **`http://localhost:5173/admin`** (or click the shield icon in the top navigation bar).
2. Use the seeded credentials:
   - **Email**: `admin@portfolio.local`
   - **Password**: `Admin@123456`
3. Click **"Sign In to Dashboard"**.
4. Features available in the Admin Dashboard:
   - **Profile & Intro Tab**: Edit name, headline, bio, career goals, graduation year, CGPA, and social links.
   - **Skills Tab**: Add new skills with category, icon name, and proficiency percentage. Edit or delete existing skills.
   - **Education Tab**: Add, update, or remove degrees, schools, and coursework.
   - **Projects Tab**: Full CRUD for software projects, tech stacks, and live links.
   - **Certifications Tab**: Manage verified certifications and issuer details.
   - **Inquiries Tab**: Review messages submitted through the public contact form, mark them as read, or delete them.

All modifications instantly persist to MongoDB and update the live portfolio!

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service health status check | No |
| `POST` | `/api/auth/login` | Administrator login (returns JWT) | No |
| `GET` | `/api/auth/me` | Verify active session | **Yes** |
| `GET` | `/api/profile` | Get student profile details | No |
| `PUT` | `/api/profile` | Update profile information | **Yes** |
| `GET` | `/api/skills` | List all skills | No |
| `POST` | `/api/skills` | Create new skill | **Yes** |
| `PUT` | `/api/skills/:id` | Update skill | **Yes** |
| `DELETE` | `/api/skills/:id` | Delete skill | **Yes** |
| `GET` | `/api/education` | List all education entries | No |
| `POST` | `/api/education` | Create education record | **Yes** |
| `PUT` | `/api/education/:id` | Update education record | **Yes** |
| `DELETE` | `/api/education/:id` | Delete education record | **Yes** |
| `GET` | `/api/projects` | List all projects | No |
| `POST` | `/api/projects` | Create new project | **Yes** |
| `PUT` | `/api/projects/:id` | Update project | **Yes** |
| `DELETE` | `/api/projects/:id` | Delete project | **Yes** |
| `GET` | `/api/certifications` | List all certifications | No |
| `POST` | `/api/certifications` | Create certification | **Yes** |
| `PUT` | `/api/certifications/:id` | Update certification | **Yes** |
| `DELETE` | `/api/certifications/:id` | Delete certification | **Yes** |
| `POST` | `/api/contact` | Submit inquiry (Rate limited) | No |
| `GET` | `/api/contact` | View contact messages | **Yes** |
| `PATCH` | `/api/contact/:id/read` | Mark message as read | **Yes** |
| `DELETE` | `/api/contact/:id` | Delete contact message | **Yes** |

---

## 🛡️ Security Best Practices Implemented

- **Password Hashing**: Strong bcrypt salt hashing for admin credentials.
- **JWT Authorization**: Bearer tokens verified via Express middleware on sensitive mutation endpoints.
- **CORS Protection**: Whitelisted client domains.
- **Spam Prevention**: Rate limiter on `/api/contact` (max 10 submissions per 15 minutes per IP address).
- **Environment Isolation**: Database strings and secrets stored in `.env`.
- **Clean Input Sanitization**: Schema validation rules applied using Mongoose.
