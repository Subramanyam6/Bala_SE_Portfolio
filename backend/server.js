const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, company, email, subject, message, wantsReply, phone } = req.body;

    console.log('Received contact form submission:', req.body);

    // Build email content
    let htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
    `;

    if (company) {
      htmlContent += `<p><strong>Company:</strong> ${company}</p>`;
    }

    htmlContent += `
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style='padding: 15px; background-color: #f5f5f5; border-radius: 5px; margin: 10px 0;'>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    if (wantsReply) {
      htmlContent += `<h3 style='color: #2563eb; margin-top: 20px;'>Contact Details for Reply:</h3>`;
      
      if (email) {
        htmlContent += `<p><strong>Email:</strong> <a href='mailto:${email}'>${email}</a></p>`;
      }
      
      if (phone) {
        htmlContent += `<p><strong>Phone:</strong> ${phone}</p>`;
      }
    }

    const msg = {
      to: 'bduggirala2@huskers.unl.edu',
      from: process.env.SENDGRID_VERIFIED_SENDER || 'noreply@balaportfolio.com',
      subject: `[Portfolio Contact] ${subject}`,
      html: htmlContent,
    };

    console.log('Sending email to SendGrid...');
    await sgMail.send(msg);
    console.log('Email sent successfully');
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email: ' + error.message });
  }
});

const PORT = process.env.PORT || 8080; // Changed to 8080 to match the proxy config
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 