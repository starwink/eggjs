module.exports = app => {
    app.router.get('/json/:id',app.controller.json.jsonController.getJson);
    app.router.post('/json/:id',app.controller.json.jsonController.getJson);
    app.router.get('/status/:id',app.controller.json.jsonController.getStatus);

  //  app.router.redirect('/:city/download', app.controller.m.DownloadController.index);
};