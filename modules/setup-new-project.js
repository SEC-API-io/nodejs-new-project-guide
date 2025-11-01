const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const { log } = console;

const fileConfigIndexjs = `const dotenv = require('dotenv'); // load variables from .env file
dotenv.config({ quiet: true });

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  s3: {
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
  const command = `bash -l -c "nvm use 20 && npm init -y && npm i dotenv && git init"`;
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
