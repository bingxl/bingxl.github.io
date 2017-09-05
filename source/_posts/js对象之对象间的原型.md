---
layout: post
title: js对象之对象间的原型
date: 2017-09-03 18:35:58
tags:
- js对象
- js原型
- js对象保护
---
## 原型
原型用来描述对象之间的继承关系。每个对象都有原型，通过[[prototype]]这个内部属性描述。对象会继承其原型的所有属性和方法。
```
let obj1 = {
    name: 'obj1',
    desc: function() {
        console.log("obj name is:", this.name)
    }
}

let obj2 = Object.create(obj1); //通过obj1创建对象obj2， obj2的原型是obj1
obj2.name = 'obj2';
obj2.desc(); // obj2 继承了obj2的原型 obj1中的方法
```
<!-- more -->
当调用对象的属性时，首先在当前对象里查找属性是否存在，如果不存在则从当前对象的原型里查找属性一级一级的查找上去，直到找到或者原型为空。

当对当前对象设置一个在其原型里面存在的属性时，并不会改变原型里属性的值，只是在当前对象里创建自有属性(没在原型里)。
```
继上面的例子
obj2.desc =function () {
    console.log("this is in obj2");
};
obj2.desc(); // this is in obj2
delete obj2.desc; // 删除obj2中的desc属性
obj2.desc() // obj2
```

### 读取对象原型
Object.getPrototypeOf(obj2) // 得到obj1对象， 此函数返回obj2对象的原型对象 obj1

obj1.isPrototypeOf(obj2) // 判断接受对象 obj1是否在obj2对象的原型链上

查找定义属性的对象，没有则返回null：
```
function getDefinedObject(obj, propKey) {
    obj = Object(obj); // 确保 obj是一个对象
    while(obj && !{}.hasOwnProperty.call(obj, propKey)) {
        obj = Object.getPrototypeOf(obj); // 获取obj的原型对象
    }
    return obj;
}
```
### 特殊属性：\_\_proto\_\_
一些js引擎实现了使用 \_\_proto\_\_ 来获取对象的原型，\_\_proto\_\_是es6中的规范，在es5中没有规定
```
let obj = {};
Object.getPrototypeOf(obj) === obj.__proto__ ;//当js引擎支持__proto__时返回true
```
## 遍历和检测属性
对象的属性分为自有属性和继承的属性，继承的属性是对象的原型上的属性。

Object.getOwnPropertyNames(obj) 和 Object.keys(obj)都返回有obj自有属性组成的数组，两者区别在于 Objec.keys方法只返回可枚举的属性。

对象的 in 操作会影响对象自有属性和继承属性
```
for(vat proper in obj){} //会列出obj对象的自有的和继承的可枚举属性
```
检测属性是否存在  `propKey in obj // 影响继承属性,不可枚举的属性也能判断` `Object.prototype.hasOwnProperty(propKey) // 只检测对象自有属性propKey是否存在`

## 访问器
访问器设定获取对象属性和设置对象属性时的行为
```
// 通过对象字面量定义访问器
let obj = {
    get test() {  // 获取test属性值时调用此函数
        return value
    },
    set test(value) { // 设置foo属性值时调用此函数
        console.log('设置foo的值:', value)
    }
};
 obj.test //'hello'
 obj.test = 'test' //设置foo的值: test
 obj.test // 'hello'

// 通过属性描述符定义访问器
obj = Object.create(
    Object.prototype, {
        foo: {
            get: function () {
                return 'hello'
            },
            set: function (value) {
                console.log('new value is:', value)
            }
        }
    }
)
```

**访问器的get和set都会继承与原型的get和set**

## 属性特性和属性描述符
对象的属性特性共有六个，她们的含义和默认值如下
属性建       | 默认值    | 含义
-------------|-----------|----------------------
value        | undefined | 属性的值
writeable    | false     | 属性是否可改变
get          | undefined | 读取属性时调用的函数
set          | undefined | 设置属性时调用的函数
enumerable   | false     | 属性是否可枚举
configurable | false     | 属性特性是否可改变
### 属性定义时的行为
1. 当使用赋值创建属性时： 属性的特性为可写、可配置、可枚举
2. 使用属性描述符定义时
+ 如果属性不存在则会创建属性，其特性由属性描述符指定，如果没指定则使用默认属性特性
+ 如果属性已经存在则更新属性描述符的属性特性

定义属性使用 `Object.defineProperty(obj, propKey, {writeable: true, enumerable: true,configurable: true})`或者 
```
Object.defineProperties(obj,
    {
        propKey1： {writeable: true, enumerable: true,configurable: true},
        propKey2： {writeable: true, enumerable: true,configurable: true},
        ......
        ......
    })
```
获取属性描述符使用`Object.getOwnPropertyDescriptor(obj, propKey)`

## 可枚举性
可枚举属性只影响 `Object.keys, for(key in obj)和 JSON.stringify`

## 保护对象
+ 防止扩展。防止扩展是指对象不能再添加属性, 但可以删除和更改属性值。 相关操作为： Object.preventExtensions(obj),  判断对象是否可扩展 用 Object.isExtensible(obj)
+ 封闭。封闭了的对象不能扩展，属性特性也不能再更改。 Object.seal(obj) 封闭对象， Object.isSealed(obj)判断对象是否封闭。
+ 冻结。使所有属性不可写且封闭对象，与封闭的区别是冻结使所有属性不可写而封闭使保持属性的可读可写性(只是不能再变更可读可写性)。Object.freeze(obj)冻结对象， Object.isFrozen(obj)判断对象是否被冻结

