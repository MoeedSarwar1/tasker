const generateVerificationEmail = (verificationCode) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #0A0A0C;
        margin: 0;
        padding: 0;
        color: #FFFFFF;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: linear-gradient(135deg, #121214, #0A0A0C);
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        text-align: center;
      }
      .logo {
        font-size: 32px;
        font-weight: bold;
        color: #D4AF37;
        margin-bottom: 20px;
        letter-spacing: 2px;
      }
      .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 15px;
        color: #FFFFFF;
      }
      .message {
        font-size: 16px;
        color: #B3B3B8;
        margin-bottom: 30px;
      }
      .code {
        display: inline-block;
        background: #D4AF37;
        color: #0A0A0C;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        padding: 15px 30px;
        border-radius: 12px;
        margin-bottom: 20px;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #6E6E73;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">TASUKU</div>
      <div class="title">Verify Your Account</div>
      <div class="message">
        Welcome to <strong>TASUKU</strong> 🎉<br/>
        Please use the verification code below to activate your account.
      </div>
      <div class="code">${verificationCode}</div>
      <div class="message">
        This code will expire in <strong>10 minutes</strong> for security reasons.
      </div>
      <div class="footer">
        If you did not sign up for TASUKU, please ignore this email.<br/><br/>
        © 2025 TASUKU. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
module.exports = { generateVerificationEmail };
