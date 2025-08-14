import { sendEmail } from '@/lib/email';

export const resetPasswordTemplate = async (
  email: string,
  name: string,
  url: string
) => {
  await sendEmail(
    { to: email },
    'Reset Password',
    'Password Reset Request',
    `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
      <h2 style="color: #222; text-align: center;">Password Reset Request</h2>

      <p>Hello, ${name}</p>
      
      <p>We received a request to reset the password for your account. If you made this request, please click the button below to securely reset your password.</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #35427D; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Reset Password
        </a>
      </p>

      <p style="margin-top: 20px;">
        <em>If the button above does not work, copy and paste the link below into your browser:</em>
        <br>
        <a href="${url}" style="word-break: break-all; color: #35427D;">${url}</a>
      </p>

      <p><strong>This link is private and for your security, it will expire shortly</strong></p>

      
      
      <p>⚠️ <strong>Security Reminder:</strong> Do not share this link with anyone. We will never ask for your password or reset link.</p>
      
      <p>If you did not request a password reset, you can safely ignore this email and your account will remain unchanged.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

      <p style="font-size: 0.9em; color: #555;">
        This is an automated message — please do not reply.  
        If you have any questions or concerns, please contact DOST SA USC.
      </p>
    </div>
    `
  );
};

export const passwordChangedTemplate = async (email: string) => {
  const manilaTime = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  await sendEmail(
    { to: email },
    'Password Changed',
    'Your account password has been changed',
    `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
        <h2 style="color: #222; text-align: center;">Password Changed</h2>

        <p>Hello,</p>

        <p>Your account password was successfully changed on <strong>${manilaTime}</strong>.</p>

        <p>If <strong>you</strong> made this change, no further action is needed.</p>

        <p>⚠️ <strong>If you did not authorize this change</strong>, please reset your password immediately and contact DOST SA USC without delay.</p>

        <p>For your security, never share your password or recovery codes with anyone. We will never ask for these details.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

        <p style="font-size: 0.9em; color: #555;">
          This is an automated message — please do not reply.<br>
          If you have any questions or concerns, please contact DOST SA USC.
        </p>
      </div>
    `
  );
};

export const announcementEmailTemplate = async ({
  recipients,
  title,
  html,
}: {
  recipients: string[];
  title: string;
  html: string;
}) => {
  const body = `
    <h2 style="color: #222; text-align: center;">${title}</h2>

    ${html}

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="font-size: 0.9em; color: #555;">
      This is an automated announcement — please do not reply.<br>
      For any questions, please contact DOST SA USC.
    </p>
  `;

  await sendEmail(
    {
      to: process.env.NEXT_PUBLIC_EMAIL_TO!,
      bcc: recipients,
    },
    'New Announcement',
    title,
    body
  );
};
