import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const emailTemplate = (subject: string, content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #4a90e2; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background-color: #f9f9f9; }
      .footer { background-color: #f1f1f1; color: #888; padding: 10px; text-align: center; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://sjc.microlink.io/Ahrg6tJhIrvey8KdzzTErCOKELj-8jBPhO8jftGOhbatmyS8kdsveE7HCpb2hwL6KlOvckobMWe9duCXIRGxmA.jpeg" alt="Infolly Support" style="height: 40px; margin-bottom: 10px;" />
        <h1>Infolly Support</h1>
      </div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Infolly. All rights reserved.</p>
        <p>If you have any questions, please contact us at support@infolly.net</p>
      </div>
    </div>
  </body>
  </html>
`;

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await transporter.sendMail({
      from: 'support@infolly.net',
      to,
      subject,
      html: emailTemplate(subject, body),
    });
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

