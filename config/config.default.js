/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1643964007510_2888';

  // add your middleware config here
  config.middleware = [
    'errorHandler'
  ];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    clients: {
      //做sharding kuser 数据库
      egg_approval:{
        // url: 'mongodb://kuser_350:kuser_350#KM9BhV@cdwp-shardstage01.chinacloudapp.cn:27001/kuser_350',
        url: 'mongodb://localhost:27017/egg-approval',
        options: {
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      }
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
