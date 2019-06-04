# node.ishangzu.com

h test

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
ps -eo "pid,command" | grep "\-\-title=egg" |  awk '{print $1}'

./node_modules/.bin/egg-scripts stop  --title=egg1;
EGG_SERVER_ENV=prod ./node_modules/.bin/egg-scripts start --port=7777 --daemon --title=egg1;

./node_modules/.bin/egg-scripts stop  --title=egg2;
EGG_SERVER_ENV=prod ./node_modules/.bin/egg-scripts start --port=7778 --daemon --title=egg2;



```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org
