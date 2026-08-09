import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './ Components /Navbar';
import Footer from './ Components /Footer';
import { Home,  Profile, ManagerPage, AdminPage } from './ Components /Pages';
// (Note: Signup ki file khud bana lena Login jaisi hi hogi, main jagah bachane ke liye skip ki hai)
import Signup from './signup/Signup';
import Login from './login/Login';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          <Navbar />
          
          <div style={{ flex: 1, padding: '20px' }}> {/* Main Content Area */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes (RBAC Logic Navbar aur API dono jagah cover hai) */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>

          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;