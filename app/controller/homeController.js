'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {

  async index() {
  const ctx = this.ctx;
    let staticsUrl=function(url){
      ctx.staicsUrl=url;
      return ctx.staicsUrl;
    }

    const newsList = await ctx.service.seoSqlService.list();

    return ;
    const dataList = {
      list: [
          { id: 1, title: 'this is news 1', url: '/news/1' },
          { id: 2, title: 'this is news 23', url: '/news/2' }
      ],
      data:{name:'egg',url:'/sdf/s.css'},
      staticsUrl:staticsUrl,
    };

   
    
    
    //let a=await app.redis.del('foo');
   // console.log(a)
    // ctx.body=this;
    
    let params={premNameOrAddress:"海"};
    const data = await ctx.service.houseListService.list(params);
    if(data.status==200){
      ctx.body = data.data;
    }else{
      await this.ctx.render('v1/error.html', {'code':data.status,'msg':'服务器异常'});
      return ;
    }
    
    await this.ctx.render('test.html', dataList);
  }
}

module.exports = HomeController;
