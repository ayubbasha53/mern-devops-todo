import nodemailer from "nodemailer";

export async function sendResetEmail(toEmail, resetLink) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your Task Manager password",
    html: `
      <h2>Reset your password</h2>
      <p>Click below:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });
}