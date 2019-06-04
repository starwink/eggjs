// 城市跳转规则
module.exports = (options, app) => {
    return async function cityMiddleware(ctx, next) {
      let urlData=ctx.request.url.split('?');
      let host=ctx.request.header.host;
      let urlPath,urlParams,urlPathData;
      let configCityData=ctx.app.config.city;
      let agree='https://';

      if(typeof(urlData[0])!="undefined"){
        urlPath=urlData[0];
      }else{
        urlPath='';
      }

      if(typeof(urlData[1])!="undefined"){
        urlParams=urlData[1];
      }else{
        urlParams='';
      }
      urlPathData=urlPath.split('/');

      if(ctx.isMobile){
        //如果没有城市参数默认跳转到杭州
        if(host.indexOf('ishangzu.com')>0){
            if(! urlPathData[1] in configCityData){
                let gotoUrl;
                if(urlParams==''){
                    gotoUrl=agree+host+'/hz'+urlData[0];
                }else{
                    gotoUrl=agree+host+'/hz'+urlData[0]+'?'+urlData[1];
                }
                ctx.status=301;
                ctx.set('Location', gotoUrl);
            }
        }
      }else if(host.indexOf('ishangzu.com')>0){
        //pc链接带城市信息跳转
        urlPathData=urlPath.split('/');
        if( urlPathData[1] in configCityData){
          let gotoUrl;
          if(urlParams==''){
            gotoUrl=agree+host+urlData[0];
          }else{
            gotoUrl=agree+host+'/hz'+urlData[0]+'?'+urlData[1];
          }
          gotoUrl=gotoUrl.replace('/'+urlPathData[1]+'/', "/")
          ctx.status=301;
          ctx.set('Location', gotoUrl);
        }
      }
        
   
      await next()
    }
  };
  
