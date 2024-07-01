import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
  const bytes = parseInt(process.env.DATABASE_SIZE_IN_BYTES, 10);
  const kilobytes = (bytes / 1024).toFixed(2);
  const megabytes = (bytes / (1024 * 1024)).toFixed(2);
  const gigabytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);
  const gibibytes = (bytes / (1024 * 1024 * 1024)).toFixed(2);

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  try {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '☝️ A new Neon Twin is available',
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
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
