'use strict';
const path = require('path');
// had enabled by egg
// exports.static = true;

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.cache = {
    enable: true,
    package: 'egg-cache',
};

//声明调用  ctx.body=ctx.test;
exports.isz_base = {
    enable: true,
    path:path.join(__dirname, '../lib/plugin/isz_base'),
};



  