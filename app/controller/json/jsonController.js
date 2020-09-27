'use strict';
//文档地址 http://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3
// app/controller/news.js
const Controller = require('egg').Controller;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class JsonController extends Controller {
    async index(){
        const ctx = this.ctx;
        const host=this.ctx.header.host;
        //302重定向
        ctx.redirect(`http://${host}/demo/http/get`);
    }

    async getJson() {

        const ctx = this.ctx;
        console.log('query',ctx.query)
        console.log('params',ctx.params)
        // await delay(5000)
        console.log(ctx.params.id);
        console.log(ctx.query);
        ctx.set('Content-Type','application/json');
        ctx.set('Access-Control-Allow-Origin','*');
        ctx.status=401;
        ctx.body={code:1,obj:{id:1,list:['a001','b002']}};
       
    }
    async getStatus() {

        const ctx = this.ctx;
        console.log(ctx.params.id);
        console.log(ctx.query);
        ctx.status=520
        ctx.set('Content-Type','application/json');
        ctx.body={code:0,obj:{id:1,list:['a001','b002']}};
       
    }

}

//通过service模块获取数据
/* class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        await ctx.render('news/list.tpl', { list: newsList });
    }
} */

module.exports = JsonController;