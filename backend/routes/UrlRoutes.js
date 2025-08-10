const express = require('express');
const router = express.Router();
const { customAlphabet } = require('nanoid');
const validator = require('validator');
const Url = require('../models/Url');

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 7);

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return 'http://' + url;
  }
  return url;
}

router.post('/shorten', async (req, res) => {
  try {
    let { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'Long URL is required' });

    longUrl = normalizeUrl(String(longUrl).trim());

    if (!validator.isURL(longUrl, { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`,
        shortCode: existing.shortCode
      });
    }

    let shortCode, collision;
    do {
      shortCode = nanoid();
      collision = await Url.findOne({ shortCode });
    } while (collision);

    const newUrl = await Url.create({ longUrl, shortCode });

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}`, shortCode });
  } catch (error) {
    console.error('POST /api/shorten error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/urls', async (req, res) => {
  const token = req.headers['x-admin-token'] || '';
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const urls = await Url.find({}).sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
