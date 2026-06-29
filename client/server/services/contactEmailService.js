import nodemailer from 'nodemailer';

const INQUIRY_LABELS = {
  'ev-charging': 'EV Charging Installation',
  'solar-residential': 'Home Solar Solutions',
  'solar-commercial': 'Commercial Solar Projects',
  'bess': 'Battery Energy Storage Systems (BESS)',
  'dealership': 'Dealership Inquiry',
};

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

export async function sendContactEmail({ name, email, inquiryType, message }) {
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim();
  const cleanMessage = String(message || '').trim();
  const inquiryLabel = INQUIRY_LABELS[inquiryType] || inquiryType || 'General Inquiry';

  if (!cleanName || !cleanEmail || !cleanMessage) {
    const error = new Error('Name, email, and message are required.');
    error.code = 'MISSING_FIELDS';
    throw error;
  }

  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpEmail || !smtpPassword) {
    const error = new Error('SMTP credentials are not configured.');
    error.code = 'MISSING_SMTP_CONFIG';
    throw error;
  }

  const transporter = createTransporter();

  // Email to INDIGOST team
  await transporter.sendMail({
    from: `"INDIGOST Website" <${smtpEmail}>`,
    to: smtpEmail,
    replyTo: cleanEmail,
    subject: `New Inquiry: ${inquiryLabel} from ${cleanName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
        <h2 style="color:#1e1b4b;border-bottom:2px solid #10b981;padding-bottom:12px;">New Contact Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:140px;">Name:</td><td style="padding:8px 0;color:#111827;">${escapeHtml(cleanName)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td><td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#4f46e5;">${escapeHtml(cleanEmail)}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Inquiry Type:</td><td style="padding:8px 0;color:#111827;">${escapeHtml(inquiryLabel)}</td></tr>
        </table>
        <div style="margin-top:16px;">
          <p style="font-weight:bold;color:#374151;margin-bottom:8px;">Message:</p>
          <div style="background:#f9fafb;padding:16px;border-radius:6px;color:#111827;line-height:1.6;">${escapeHtml(cleanMessage)}</div>
        </div>
        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">This inquiry was submitted via the INDIGOST website contact form.</p>
      </div>
    `,
  });

  // Auto-reply to customer
  await transporter.sendMail({
    from: `"INDIGOST Group" <${smtpEmail}>`,
    to: cleanEmail,
    subject: `We received your inquiry — INDIGOST Group`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
        <h2 style="color:#1e1b4b;">Thank you, ${escapeHtml(cleanName)}!</h2>
        <p style="color:#374151;line-height:1.6;">We have received your inquiry and our team will get back to you within <strong>2 business hours</strong>.</p>
        <div style="background:#f0fdf4;border-left:4px solid #10b981;padding:16px;border-radius:4px;margin:20px 0;">
          <p style="margin:0;font-weight:bold;color:#374151;">Your Inquiry Summary</p>
          <p style="margin:8px 0 0;color:#374151;"><strong>Type:</strong> ${escapeHtml(inquiryLabel)}</p>
          <p style="margin:8px 0 0;color:#374151;"><strong>Message:</strong></p>
          <p style="margin:8px 0 0;color:#374151;">${escapeHtml(cleanMessage)}</p>
        </div>
        <p style="color:#374151;line-height:1.6;">For urgent matters, you can also reach us directly:</p>
        <ul style="color:#374151;line-height:2;">
          <li>Phone / WhatsApp: <strong>+92 300 9358751</strong></li>
          <li>Email: <strong>${smtpEmail}</strong></li>
        </ul>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="color:#9ca3af;font-size:12px;">INDIGOST Group Pakistan &mdash; Leading EV Charging &amp; Solar Solutions</p>
      </div>
    `,
  });
}
