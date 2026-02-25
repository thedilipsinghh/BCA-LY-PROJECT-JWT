
const content = (innerContent = "") => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>

<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:#0d6efd;padding:20px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;">
                AUTH IT SOLUTION
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:30px;">
              ${innerContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5ff;padding:15px;text-align:center;font-size:12px;color:#555;">
              © ${new Date().getFullYear()} AUTH IT SOLUTION <br/>
              Maharashtra, India <br/>
              <span style="color:#0d6efd;">Empowering Developers 🚀</span>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export default content;