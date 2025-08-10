import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [adminToken, setAdminToken] = useState('');

  return (
    <div className="App" style={{padding:'24px'}}>
      <h1>URL Shortener</h1>

      <section style={{marginBottom: '24px'}}>
        <UrlForm />
      </section>

      <section style={{borderTop: '1px solid #ccc', paddingTop: '16px'}}>
        {!adminToken ? (
          <AdminLogin onLogin={setAdminToken} />
        ) : (
          <div>
            <button style={{marginBottom : '10px', border : '2px solid pink'}} onClick={() => setAdminToken('')}>Logout Admin</button>
            <AdminDashboard token={adminToken} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
