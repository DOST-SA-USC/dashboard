import { sendEmail } from '@/lib/email';

export const resetPasswordTemplate = async (email: string, url: string) => {
  await sendEmail(
    { to: email },
    'Reset Password',
    'Reset Your Password',
    `
      <p><strong>This link is private and will expire shortly.</strong></p>
      <p>Please click the link below to reset your password:</p>
      <a href="${url}">Reset Password</a>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>⚠️ Do not share this link with anyone for security reasons.</p>
    `
  );
};

export const passwordChangedTemplate = async (email: string) => {
  await sendEmail(
    { to: email },
    'Password Change',
    'Your Password Was Changed',
    `
      <p>Your account password was successfully changed.</p>
      <p>If <strong>you</strong> made this change, no further action is needed.</p>
      <p>⚠️ If you <strong>did not</strong> authorize this change, please reset your password immediately and contact DOST SA USC support without delay.</p>
      <p>For your security, never share your password or recovery codes with anyone.</p>
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
  await sendEmail(
    {
      to: process.env.NEXT_PUBLIC_EMAIL_TO!,
      bcc: recipients,
    },
    'New Announcement',
    title,
    html
  );
};
