// app/middleware/robot.js
// options === app.config.city
module.exports = (options, app) => {
    return async function urlMiddleware(ctx, next) {
      let urlData=ctx.request.url.split('?');
      let host=ctx.request.header.host;
      let urlPath,urlParams,urlPathData;
      let configCityData=ctx.app.config.city;
      let agree='https://';

      let url=ctx.request.url
      let gotoUrl='';

      if(url!='/'){
        if(url.indexOf("?")==-1){
            if(url.charAt(url.length-1)!='/'){
                if(url.substring(url.length-5)!='.html'){
                    gotoUrl=agree+host+url+'/';
                }
            }
        }else{
          let urlData=url.split('?');
          if(urlData[0].charAt(urlData[0].length-1)!='/'){
            if(urlData[0].substring(urlData[0].length-5)!='.html'){
                gotoUrl=agree+host+urlData[0]+'?'+urlData[1];
            }
          }
        }
      }
      if(gotoUrl!=''){
        ctx.status=301;
        ctx.set('Location', gotoUrl);
      }
      
      await next()
        // ctx.status = 200;
        //  ctx.body ='gogo';

          //获取get参数 
          // ctx.body =ctx.query; 

          //获取router中的变量
          //ctx.body =options;

          

        //ctx.body =ctx.params;//这个拿不到
       // ctx.status = 200;

        //全局中可用
      //  ctx.body = options.id+'--'+app.config.env; 
      
        //路由中可用
        // ctx.body = options.id+'=13=';
     
    }
  };
  
