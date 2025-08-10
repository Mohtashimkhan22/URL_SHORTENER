const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Url = require('./models/Url');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL 
  ],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('URL Shortener API is running. Use /api/shorten to shorten URLs.');
});

app.use('/api', require('./routes/UrlRoutes'));

app.get('/:shortcode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });
    if (url) {
      url.clicks = (url.clicks || 0) + 1;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
  });
