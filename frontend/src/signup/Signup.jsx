import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role 'user' hoga
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to backend
      await signupUser({ name, email, password, role });
      alert("🎉 Signup Successful! You can now login.");
      navigate('/login'); // Signup ke baad Login page par bhej do
    } catch (error) {
      alert(error.response?.data?.message || "❌ Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '10px', width: '350px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account 📝</h2>
        
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '15px' }}>
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} placeholder="Enter your name" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="Enter your email" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="Create a password" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Select Role (For Testing RBAC)</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
              <option value="user">Normal User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin (Boss)</option>
            </select>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

// Choti si inline styling taake form pyara lagay
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' };