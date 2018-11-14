'use strict';

// had enabled by egg
// exports.static = true;
// exports.grpc = {
//   enable: true,
//   package: 'egg-grpc',
// };

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.ajv = {
  enable: true,
  package: 'egg-ajv',
};
