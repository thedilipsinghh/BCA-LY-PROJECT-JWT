
import basetem from "./basetem.js";

const otpTem = ({ name, otp, min = 5, sec = 0 }) => {
  const content = `
    <h2 style="margin-top:0;">Your Verification Code</h2>

    <p>Hi ${name},</p>

    <p>
      Use the One-Time Password (OTP) below to continue.
    </p>

    <div style="text-align:center;margin:30px 0;">
      <span style="
        font-size:32px;
        letter-spacing:6px;
        font-weight:bold;
        background:#f1f5ff;
        padding:12px 24px;
        display:inline-block;
        border-radius:6px;
      ">
        ${otp}
      </span>
    </div>

    <p style="font-size:14px;color:#555;">
      This code will expire in ${min} minute(s) ${sec} second(s).
    </p>

    <p style="font-size:14px;color:#555;">
      If you didn’t request this code, you can safely ignore this email.
    </p>
  `;

  return basetem(content);
};

export default otpTem;