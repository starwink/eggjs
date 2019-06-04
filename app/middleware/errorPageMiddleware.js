// 自定义异常处理中间件
module.exports = (options, app) => {

  return async function errorPageMiddleware(ctx, next) {
    await next();
    const pageData = {};
    let gotoUrl;
    pageData.data={
      status:ctx.status,
      body:ctx.body,
    }
    if(ctx.isMobile){
      gotoUrl='https://m.ishangzu.com';
    }else{
      gotoUrl='https://www.ishangzu.com';
    } 
   
    if(ctx.status!=200  && !ctx.body){
        ctx.status=301;
        ctx.set('Location', gotoUrl);
    }else if(ctx.status!=200  && ctx.body ){
      // app.getLogger('errorLogger').set('remote',
      // ctx.logger.info('启动耗8时 %d ms', Date.now());
      // ctx.logger.error('gggt');
      // ctx.logger.debug('ss');

      // ctx.coreLogger.info('info');
      // app.getLogger('josnLogger').info('44444')
      // ctx.getLogger('josnLogger').info('333')
      if(ctx.acceptJSON){
        // ctx.body='{code:'+ctx.status+',msg:"'+JSON.stringify(pageData.data.body)+'"}';
        ctx.body='{code:'+ctx.status+',msg:"服务器异常,请稍后再试"}';
      }else{
        // ctx.body='<!DOCTYPE html><html><head><title>'+pageData.data.status+'</title></head><body><h3>'+pageData.data.body+'</h3></body></html>';
        ctx.body='<!DOCTYPEhtml><html><head><title></title><metacharset="utf-8"><metaname="renderer"content="webkit"><metahttp-equiv="X-UA-Compatible"content="IE=edge,chrome=1"><metaname="viewport"content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><metaname="keywords"content=""><metaname="description"content=""><linkrel="stylesheet"href="//statics.ishangzu.com/isz/3.1/mobile/v3/css/isz.min.css?v=20180611006"><linkrel="stylesheet"href="//statics.ishangzu.com/isz/3.1/mobile/v3/css/common.min.css?v=20180611006"></head><body><ahref="#top"target="_self"class="scroll-top-content"><iclass="ion-arrow-up-b"></i><span>TOP</span></a><divclass="lose-content"><h2>404</h2><p>对不起，'+pageData.data.body+'<span>&nbsp;&nbsp;三秒倒计时返回首页<i>&nbsp;3</i></span></p></div><divclass="lose-bottom"><ahref="http://m.ishangzu.com">回到首页</a><ahref="http://m.ishangzu.com/4/">刷新</a></div><scriptsrc="//statics.ishangzu.com/isz/3.1/mobile/v3/js/common.min.js?v=20180611006"></script><scriptsrc="//statics.ishangzu.com/isz/3.1/mobile/v3/js/errors.min.js?v=20180611006"></script><script>var_hmt=_hmt||[];</script><scriptsrc="//ares.ishangzu.com/ares.js?m5yrm7bu3xdc71qf,f975adad-07f0-43ca-b9ef-c26b922f3b96"></script><script>(function(){varhm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?2d1fb77e9aeb419bd6ce2ed0ad9592af";vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script><script>(function(){varhm=document.createElement("script");hm.src="//hm.baidu.com/hm.js?322b01787e83a3202d487d2e3dcc9152";vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script><script>(function(){varbp=document.createElement("script");varcurProtocol=window.location.protocol.split(":")[0];if(curProtocol==="https"){bp.src="https://zz.bdstatic.com/linksubmit/push.js";}else{bp.src="http://push.zhanzhang.baidu.com/push.js";}vars=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s);})();</script></body></html>';
      }
    }else if(!ctx.body){

    }
    
  };

};
  
