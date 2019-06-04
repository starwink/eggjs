'use strict';
//文档地址 http://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3
// app/controller/news.js
const Controller = require('egg').Controller;
const FormStream = require('formstream');
const QRCode = require('qrcode')

// const url ='https://www.baidu.com';
const url ='https://registry.npm.taobao.org/egg/latest';

class demoController extends Controller {
    async one(){
      
        const ctx=this.ctx;
        let tshi=123009;
    
        let qrcode= await QRCode.toDataURL('I am a pony!').then((url)=>{
            return url;

        })

        this.ctx.body='<img src="'+qrcode+'">';

      
        // let seoLinks=await ctx.service.cms.seoLinksService.list(330100,'BLOG');
        
        // console.log(Object.getOwnPropertyNames(_demo.prototype));
        // _demo.printf;
        
      
        let redisData=await this.app.redis.get('node_blog_list_'+cityData.code);
        // let pcBlogListRigth,pcBlogTopArticleListTmp,hotLabel,hotWords;
       
        //  //资源位
        //  pcBlogListRigth=await ctx.service.cms.advertisingImgService.pcBlogListRigth(cityData.code);
        //  pcBlogTopArticleListTmp=await ctx.service.cms.advertisingImgService.pcBlogTopArticleList(cityData.code);
        //  //热门标签
        //  hotLabel=await ctx.service.cms.hotLabelService.get(cityData.code);
        //  //搜索默认词
        //  hotWords=await ctx.service.cms.hotWordsService.insidePageSearch(cityData.tel_code);
        //  hotWords=hotWords.inside_page;

        const [ pcBlogListRigth,pcBlogTopArticleListTmp,hotLabel,hotWords ]=await Promise.all([
            ctx.service.cms.advertisingImgService.pcBlogListRigth(cityData.code),
            ctx.service.cms.advertisingImgService.pcBlogTopArticleList(cityData.code),
            ctx.service.cms.hotLabelService.get(cityData.code),
            ctx.service.cms.hotWordsService.insidePageSearch(cityData.tel_code).then((ret)=>{
                return ret.inside_page
            })
        ])
        // console.log(pcBlogListRigth,pcBlogTopArticleListTmp,hotLabel,hotWords)
        // console.log(pcBlogTopArticleListTmp)
        await ctx.render('error.1.html', {code:400,msg:'12321'});
        return ;
        this.ctx.body=123;
        // const cache = this.ctx.app.cache.store('redis');
        // await cache.set('foo', '11bb',211);
        // console.log(await store.get('foo')); // 'bar'
        // this.ctx.body=123;
    }

    async get() {

        const ctx = this.ctx;

     
        // 示例：请求一个 npm 模块信息
        let url ='https://registry.npm.taobao.org/egg/latest';
        
        const result = await ctx.curl(url, {
        // 自动解析 JSON response
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
        
        });

        ctx.body = {
            status: result.status,
            headers: result.headers,
            package: result.data,
        };
       
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

module.exports = demoController;