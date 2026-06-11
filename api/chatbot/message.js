import { generateChatbotReply } from '../../client/server/services/geminiChatbotService.js';
import { loadServerEnv } from '../../client/server/services/envService.js';

loadServerEnv();

const WINDOW_MS = 60 * 1000;
const LIMIT = 20;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = hits.get(ip) || { count: 0, resetAt: now + WINDOW_MS };

  if (record.resetAt <= now) {
    record.count = 0;
    record.resetAt = now + WINDOW_MS;
  }

  record.count += 1;
  hits.set(ip, record);

  return record.count > LIMIT;
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, {
      status: false,
      reply: 'Method not allowed.',
    });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return sendJson(res, 429, {
      status: false,
      reply: 'Please wait a moment before sending another message.',
    });
  }

  try {
    const reply = await generateChatbotReply(req.body?.message, req.body?.history);
    return sendJson(res, 200, { status: true, reply });
  } catch (error) {
    if (error.code === 'EMPTY_MESSAGE') {
      return sendJson(res, 400, {
        status: false,
        reply: 'Please enter a message.',
      });
    }

    if (error.code === 'MISSING_GEMINI_API_KEY') {
      return sendJson(res, 500, {
        status: false,
        reply: 'Chatbot is not configured yet. Please contact our team for more details.',
      });
    }

    if (error.code === 'DOCUMENT_MISSING' || error.code === 'DOCUMENT_EMPTY') {
      return sendJson(res, 500, {
        status: false,
        reply: 'Company information is not available right now. Please contact our team for more details.',
      });
    }

    console.error('Vercel Gemini chatbot error:', error);
    return sendJson(res, 502, {
      status: false,
      reply: 'Chatbot is temporarily unavailable. Please try again later or contact our team for more details.',
    });
  }
}
