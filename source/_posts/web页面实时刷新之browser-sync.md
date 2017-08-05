---
layout: post
title: web页面实时刷新之browser-sync
date: 2017-07-12 18:07:26
tags:
- web
- browser-sync
- 实时刷新
---
## web开发对实时刷新的需求
在刚开始学习前端时每次修改文件内容后都需要手工刷新下浏览器来看效果，做的次数多了就特别难受，有时仅仅修改了一个字母都需要刷新下页面查看    

之后接触到编写边看的集成IDE，文件修改保存后就可以实时显示效果，用起来还不错，但有个问题就是IDE里面一般都是内嵌的一个浏览器，与常用的浏览器还是有许多区别的    
<!-- more -->

browser sync的功能：
> Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。

最吸引人的莫过于多屏同步，可以在不同浏览器里打开，操作在一个浏览器里的操作同时会映射到另一个浏览器；
在有一个就是多终端同步：同时可以使用手机查看效果且操作和PC端打开的是同步

##  安装 browser sync
browser sync需要nodejs，在自己PC上安装nodejs  nodejs下载地址[nodejs](http://nodejs.cn/download/,'nodejis')
windows用户可以打开命令行，查看nodejs是否安装， node -v    
node官网下载速度比较版，node安装好后使用淘宝镜像安装工具
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
现在可以使用npm来安装了
`cnpm install browser-sync -g`

启动browsersync  
`browser-sync start --server files "path/to/file, path/to/another/file"`
对于使用thinkphp框架的话建议弄个配置文件,假设为 bs-config.js
```
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
var root = "./Application/Home/";
var cssUrl = root + "Public/css/";
var jsUrl =  root + "Public/js/";
var html = root + "View/";
module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 8080
        }
    },
    "files": [
		cssUrl + "class/*.css",
		jsUrl + "class/*.js",
		html + "class/*.html"
	],
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": false,
    "proxy": "localhost",
    "port": 80,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "logLevel": "info",
    "logPrefix": "BS",
    "logConnections": false,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": [],
    "open": "local",
    "browser": "default",
    "cors": false,
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": true,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": [],
    "scrollElementMapping": [],
    "reloadDelay": 0,
    "reloadDebounce": 0,
    "reloadThrottle": 0,
    "plugins": [],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": false,
    "codeSync": true,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};
```
修改下配置文件里的files选项，修改为你自己的css，js文件所在位置
启动是使用如下命令：`browser-sync start --config bs-config.js`

**注：当你修改相应的css，js文件后浏览器里未刷新那可能是配置里有问题，比如监控路径出错等等**
