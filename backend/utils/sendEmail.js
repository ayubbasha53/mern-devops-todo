import nodemailer from "nodemailer";

export async function sendResetEmail(toEmail, resetLink) {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify SMTP connection
  await transporter.verify();
  console.log("✅ SMTP Connected Successfully");

  // Send Email
  const info = await transporter.sendMail({
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your Task Manager password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>We received a request to reset your Task Manager password. This link expires in 1 hour.</p>

        <p>
          <a
            href="${resetLink}"
            style="
              background:#d6a24c;
              color:#17181c;
              padding:10px 20px;
              border-radius:6px;
              text-decoration:none;
              font-weight:600;
              display:inline-block;
            "
          >
            Reset Password
          </a>
        </p>

        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  console.log("✅ Email sent successfully:", info.messageId);
}