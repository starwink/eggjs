// app/middleware/robot.js
// options === app.config.city
module.exports = (options, app) => {
    return async function city(ctx, next) {
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
      await next()
    }
  };
  
