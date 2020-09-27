'use strict';
const path = require('path');
const redisStore = require('cache-manager-ioredis');

module.exports = appInfo => {
    const config = exports = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1559613574522_4959';

    // add your config here
    config.middleware = [];

  // 添加 view 配置
  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  exports.io = {
    init: { wsEngine: 'uws' }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  exports.onerror ={
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      // ctx.body = 'say error';
      ctx.body='<!DOCTYPEhtml><html><head><title></title><metacharset="utf-8"><metaname="renderer"content="webkit"><metahttp-equiv="X-UA-Compatible"content="IE=edge,chrome=1"><metaname="viewport"content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><metaname="keywords"content=""><metaname="description"content=""><linkrel="stylesheet"href="//statics.ishangzu.com/isz/3.1/mobile/v3/css/isz.min.css?v=20180611006"><linkrel="stylesheet"href="//statics.ishangzu.com/isz/3.1/mobile/v3/css/common.min.css?v=20180611006"></head><body><ahref="#top"target="_self"class="scroll-top-content"><iclass="ion-arrow-up-b"></i><span>TOP</span></a><divclass="lose-content"><h2>404</h2><p>对不起，程序出错了<span>&nbsp;&nbsp;三秒倒计时返回首页<i>&nbsp;3</i></span></p></div><divclass="lose-bottom"><ahref="http://m.ishangzu.com">回到首页</a><ahref="http://m.ishangzu.com/4/">刷新</a></div><scriptsrc="//statics.ishangzu.com/isz/3.1/mobile/v3/js/common.min.js?v=20180611006"></script><scriptsrc="//statics.ishangzu.com/isz/3.1/mobile/v3/js/errors.min.js?v=20180611006"></script><script>var_hmt=_hmt||[];</script><scriptsrc="//ares.ishangzu.com/ares.js?m5yrm7bu3xdc71qf,f975adad-07f0-43ca-b9ef-c26b922f3b96"></script><script>(function(){varhm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?2d1fb77e9aeb419bd6ce2ed0ad9592af";vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script><script>(function(){varhm=document.createElement("script");hm.src="//hm.baidu.com/hm.js?322b01787e83a3202d487d2e3dcc9152";vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script><script>(function(){varbp=document.createElement("script");varcurProtocol=window.location.protocol.split(":")[0];if(curProtocol==="https"){bp.src="https://zz.bdstatic.com/linksubmit/push.js";}else{bp.src="http://push.zhanzhang.baidu.com/push.js";}vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s);})();</script></body></html>';
      
      ctx.status = 500;
    },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }

  

    exports.security = {
        xframe: {
            value: 'ALLOW-FROM:https://baidu.com',
        },
        csrf: {
            // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
            ignore: ctx => {
            //   if(ctx.request.url=='/post'){
            //     return true;
            //   }
            //   return false; 
            return true;
            },
          }
    };
  
  exports.development = {
    watchDirs: [],
    ignoreDirs: [],
    fastReady: false,
    reloadOnDebug: true,
    overrideDefault: false,
    reloadPattern: undefined,
    //不要在ts fileChanged时重新加载
    // https://github.com/sindresorhus/multimatch 
    // reloadPattern: ['**', '!**/*.tpl'],
  };
  //新增全局用中间件
  exports.middleware = [
    'robot',
    'errorPageMiddleware',
    //'cityMiddleware'
  ];


  // robot's configurations
  exports.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };
 
  
  exports.logger = {
    dir: 'logs/node.ishangzu.com',
    // appLogName: `${appInfo.name}-web.log`,
    // coreLogName: 'egg-web.log',
    // agentLogName: 'egg-agent.log',
    // errorLogName: 'common-error.log'
  };

  exports.customLogger={
        josnLogger: {
          file: path.join(appInfo.root, `logs/${appInfo.name}/404.log`),
        },
  }
  
  // exports.logrotator={
  //   filesRotateByHour: [
  //     path.join(appInfo.root, 'logs', appInfo.name, '404.log'),
  //   ]
  // }

  //egg-redis

  exports.java_webserver={
    isz:'http://isz.ishangzu.com',
    app:'http://app.ishangzu.com',
    cms:'http://app-cms.ishangzu.com',
    demo:'http://192.168.0.239:8081',
    timeout:3000,
  }
  exports.statics_params={
    num:20190604,
    host:'https://statics.ishangzu.com/isz/4.0',
    //host:'http://127.0.0.1:7001/public/',
  }
  return config;
};

