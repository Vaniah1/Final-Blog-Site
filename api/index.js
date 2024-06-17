import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from "cors"
import { verifyToken } from './utils/verifyUser.js';
import axios from "axios"

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.post('/generate', async (req, res) => {
  const inputText = req.body.input;

  if (!inputText) {
    return res.status(400).json({ error: 'Input text is required' });
  }

  const payload = {
    inputs: `[INST] <<SYS>> You are a helpful chatbot that assists in creating blogs. When someone greets you, respond with 'Hello, how can I help you with your blog today?'. For other inputs, provide relevant advice or suggestions for creating blog content. <<SYS>> ${inputText} [/INST]`,
    parameters: {
      max_new_tokens: 256,
      top_p: 0.9,
      temperature: 0.7,
    },
  };

  try {
    const response = await axios.post(
      process.env.PINECONE_API_HOST,
      payload,
      {
        headers: {
          Authorization: `API-Key ${process.env.PINECONE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Assuming the response structure may need adjustment based on Pinecone's actual response
    const generatedText = response.data.generated_text.split('[/INST] ')[1];
    res.json({ response: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
})

app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.get("/new-notification", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const hasNewNotification = await Notification.exists({
      notification_for: userId,
      seen: false,
      user: { $ne: userId },
    });
    res.status(200).json({ new_notification_available: hasNewNotification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
