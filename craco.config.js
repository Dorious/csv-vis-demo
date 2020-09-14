const CracoLessPlugin = require('craco-less');
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    // { plugin: BabelRcPlugin },
  ],
};