// pages/api/download.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sirf POST method allowed hai!' });
  }

  try {
    const { url } = req.body;

    // TikTok URL Validation
    if (!url || !url.includes('tiktok.com')) {
      return res.status(400).json({ error: 'Sahi TikTok URL daalen!' });
    }

    // TikTok API Call
    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data.data) {
      throw new Error('Video nahi mila');
    }

    // Response Data
    const videoData = {
      url: response.data.data.play,
      title: response.data.data.title,
      author: response.data.data.author?.nickname || 'Unknown'
    };

    res.status(200).json(videoData);
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      error: 'Server error!',
      details: error.message 
    });
  }
}