// Vercel Serverless Function for Contact Form
const nodemailer = require('nodemailer');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, wantsReply, phone, company } = req.body;

  // Validation
  if (!name || !subject || !message) {
    return res.status(400).json({ error: 'Name, subject, and message are required' });
  }

  if (wantsReply && !email) {
    return res.status(400).json({ error: 'Email is required when requesting a reply' });
  }

  try {
    // Configure email transporter
    // For production: Use SendGrid, Postmark, or Gmail SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      ${wantsReply ? `
        <h3>Contact Details for Reply:</h3>
        ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ` : ''}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@portfolio.com',
      to: process.env.TO_EMAIL || 'bduggirala2@huskers.unl.edu',
      replyTo: wantsReply && email ? email : undefined,
      subject: `[Portfolio Contact] ${subject}`,
      html: emailContent,
    });

    return res.status(200).json({
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again.',
    });
  }
};
