'use strict';
const Controller = require('egg').Controller;

class MiddlewareController extends Controller {
    async index(){
        const ctx = this.ctx;
       
        ctx.body=ctx.params;
    }
    async mobile(){
        const ctx = this.ctx;
        ctx.body=ctx.app.config.city.hz;
       
    }
}

module.exports = MiddlewareController;