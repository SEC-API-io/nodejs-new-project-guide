const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const { log } = console;

const fileConfigIndexjs = `const dotenv = require('dotenv'); // load variables from .env file
dotenv.config({ quiet: true });
// turn off AWS SDK maintenance mode message
// require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const TIMEZONE = 'America/New_York'; 
const NODE_ENV = process.env.NODE_ENV || 'development';

process.env.TZ = TIMEZONE; // force nodejs to use specific timezone
const isProduction = NODE_ENV === 'production';

module.exports = {
  app: {
    timezone: TIMEZONE,
    nodeEnv: NODE_ENV,
    isProduction,
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};`;

const fileGitignore = `.env
node_modules
output
.DS_Store`;

const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
};

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const initNodeProject = async () => {
  const command = `bash -c 'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 20 && npm init -y && npm i dotenv@16 && git init'`;
  await new Promise((res, rej) =>
    exec(command, (err, stdout) => (err ? rej(err) : res(stdout)))
  );
};

const createFiles = () => {
  createFile('.nvmrc', '20');
  createFile('.env', '');
  createFile('.gitignore', fileGitignore);
  createFile('README.md', '');
  createFile('config/index.js', fileConfigIndexjs);

  createDir('modules');
};

const setupNewProject = async () => {
  await initNodeProject();
  createFiles();
  log(`✅ Project setup complete`);
};

setupNewProject();
