import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve('./config/.env') });

const Port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ElevenLabs API details
const TTS_API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`;
const TTS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Routes
app.post('/speak', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('Text is required');
  }

  try {
    const response = await axios.post(
      TTS_API_URL,
      {
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': TTS_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Error generating audio:', error.message);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
