
import basetem from "./basetem.js";

const registerTem = ({ name }) => {
  const content = `
    <h2 style="margin-top:0;">Welcome to AUTH 🎉</h2>

    <p>Hi ${name},</p>

    <p>
      Your account has been successfully created.
      We're excited to have you with us.
    </p>

    <p>
      You can now log in and start exploring courses,
      projects, and developer resources.
    </p>

    <div style="text-align:center;margin:25px 0;">
      <a 
        href="https://yourapp.com/login"
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
        Login to Your Account
      </a>
    </div>

    <p style="font-size:14px;color:#555;">
      If you need help, simply reply to this email.
    </p>
  `;

  return basetem(content);
};

export default registerTem;