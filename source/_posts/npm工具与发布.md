---
layout: post
title: npm工具与发布
date: 2017-08-23 12:12:05
tags:
  - node
  - npm
  - node命令行
  - npm包发布
---

## npm 工具的制作

初始化一个目录，然后在目录里面运行 `npm init` 获取 package.json 文件

在 package.json 文件里面添加 bin，author，maintainers 字段，

```json
  "bin": {
    "hello": "hello" // npm会创建软连接到npm执行目录下，软连接名为hello ，执行的文件为当前目录下的hello文件，可更改
  },
  "version": "1.0.1", // 通过npm version major | minor | patch | premajor | preminor | prepatch | prerelease | from-git 更新版本号
  "maintainers": [  // 包维护者列表，通过此字段值来进行权限认证
    {
      "name": "bingxl",
      "email": "2282152858@qq.com"
    }
  ],
  "author": "bingxl",

```

<!-- more -->

`npm link ` 会把当前目录下的 package.json 文件里的 bin 字段创建软连接到 npm 的执行目录下

`npm unlink` 撤销当前目录下通过 npm link 创建的软连接

可执行文件里面头部包含

```
#!/usr/bin/env node
```

### 接收命令行参数

var argv = process.argv;  
argv 是数组类型，第一个是 node 程序，第二个是文件名，后面的就是命令行里面输入的参数了，argv.splice(2)得到纯参数数组

### 执行命令行

```javascript
var exec = require("child_process").exec;
exec(commandStr, callback(err, stdout, stderr));
// err 是否出错， stdout标准输出， stderr输出错误信息
```

### 事件监听与发射

```javascript
var EventEmitter = retuire("events").EventEmitter;
var event = new EventEmitter();
event.on("some-event", function () {});
event.emitter("some-event");
// 事件是异步的，如果事件之间有前后关系需要使用事件队列，在上一个事件回掉后在发射，或者寻找同步事件
```

## npm 包的发布

在 npmjs.org 里注册账号，然后通过 npm login 添加账号信息，或者通过 npm adduser 添加用户

包里面的维护者列表里面需要有当前登录的用户

```
npm publish 发布包
npm unpublish 撤销发布的包  npm unpublish package@version
```
