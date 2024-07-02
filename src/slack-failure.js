import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
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
              text: '🚨 A Neon Twin failed',
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
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

init();
