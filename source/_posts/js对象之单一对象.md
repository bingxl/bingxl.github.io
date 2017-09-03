---
layout: post
title: js对象之单一对象
date: 2017-09-03 18:33:55
tags:
- js
- js对象
- js单一对象
- apply, call, bind
---
js所有对象都是从字符串到值得映射，对象的属性分为三种：数据属性(最常见)、访问器(设置属性的的获取和设置)、内置属性(在语言规范中定义的js无法直接访问)。

## 访问属性
访问属性有两种方法，点操作符和中括号操作符。
```
let obj = {test: 'hello'};
obj.test;
let keyName = 'test';
obj['test'] =+ obj.test == obj[keyName] 
```
使用点操作符比较方便顺手，使用中括号可以通过计算变量后再得到属性；

设置和删除也比较简单，设置值时直接赋值，删除时使用delete操作
```
obj.test = 'test';
delete obj.test;
```

## 改变this值得三个方法
调用一个普通函数时this指向全局对象，在严格模式下this为undefined。
+ call方法。 method.call(thisValue, arg1, arg2, .....) 调用method方法，并把method方法内部的this指向thisValue值，后面的arg1~argn 是传递给method方法的参数。
+ apply。apply方法和call方法类似，第一个参数为函数的this值，第二个参数是一个数据对象，数组里的每一项都是调用函数的参数。method.call(thisValue, v1, v2, v3) 等价于 method.apply(thisValue, [v1, v2, v3])
+ bind 。 该方法适用做偏函数，提前对函数绑定this和几个参数  var bound = func.bind(thisValue, arg1, arg2); bound(arg3, arg4)则调用func函数，且函数里的this指向thisValue，参数为arg1 ~ arg4

## this的丢失
当把对象里的方法赋值给一个变量时方法里面的this值丢失； 当在方法里面在定义函数时函数里面的this值也会丢失
```
// 解决方法赋值给变量时this丢失情况
let obj = {
    name: "obj",
    test: function() {
        console.log(this.name);
    }
};
let test = obj.test;
test(); // undefined
test.call(obj); // obj

// 解决方法里面定义的函数丢失this情况
obj.test = function() {
    function testInMethod() {
        console.log(this.name); //undefined
    }
    testInMethod()
}

// 1.使用that代替this
obj.test = function() {
    let that = this;
    function testInMethod() {
        console.log(that.name); // obj
    }
    testInMethod()
}

// 2.调用函数时使用call、apply、bind绑定this值
```