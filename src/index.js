import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
  console.log('init');
  const artifactSizeInBytes = parseInt(process.env.ARTIFACT_SIZE_BYTES, 10);
  const artifactSizeInKB = artifactSizeInBytes / 1024;

  console.log(`artifactSizeInBytes: ${artifactSizeInKB} bytes`);
  console.log(`artifactSizeInKB: ${artifactSizeInKB} KB`);
};

init();
