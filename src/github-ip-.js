import dotenv from 'dotenv';
dotenv.config();
import { Octokit } from 'octokit';
import fs from 'fs';

// https://docs.github.com/en/rest/meta/meta?apiVersion=2022-11-28
// https://docs.github.com/en/rest/meta/meta?apiVersion=2022-11-28#get-github-meta-information
const octokit = new Octokit({
  auth: process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN,
});

const init = async () => {
  const response = await octokit.request('GET /meta', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  //   console.log(response);

  fs.writeFile('./github-meta.json', JSON.stringify(response, null, 2), (err) => {
    if (err) {
      // Handle the error if there is one
      console.error('Error writing to file:', err);
    } else {
      // Log success message
      console.log('File written successfully');
    }
  });

  try {
  } catch (error) {
    console.error(error);
  }
};

init();
