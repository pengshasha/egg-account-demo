'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_egg-account';

  // add your config here
  config.middleware = [ 'auth', 'log', 'error' ];
  config.grpc = {
    // endpoint: 'localhost:50051',
    // dir: 'app/proto',
    // property: 'grpc',
    // loadOpts: {
    //   convertFieldsToCamelCase: true,
    // },
    // clientOpts: {},
    // timeout: 5000,
  };
  // exports.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1:27017/account',
  //     // url: 'mongodb://172.19.3.186:26007/hewu',
  //     options: {},
  //   },
  // };
  config.auth = { // token 时效
    tokenExpireTime: 3600 * 24 * 1000, // 1 天
    appTokenExpireTime: 3600 * 24 * 365 * 1000, // 1 年
  };
  config.mongoose = {
    url: 'mongodb://localhost:27017/account',
    // url: 'mongodb://172.19.3.186:26007/hewu',
    options: {},
  };
  // redis配置
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.ajv = {
    keyword: 'schema', // to indicate the namespace and path of schemas, default as 'schema'
    allErrors: true, // required for custom error message
    jsonPointers: true, // required for custom error message
  };
  return config;
};
