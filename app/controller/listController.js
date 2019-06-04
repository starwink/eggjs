'use strict';

const Controller = require('egg').Controller;
class listController extends Controller {

  async index() {
    const ctx = this.ctx;
    let staticsUrl=function(url){
      ctx.staicsUrl=url;
      return ctx.staicsUrl;
    }

    const dataList = {
      staticsUrl:staticsUrl,
      data:{
        name:'test'
      },
      page:{
        title:'房源列表',
        keywords:'keywords',
        description:'description',
      }

    };
    let params={premNameOrAddress:"海"};
    const listData = await ctx.service.houseListService.list(params);
    if(listData.status==200){
      dataList.data=listData.data.obj;
     // ctx.body = data.data;
    }else{
      await this.ctx.render('error.html', {'code':data.status,'msg':'服务器异常'});
      return ;
    }
   // console.log( dataList.data);
  //  dataList.data.forEach((list,index)=>{
  //   console.log(list);
  //  })
    
//this.ctx.body=staticsUrl('web/v1/css/common.min.css');
    await this.ctx.render('list/index.html', dataList);
  }
}

module.exports = listController;
