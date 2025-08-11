'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  recipient: {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
  },
  summary: string,
  subject: string,
  html: string
) => {
  return transporter.sendMail({
    from: `"DOST SA USC - ${summary}" <${process.env.EMAIL_USER}>`,
    to: recipient.to,
    cc: recipient.cc,
    bcc: recipient.bcc,
    subject,
    html,
  });
};
