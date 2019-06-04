module.exports = app => {
   // app.router.redirect('/demo', '/demo/http/get', 301);
    app.router.redirect('/demo/test', app.controller.demo.testController.index);


    app.router.get('/demo/baidu', app.controller.demo.testController.baidu);

    app.router.get('/demo/log/', app.controller.demo.httpController.index);
    app.router.get('/demo/http/get', app.controller.demo.httpController.get);
    app.router.get('/demo/http/post', app.controller.demo.httpController.post);
    app.router.get('/demo/http/json', app.controller.demo.httpController.json);
    app.router.get('/demo/http/file', app.controller.demo.httpController.file);

    app.router.get('/demo/cache/cookie/add', app.controller.demo.cacheController.add);
    app.router.get('/demo/cache/cookie/safe', app.controller.demo.cacheController.cookie);
    app.router.get('/demo/cache/cookie/remove', app.controller.demo.cacheController.remove);
    app.router.get('/demo/cache/session/add',app.controller.demo.cacheController.cSessionAdd);
    app.router.get('/demo/cache/session/remove',app.controller.demo.cacheController.cSessionRemove);

    app.router.get('/demo/middleware/index/:id',app.middleware.city({id:444}),app.controller.demo.middlewareController.index);
    app.router.get('/demo/middleware/mobile',app.controller.demo.middlewareController.mobile);

    app.router.get('/demo/log/debug',app.controller.demo.logController.debug);
    app.router.get('/demo/log/warn',app.controller.demo.logController.warn);
    app.router.get('/demo/log/info',app.controller.demo.logController.info);
    app.router.get('/demo/log/error',app.controller.demo.logController.error);

    app.router.get('/demo/db/select',app.controller.demo.dbController.select);
    app.router.get('/demo/db/insert',app.controller.demo.dbController.insert);
    app.router.get('/demo/db/update',app.controller.demo.dbController.update);
    app.router.get('/demo/db/delete',app.controller.demo.dbController.delete);
    app.router.get('/demo/db/house',app.controller.demo.dbController.getHouse);
    app.router.get('/demo/db/updatedata',app.controller.demo.dbController.updateData);
    app.router.get('/demo/db/push',app.controller.demo.dbController.push);
    app.router.get('/demo/db/pushAll',app.controller.demo.dbController.pushAll);

    app.router.get('/demo/test/one',app.controller.demo.demoController.one);


};