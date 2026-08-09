import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser, fetchProfile, fetchManagerStats, fetchAdminDashboard } from '../api';

// ================= HOME PAGE =================
export const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page 🏠</h1>
      {user ? <h3>Hello, {user.name}! Your role is: {user.role}</h3> : <h3>Please login to continue.</h3>}
    </div>
  );
};

// ================= LOGIN PAGE =================
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      login(data.user, data.token); // Context mein save kiya
      navigate('/'); // Login hote hi Home par bhej diya (Tumhari requirement)
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// ================= PROTECTED PAGES =================
export const Profile = () => {
  const [msg, setMsg] = useState('Loading...');
  useEffect(() => {
    fetchProfile().then((res) => setMsg(res.data.message)).catch(() => setMsg("Error loading"));
  }, []);
  return <h2 style={{ padding: '20px', color: 'blue' }}>{msg}</h2>;
};

export const ManagerPage = () => {
  const [msg, setMsg] = useState('Loading...');
  useEffect(() => {
    fetchManagerStats().then((res) => setMsg(res.data.message)).catch((err) => setMsg(err.response?.data?.message || "Access Denied"));
  }, []);
  return <h2 style={{ padding: '20px', color: 'orange' }}>📈 Manager Stats: {msg}</h2>;
};

export const AdminPage = () => {
  const [msg, setMsg] = useState('Loading...');
  useEffect(() => {
    fetchAdminDashboard().then((res) => setMsg(res.data.message)).catch((err) => setMsg(err.response?.data?.message || "Access Denied"));
  }, []);
  return <h2 style={{ padding: '20px', color: 'red' }}>👑 Admin Dashboard: {msg}</h2>;
};