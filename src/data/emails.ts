import { sendEmail } from '@/lib/email';

export const resetPasswordTemplate = async (email: string, url: string) => {
  await sendEmail(
    { to: email },
    'Forgot Password',
    'Reset Password',
    `
      <p>Please click the link below to reset your password:</p>
      <a href="${url}">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
    `
  );
};

export const passwordChangedTemplate = async (email: string) => {
  await sendEmail(
    { to: email },
    'Password Changed',
    'Your Password Was Changed',
    `
      <p>Your password has been changed.</p>
      <p>If you did not make this change, please contact DOST SA USC immediately.</p>
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
