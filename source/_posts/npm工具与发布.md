---
layout: post
title: npm工具与发布
date: 2017-08-23 12:12:05
tags:
---
## npm工具的制作
初始化一个目录，然后在目录里面运行 `npm init` 获取 package.json 文件

在 package.json文件里面添加 bin，author，maintainers字段，
```
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
`npm link ` 会把当前目录下的 package.json 文件里的 bin 字段创建软连接到npm的执行目录下

`npm unlink` 撤销当前目录下通过npm link创建的软连接

可执行文件里面头部包含 
```
#!/usr/bin/env node
```

## npm包的发布
在npmjs.org里注册账号，然后通过npm login添加账号信息，或者通过 npm adduser添加用户

包里面的维护者列表里面需要有当前登录的用户

```
npm publish 发布包
npm unpublish 撤销发布的包  npm unpublish package@version
```