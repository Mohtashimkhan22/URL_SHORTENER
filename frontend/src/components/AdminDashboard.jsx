import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ token }) => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.REACT_APP_API_BASE || 'http://localhost:5000';
  const BASE_URL = import.meta.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const fetchUrls = async () => {
    try {
      setError('');
      const res = await axios.get(`${API_BASE}/api/urls`, {
        headers: { 'x-admin-token': token }
      });
      setUrls(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch');
    }
  };

  useEffect(() => { fetchUrls(); }, []);

  return (
    <div className="admin-dashboard">
      <h2>All Shortened URLs</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Shortcode</th>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Clicks</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(u => (
            <tr key={u._id}>
              <td>{u.shortCode}</td>
              <td>
                <a href={`${BASE_URL}/${u.shortCode}`} target="_blank" rel="noreferrer">
                  {BASE_URL}/{u.shortCode}
                </a>
              </td>
              <td><a href={u.longUrl} target="_blank" rel="noreferrer">{u.longUrl}</a></td>
              <td>{u.clicks}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
