require('dotenv').config(); // load variables from .env file

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  exampleService: {
    apiKey: process.env.EXAMPLE_API_KEY,
  },
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
