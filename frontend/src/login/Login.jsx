import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // Context API se login function nikal rahe hain
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to backend
      const { data } = await loginUser({ email, password });
      
      // Token aur user data context mein save karo (LocalStorage bhi update ho jayega)
      login(data.user, data.token);
      
      // Login hote hi Home par redirect kardo
      navigate('/'); 
    } catch (error) {
      alert(error.response?.data?.message || "❌ Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '10px', width: '350px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back 🔐</h2>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="Enter your email" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="Enter your password" />
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
}

// Inline styling
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' };