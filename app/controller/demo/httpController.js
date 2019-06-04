'use strict';
//文档地址 http://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3
// app/controller/news.js
const Controller = require('egg').Controller;
const FormStream = require('formstream');


// const url ='https://www.baidu.com';
const url ='https://registry.npm.taobao.org/egg/latest';

class HttpController extends Controller {
    async index(){
        const ctx = this.ctx;
        const host=this.ctx.header.host;
        //302重定向
        ctx.redirect(`http://${host}/demo/http/get`);
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
    async post(){
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/post', {
          // 必须指定 method
          method: 'POST',
          // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
          contentType: 'json',
          data: {
            hello: 'world',
            now: Date.now(),
          },
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType: 'json',
        });
        ctx.body = result.data;
    }

    async json(){
        const ctx = this.ctx;
        const result = await ctx.curl('http://isz.ishangzu.com/isz_customer/LineCustomerController/saveOnlineApp.action', {
          // 必须指定 method
          method: 'POST',
          contentType:'application/json',
          // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
          contentType: 'json',
          data: {
            city_code: '330100',
            rent_area_code: "330110",
          },
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType: 'json',
        });
        ctx.body = {
            status: result.status,
            headers: result.headers,
            package: result.data,
        }
    }

    //上传接口有问题,之后再调
    async file(){
        let __filename='app/public/house.jpg';
        const ctx = this.ctx;
        const form = new FormStream();
        // 设置普通的 key value
        form.field('foo', 'bar');
        // 上传当前文件本身用于测试
        form.file('file', __filename);

        const result = await ctx.curl('http://isz.ishangzu.com/cms_wechat/UploadAttachmentController/uploadAttachment.action', {
        // 必须指定 method，支持 POST，PUT
        method: 'POST',
        // 生成符合 multipart/form-data 要求的请求 headers
        headers: form.headers(),
        // 以 stream 模式提交
        stream: form,
        // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        dataType: 'json',
        });
        // 响应最终会是类似以下的结果：
        // {
        //   "file": "'use strict';\n\nconst For...."
        // }
        ctx.body = {
            status: result.status,
            headers: result.headers,
            package: result.data,
        }
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

module.exports = HttpController;