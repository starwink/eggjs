module.exports = app => {
    app.beforeStart(async () => {
        //程序初始化
        // const ctx = app.createAnonymousContext();
        // app.iszTownAndCircle = await ctx.service.getCityTownAndCircleService.getTownAndCircle();

        //程序初始化运行定时任务
        //await app.runSchedule('subtask');
    });

    app.messenger.on('refresh', by => {
        app.logger.info('start update by %s', by);
        // create an anonymous context to access service
        // const ctx = app.createAnonymousContext();
        // ctx.runInBackground(async () => {
        //   await ctx.service.source.update();
        //   app.lastUpdateBy = by;
        // });
    });
   
   
};