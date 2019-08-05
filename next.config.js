require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass(
  withImages({
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]-[hash:base64:5]',
      url: false // This fixed my problem
    },
    env: {
      API_KEY: process.env.API_KEY
    }
  })
);
