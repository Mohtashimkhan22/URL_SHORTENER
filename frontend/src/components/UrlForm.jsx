import React, { useState } from "react";
import axios from "axios";
import "./UrlForm.css";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE || "https://url-shortener-16z2.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await axios.post(`${API_BASE}/api/shorten`, { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="url-form-container">
      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL (include https://)"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {shortUrl && (
        <div className="short-url">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
