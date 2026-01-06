# Ek Digital Labour Chowk 🛠️🇮🇳

> **Bridging the gap between daily wagers and employers through technology.**

## 📖 About The Project

**Ek Digital Labour Chowk** is a digital platform designed to modernize the traditional "Labour Chowk" experience. In India, millions of daily wage workers gather at physical locations (chowks) every morning to find work. This process is often disorganized, uncertain, and lacks dignity.

Our platform aims to:
- **Digitize Identities:** Give every worker a verified digital profile.
- **Connect Instantly:** Allow employers to hire skilled workers (Plumbers, Carpenters, Painters, etc.) near them with one click.
- **Empower:** Provide consistent work opportunities and visibility to the unorganized workforce.
- **Language Support:** Fully bilingual (English & Hindi) to be accessible to all.

---

## 🚀 Features

### For Workers (मज़दूर)
- **Easy Registration:** Simple mobile number sign-up with OTP verification.
- **Privacy First:** Phone numbers are masked until a job is accepted.
- **Availability Toggle:** Mark yourself as "Available" or "Busy" instantly.
- **Job History:** Track all your past jobs and earnings.
- **Hindi Support:** The entire app works in Hindi for ease of use.

### For Employers (मालिक)
- **Quick Hiring:** Search for workers by **Skill** (e.g., "Plumber") and **Location** (e.g., "Mohali").
- **Verified Workers:** Look for the **Shield Icon** to find Govt-ID verified workers.
- **Transparent Hiring:** View worker ratings, experience, and distance before hiring.
- **One-Click Requests:** Send job details (Wage, Duration, Start Date) instantly.
- **SMS Alerts:** Receive simulated SMS notifications when a request is sent.

### 🏕️ Offline Camp Mode (New!)
- **Rapid Bulk Registration:** A specialized mode for volunteers to register workers quickly at physical chowks.
- **No-Login Access:** Optimized for speed and high volume entry.
- **Session Tracking:** Counts workers registered in the current session.
- **URL:** `/camp-admin`

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)** - Fast, modern UI library.
- **Tailwind CSS** - Utility-first CSS for styling.
- **Lucide React** - Beautiful, consistent icons.
- **React Router** - Seamless navigation.
- **Axios** - For API communication.

### Backend
- **Node.js & Express.js** - Robust server-side framework.
- **In-Memory Store** - For storing users and jobs during the demo phase.
- **JWT** - JSON Web Token for secure authentication.

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js installed (v14 or higher).
- NPM (Node Package Manager).

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ek-digital-labour-chowk
```

### 2. Setup Backend Server
The backend runs on port `5000`.
```bash
cd server
npm install
npm start
```
*You should see: `Server running on port 5000`*

### 3. Setup Frontend Client
The frontend runs on port `5173` (Vite default). Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*You should see a URL like: `http://localhost:5173`*

### 4. Open in Browser
Visit **`http://localhost:5173`** to use the app.

---

## 📱 How to Use (Demo Flow)

### Scenario 1: Registering as a Worker
1. Click **"Register as Worker"** on the home page.
2. Enter a Mobile Number (e.g. `9876543210`).
3. Click **"Get OTP"**.
4. A **Yellow Box** will appear on screen with the code (e.g. `1234`). Enter it.
5. Fill in details: Name, Skill, Location, Experience.
6. Submit! You are now visible to employers.

### Scenario 2: Hiring a Worker
1. Go to **Login** -> **Login as Employer**.
2. Enter Mobile Number & OTP (displayed on screen).
3. On the Dashboard, search for **"Plumber"** in **"Patna"** (or any location).
4. See the list of workers. Look for the **Verified Badge**.
5. Click **"Hire Now"**.
6. Enter Job Duration, Start Date, and Offer Wage.
7. Click "Send Request". You will see a **Simulated SMS Toast**.

### Scenario 3: Worker Accepts Job
1. Log in as the Worker you just hired.
2. Go to your Dashboard.
3. You will see a **"New Offer"** card with the Employer's Name and Wage.
4. Click **"Accept"**.
5. The job moves to "Active Jobs" and you can now Chat!

---

## 🤝 Contributing
Contributions are welcome! If you'd like to improve this project for the betterment of the workforce, please fork and submit a pull request.

## 📄 License
This project is open-source and free to use.

---
*Built with ❤️ for India’s Workforce.*
