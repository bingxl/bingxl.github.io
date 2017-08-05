---
layout: post
title: axios
date: 2017-07-23 17:42:09
tags:
- 前端
- js
- axios
---

# 特点/功能
+ make XMLHttpRequests from browser  在浏览器环境里发送AJAX请求
+ make http requests from nodejs   在nodejs里发送http请求
+ supports the promise API 支持 promise(es6语法)
+ intercept request and response 拦截请求和响应
+ transform request and response data 转换请求和响应数据
+ cancel requests   取消请求
+ automatic transforms for JSON data    自动转换JSON数据
+ client side support for protecting against xsrf   客户端支持防止 CSRF/XSRF
<!-- more -->
# 安装
```
npm install axios --save-dev
or
bower install axios
```

# exmple
```
let config = {
    methods: 'post',//get,post,put,delete,patch
    url: '',
    data: {}
}
axios(consifg).then(res => {
    console.log(res);
})

axios.get(url[,config]).then(res => {
    console.log(res);
})

axios.post(url[,data[,config]]).then(res => {})

// 并发请求
function get1(){
    return axios.get(url);
}

function get2(){
    return axios.get(url);
}

axios.all([get1(), get2()]).then(axios.spread(
    (g1, g2) => {
        console.log(g1, g2);
    }
))


```

# 请求配置

