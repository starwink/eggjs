//http://eggjs.org/zh-cn/core/cookie-and-session.html
const Controller = require('egg').Controller;

class CacheController extends Controller {
    async add() {
      const ctx = this.ctx;
      let count = ctx.cookies.get('count');
      count = count ? Number(count) : 0;
      ctx.cookies.set('count', ++count,{maxAge:10*1000});
      ctx.body = count;
    }

    async remove() {
      const ctx = this.ctx;
      ctx.cookies.set('count', null);
      ctx.status = 204;
    }

    async cookie(){
        const ctx = this.ctx;
        let count = ctx.cookies.get('signed_cookie',{signed:true,encrypt:true});
        console.log(count);
        count = count ? Number(count) : 0;
        count++;
        count=count.toString();
        ctx.cookies.set('signed_cookie', count,{maxAge:10*1000,httpOnly:true,encrypt:true});
        ctx.body = count;
    }

    //赋值有问题
    async cSessionAdd(){
      const ctx = this.ctx;
      // 修改 Session 的值
      // let id = ctx.session.visited>0? ctx.session.visited++ : 1;

      if(ctx.session.visited){
        ctx.session.visited=ctx.session.visited+1;
      }else{
        ctx.session.visited=1
      }
      // ctx.session.visited=id;
      ctx.body = {
        success: true,
        visitedid:ctx.session.visited
      };
    }

    async cRedis() {
      const { ctx, app } = this;
      // set
      await app.redis.set('foo', 'bar');
      // get
      ctx.body = await app.redis.get('foo');
    }

    async cRedisDemo(){
      const { app } = this;
      await app.redis.set('foo', 'bar',function(ret){
      });
      await app.redis.expire('foo',40);
      await app.redis.get('foo');
      await app.redis.del('foo');
    }

    async cSessionRemove(){
      const ctx = this.ctx;
      ctx.session.visited=null;
      ctx.body ='ok';
    }



    
}
  
module.exports = CacheController;