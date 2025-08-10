import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [token, setToken] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!token) return;
    onLogin(token);
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="Enter admin token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
