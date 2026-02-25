
import basetem from "./basetem.js";

const forgetPasswordTem = ({ name, resetLink }) => {
  const content = `
    <h2 style="margin-top:0;">Password Reset Request</h2>

    <p>Hi ${name},</p>

    <p>
      We received a request to reset your password.
      Click the button below to set a new one.
    </p>

    <div style="text-align:center;margin:25px 0;">
      <a 
        href="${resetLink}"
        style="
          background:#0d6efd;
          color:#ffffff;
          padding:12px 24px;
          text-decoration:none;
          border-radius:4px;
          display:inline-block;
          font-weight:bold;
        "
      >
        Reset Password
      </a>
    </div>

    <p style="font-size:14px;color:#555;">
      This link will expire in 15 minutes.
    </p>

    <p style="font-size:14px;color:#555;">
      If you didn’t request this, you can safely ignore this email.
    </p>
  `;

  return basetem(content);
};

export default forgetPasswordTem;