import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
  const jobStatus = process.env.JOB_STATUS || 'unknown';

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  const bytes = parseInt(process.env.DB_QUERY, 10) || 0;
  const gigabytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);

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
            text: `• ${gigabytes} GB twinned from production`,
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
