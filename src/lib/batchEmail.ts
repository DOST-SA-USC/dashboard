import { announcementEmailTemplate } from '@/data/emails';

export default async function sendBatchedEmails({
  recipients,
  title,
  html,
}: {
  recipients: string[];
  title: string;
  html: string;
}) {
  const batchSize = 100;

  const batches = [];
  for (let i = 0; i < recipients.length; i += batchSize) {
    batches.push(recipients.slice(i, i + batchSize));
  }

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    try {
      await announcementEmailTemplate({
        recipients: batch,
        title: title,
        html: html,
      });
    } catch (err) {
      console.error(`Failed to send batch ${i + 1}:`, err);
      throw err;
    }
  }
}
