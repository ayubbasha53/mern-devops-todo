import nodemailer from "nodemailer";

export async function sendResetEmail(toEmail, resetLink) {
  console.log("========== SEND RESET EMAIL ==========");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
  console.log("Sending email to:", toEmail);

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
    });

  // Verify SMTP Connection
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");
  } catch (err) {
    console.error("❌ SMTP Verify Error:");
    console.error(err);
    throw err;
  }

  // Send Email
  try {
    const info = await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Reset your Task Manager password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2>Reset your password</h2>

          <p>
            We received a request to reset your Task Manager password.
          </p>

          <p>
            This reset link will expire in <strong>1 hour</strong>.
          </p>

          <p style="margin:30px 0;">
            <a
              href="${resetLink}"
              style="
                background:#d6a24c;
                color:#17181c;
                text-decoration:none;
                padding:12px 20px;
                border-radius:6px;
                font-weight:bold;
                display:inline-block;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            If you did not request a password reset, you can safely ignore this email.
          </p>

          <hr />

          <small>
            Task Manager Team
          </small>
        </div>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (err) {
    console.error("❌ Send Mail Error:");
    console.error(err);
    throw err;
  }
}