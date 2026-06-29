import { sendContactEmail } from '../../client/server/services/contactEmailService.js';
import { loadServerEnv } from '../../client/server/services/envService.js';

loadServerEnv();

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { status: false, error: 'Method not allowed.' });
  }

  try {
    await sendContactEmail(req.body || {});
    return sendJson(res, 200, { status: true });
  } catch (error) {
    if (error.code === 'MISSING_FIELDS') {
      return sendJson(res, 400, { status: false, error: error.message });
    }
    if (error.code === 'MISSING_SMTP_CONFIG') {
      return sendJson(res, 500, { status: false, error: 'Email service is not configured yet.' });
    }
    console.error('Contact email error:', error);
    return sendJson(res, 502, { status: false, error: 'Failed to send email. Please try again or contact us directly.' });
  }
}
