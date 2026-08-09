import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
      <h2>RBAC System</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        
        {/* Agar user login NAHI hai */}
        {!user && (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </>
        )}

        {/* Agar user login HAI */}
        {user && (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile ({user.role})</Link>
            
            {/* 👑 RBAC LOGIC: Manager aur Admin ko ye dikhega */}
            {(user.role === 'manager' || user.role === 'admin') && (
              <Link to="/manager" style={{ color: 'yellow', textDecoration: 'none' }}>Manager Stats</Link>
            )}

            {/* 👑👑 RBAC LOGIC: Sirf Admin ko ye dikhega */}
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'red', textDecoration: 'none' }}>Admin Dashboard</Link>
            )}

            <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}