const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports.md5 = (string) => {
  return crypto.createHash('md5').update(string).digest('hex');
};

module.exports.sha256 = (string) => {
  return crypto.createHash('sha256').update(string).digest('hex');
};

module.exports.wait = async (milliseconds = 0) => {
  return new Promise((res) => setTimeout(res, milliseconds));
};

module.exports.compressData = async (data) => {
  return new Promise((res, rej) =>
    zlib.gzip(data, (err, compressedData) =>
      err ? rej(err) : res(compressedData)
    )
  );
};

module.exports.decompressData = async (data) => {
  return new Promise((resolve, reject) =>
    zlib.gunzip(data, (err, data) =>
      err ? reject(err) : resolve(data.toString())
    )
  );
};

module.exports.toFile = (filePath, content) => {
  const _filePath = filePath.includes('/output/')
    ? filePath
    : `./output/${filePath}`;

  const dir = path.dirname(_filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (typeof content === 'string') {
    fs.writeFileSync(_filePath, content, 'utf-8');
  }

  if (typeof content === 'object') {
    fs.writeFileSync(_filePath, JSON.stringify(content, null, 2), 'utf-8');
  }
};

module.exports.confirm = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve) => {
    rl.question('\n' + question + ' (yes|no) ', (response) => {
      rl.close();
      resolve(response.toLowerCase().trim() === 'yes');
    });
  });

  if (!answer) {
    console.log('Operation aborted by the user.');
    process.exit(0);
  }
};
