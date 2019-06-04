## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
    #所有资源编译
    gulp prod
    gulp dev
    gulp watch
    #css 编译
    gulp sass:prod
    gulp sass:dev
    gulp sass:watch
    #html编译
    gulp pug:prod
    gulp pug:dev
    gulp pug:watch
    #js 编译
    gulp js:prod
    gulp js:dev
    gulp js:watch
```

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

```bash 
browser-sync start --proxy "127.0.0.1:7001" --files "app/public/isz/4.0/css/*.css,app/public/isz/4.0/js/*.js,app/view/**/*.html"
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
