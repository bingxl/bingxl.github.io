---
layout: post
title: fetch
date: 2018-10-18 18:34:03
tags:
  - js
  - fetch
---

# fetch 概览

> 本文翻译自 devdocs 文档中的 [Fetch API: Using Fetch](https://devdocs.io/dom/fetch_api/using_fetch) 一节

`Fetch API` 提供了访问和操作部分 HTTP 管道的 js 接口, 比如 request(请求)和 response(响应). 同时也提供了一个使用异步方法简便获取网络资源的全局函数 `fetch()`.

<!-- more -->

之前实现的 `XMLHttpRequest` (Ajax) 具有相同的功能. `fetch` 更容易用在类似`Service Workers` 的其它技术里面.

简单的列子

```javascript
fetch("url")
  .then((res) => {
    // http 状态码错误, 比如是 404, 500 等时 res.ok 为 false
    if (res.ok) {
      return res.json(); // 返回的是一个 promise
    }
  })
  .then((json) => {
    // 从后台获取到的json数据
    console.log(json);
  })
  .catch((err) => {
    // http 状态码错误并不会触发, 触发 catch 的条件是网络请求失败或者有阻止请求完成的事件发生.
    console.log("发生了一些错误", err);
  });
```
