---
layout: post
title: nodejs事件模块
date: 2017-11-07 19:35:29
tags:
- nodejs
- event
- 事件

categories:
- web
- nodejs
---

nodejs里所有事件类型基本都是由events模块开提供, js是异步执行的,在很多情况下需要同步执行, 这时可以使用events模块来实现同步

event模块主要是EventEmitter类, 使用event.EventEmitter类来实例化一个事件对象

'''
let event = require('events');  // 引入events模块
let emiter = new event.EventEmitter();  // 实例化一个events对象

'''

## 注册监听事件
接着使用事件对象的addListener, on ,once 方法添加事件监听函数.

'''
emiter.addListener('eventNme',res => {
    console.log('我是eventName事件,通过addListener方法添加的函数');
});

emiter.on('eventNme',res => {
    console.log('我是eventName事件,通过on方法添加的函数');
});

emiter.once('eventNme',res => {
    console.log('我是eventName事件,通过once方法添加的函数');
}); 
 // once方法是只会被触发一次,即第一次调用 emiter.emit('eventName')时会被触发,之后就不在被触发,而前两种不受影响


'''
对同一事件对象的同一事件名注册的监听函数默认不能超过十个,可以调用事件对象的setMaxListener(n) 来修改此限制,其中n为正整数.'emiter.setMaxListener(10)'

## 触发事件
触发事件比较简单一点,调用事件对象的emit方法就可以
'''
emiter.emit('eventName'[,arg1][,arg2]....) //第一个参数为发射的事件名,后面的参数是传递给监听函数的参数
'''

## 移除事件的监听函数
移除事件监听函数共有个方法, 事件实例的 removeListener和removeAllListener
'''
let event = require('events');
let emiter = new event.EventEmitter();

let eventtimes = 0;
function listen(){
    console.log('第%d 次触发监听函数',++eventtimes)
}
emiter.on('eventName',listen); // 添加监听函数

emiter.emit('eventName') // 发射事件

emiter.removeListener('eventName',listen) // 移除监听函数,当监听函数是匿名函数或箭头函数则不能再次移除(因为无法得到函数的地址)

emiter.emit('eventName') ;// 再次发射事件,什么也不会做,因为添加的一个监听函数已被移除

// emiter.removeAlllistener('eventName') ;// 移除eventName事件的所有监听函数

'''