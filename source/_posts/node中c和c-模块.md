---
layout: post
title: node中c和c++模块
date: 2017-08-26 11:19:05
tags:
- node
- node c/c++模块问题
---
<!-- version 1.0.0 -->
## 准备工作
node使用c++插件时需要使用node-gyp包，node-gyp把c++源码编译为二进制文件，js在调用二进制文件，编译后的二进制文件模块调用就和js的模块调用一样。

```
npm install -g node-gyp
```
除了node-gyp还需要安装其他准备工具。
<!-- more -->
**类Unix下的准备工具** 
在类Unix下只需在安装 g++工具
```
sudo apt-get install g++ ;
// or
sudo yum install g++
```
因为在学校里我把apt-get 配置为学校的源，回来后用不了学校的源(貌似只能在校园网的环境下使用)，然后我再修改为其他源时只更改了地址，结果一直安装不上，，，最后的最后才发现我修改的apt源有问题，不仅需要修改地址，还要看下后面 trusty,precise还是其它的

```
// 之前的是：
deb http://**.xidian.edu.cn/ubuntu/ precise main xxxxxxxxxxxxxx

// 修改时只改了地址,安装时就只会出错
deb http://mirrors.163.com/ubuntu/ precise main xxxxxxxxxxxxxxxx

// 正确的是
deb http://mirrors.163.com/ubuntu/ trusty main xxxxxxxxxxxxxxxxx

```

**Windows下准备工具**
在Windows下需要安装python和visualC++ ,python在执行configure命令时调用，vcbuild在编译时使用
python安装2.7版本的

visual C++实在是太大了，所以网上有另外一种解决方式：
```
// 以管理员的身份运行   找到cmd，右键，以管理员身份运行；运行此命令后会安装python2.7 和编译工具
npm install --global --production windows-build-tools 
npm update
```

## 编写C++模块
因为我对C++也不熟悉，所以从官网上拿个例子下来。存为 addon.cpp文件
```
#include <node.h>
namespace demo {
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
void Method(const FunctionCallbackInfo<Value>& args) { // Method方法，使用const FunctionCallbackInfo<Value>& args接受函数参数
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}
void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "hello", Method); // 导出模块的hello属性，hello属性指向 Method方法 类似js里的 {hello: function Method(){}}
}
NODE_MODULE(addon, init) // 注意这里没有分号结尾 导出模块
}
```

## 配置与编译
node-gyp 配置文件
```
{
    'targets': [
        {
            'target_name': 'addon', // 编译后为addon.node文件
            'sources': ['./addon.cc'] // 需要编译的源码
        }
    ]
}
```
node-gyp configure命令会在当前项目下生成项目文件(供编译时使用)，node-gyp build 命令调用编译工具进行编译，最终得到一个node类型文件，该文件在 build/Release下，在这里生成的是addon.node文件

## 引用模块
新建test.js文件
```
let addon = require('./build/Release/addon.node');
console.log(addon.hello()); // 'world'

```
## node-gyp 命令
命令      | 功能
----------|-----------------------------------------------------------
install   | 安装开发文件，针对特定版本的node
list      | 当前安装的工具列表
remove    | 移除node特定版本的开发者文件
clean     | 移除所有用configure和build命令生成的文件
configure | 为当前模块生成编译配置信息等
build     | 编译当前模块
rebuild   | 重新配置编译当前模块 相当于 clean ，configure， build的组合

c++更多示例请看[官网 c/c++插件](http://nodejs.cn/api/addons.html)  或者[百度网盘pdf版本](http://pan.baidu.com/s/1nuKx66t)

文档里提供了函数的参数、回调、对象工厂、函数工厂、包装c++对象、包装对象的工厂、传递包装的对象等列子。
