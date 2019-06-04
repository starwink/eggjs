//http://eggjs.org/zh-cn/core/cookie-and-session.html
const Controller = require('egg').Controller;

class LogController extends Controller {
    async info() {
      const ctx = this.ctx;
      ctx.logger.info('some request data: %j', ctx.request.body);
      ctx.body='info';
    }

    async debug() {
      const ctx = this.ctx;
      ctx.logger.debug('debug info');
    }

    async warn() {
      const ctx = this.ctx;
      ctx.logger.warn('WARNNING!!!!');
    }
    async error() {
      const ctx = this.ctx;
      ctx.logger.error(new Error('whoops'));
    }
}
  
module.exports = LogController;