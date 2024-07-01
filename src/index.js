import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
  const jobStatus = process.env.JOB_STATUS || 'unknown';

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  const bytes = parseInt(process.env.DATABASE_SIZE_IN_BYTES, 10) || 0;
  const kilobytes = (bytes / 1024).toFixed(2);
  const megabytes = (bytes / (1024 * 1024)).toFixed(2);
  const gigabytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);
  const gibibytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);

  const messages = {
    success: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '☝️ A new Neon Twin is available!',
          emoji: true,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: `Latest Twin created: ${date}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `• Kilobytes: ${kilobytes} KB\n• Megabytes: ${megabytes} MB\n• Gigabytes: ${gigabytes} GB\n• Gibibytes: ${gibibytes} GiB`,
          },
        ],
      },
    ],
    failure: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '⚠️ A Neon Twin failed',
          emoji: true,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: `Latest Twin failed: ${date}`,
        },
      },
    ],
    unknown: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '❗ Job status unknown',
          emoji: true,
        },
      },
    ],
  };

  try {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: messages[jobStatus],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
