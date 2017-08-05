---
layout: post
title: node工具
date: 2017-08-05 13:11:44
tags:
---
使用node编写一些小工具，所有命令行里面可以执行的命令都可以在node里面集成

<!--more  -->
# 接收命令行参数
var argv = process.argv;        
argv是数组类型，第一个是node程序，第二个是文件名，后面的就是命令行里面输入的参数了，argv.splice(2)得到纯参数数组

# 执行命令行
```
var exec = require('child_process').exec;
exec(commandStr, callback(err, stdout, stderr));
// err 是否出错， stdout标准输出， stderr输出错误信息
```

# 事件监听与发射
```
var EventEmitter = retuire('events').EventEmitter
var event = new EventEmitter();
event.on('some-event',function(){

});
event.emitter('some-event');
// 事件是异步的，如果事件之间有前后关系需要使用事件队列，在上一个事件回掉后在发射，或者寻找同步事件
```