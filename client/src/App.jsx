import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkerRegister from './pages/WorkerRegister';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerLogin from './pages/EmployerLogin';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerLogin from './pages/WorkerLogin';
import CampRegister from './pages/CampRegister';
import About from './pages/About';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register-worker" element={<WorkerRegister />} />
                <Route path="/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer-login" element={<EmployerLogin />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/worker-login" element={<WorkerLogin />} />
                <Route path="/worker-dashboard" element={<WorkerDashboard />} />
                <Route path="/camp-register" element={<CampRegister />} />
                <Route path="/about" element={<About />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
            <StickyCTA />
            {/* Footer removed from here as it is now in Home.jsx or can remain global if desired. 
              Let's keep the global footer too but simplified if Home has a big one. 
              Actually, Home has a specific footer now, so we can conditionally render or just hide this one on Home.
              For simplicity, I'll remove the global footer duplicate since Home.jsx has the "Rich" footer.
          */}
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
