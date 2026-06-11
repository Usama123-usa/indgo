import express from 'express';
import rateLimit from 'express-rate-limit';
import { generateChatbotReply } from './services/geminiChatbotService.js';
import { loadServerEnv } from './services/envService.js';

loadServerEnv();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: '16kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: true });
});

app.post(
  '/chatbot/message',
  rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
  }),
  async (req, res) => {
    try {
      const reply = await generateChatbotReply(req.body?.message, req.body?.history);
      res.json({ status: true, reply });
    } catch (error) {
      if (error.code === 'EMPTY_MESSAGE') {
        return res.status(400).json({
          status: false,
          reply: 'Please enter a message.',
        });
      }

      if (error.code === 'MISSING_GEMINI_API_KEY') {
        return res.status(500).json({
          status: false,
          reply: 'Chatbot is not configured yet. Please contact our team for more details.',
        });
      }

      if (error.code === 'DOCUMENT_MISSING' || error.code === 'DOCUMENT_EMPTY') {
        return res.status(500).json({
          status: false,
          reply: 'Company information is not available right now. Please contact our team for more details.',
        });
      }

      console.error('Gemini chatbot error:', error);
      return res.status(502).json({
        status: false,
        reply: 'Chatbot is temporarily unavailable. Please try again later or contact our team for more details.',
      });
    }
  },
);

app.listen(port, () => {
  console.log(`Chatbot API running on http://127.0.0.1:${port}`);
});
