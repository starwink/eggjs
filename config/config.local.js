'use strict';

module.exports = appInfo => {
    const config = exports = {};
    config.redis = {
        client: {
            port: 6379,         
            host: '127.0.0.1',   
            password: 'redispassword',
            db: 5,
        },
    }
    return config;
};

