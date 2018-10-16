'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_egg-account';

  // add your config here
  config.middleware = [];
  config.grpc = {
    endpoint: 'localhost:50051',
    // dir: 'app/proto',
    // property: 'grpc',
    // loadOpts: {
    //   convertFieldsToCamelCase: true,
    // },
    // clientOpts: {},
    // timeout: 5000,
  };

  return config;
};
