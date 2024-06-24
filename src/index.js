import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
  const bytes = parseInt(process.env.ARTIFACT_SIZE_BYTES, 10);
  const kilobytes = bytes / 1024;
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  console.log('bytes: ', bytes);
  console.log('kilobytes: ', kilobytes);
  console.log('date: ', date);
  console.log('process.env.SLACK_WEBHOOK_URL: ', process.env.SLACK_WEBHOOK_URL);

  try {
    // fetch(process.env.SLACK_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     blocks: [
    //       {
    //         type: 'header',
    //         text: {
    //           type: 'plain_text',
    //           text: 'RDS Prod to Neon',
    //           emoji: true,
    //         },
    //       },
    //       {
    //         type: 'divider',
    //       },
    //       {
    //         type: 'section',
    //         text: {
    //           type: 'plain_text',
    //           text: `${kilobytes} KB restored: ${date}`,
    //         },
    //       },
    //     ],
    //   }),
    // });
  } catch (error) {
    console.error(error);
  }
};

init();
