---
layout: post
title: js快速参考
date: 2017-07-30 09:58:25
tags:
---

概述：语法、变量与赋值、值、布尔值、数字、运算符、字符串、语句、函数、异常捕获、严格模式、变量作用域和闭包、对象和构造函数、数组、正则表达式、Math、标准其他库

<!--more  -->

## 语法

_概述_

var, let, const 用于声明变量(const 声明常量)

```javascript
var x; // 声明变量
x = 0; // 变量赋值
var arr = [1, 2, 3]; // 数组的声明与赋值

// 对象的声明与赋值
var obj = {
  name: "bingxl",
  foo: function (x, y) {},
};
foo(x, y); // 调用函数
obj.foo(x, y); // 调用对象的方法

if语句;
if (x === 0) {
  // some statement
}

// 定义函数
function foo(x, y) {
  // function statement
  return 0;
}
```

_语句与表达式_

语句是做事情，一个语句用分号结束，语句块没有分号结束；表达式则是产生一个值

```javascript
var str = ""; // 语句
str + "hello"; //表达式
func(x, y); //本身是个语句，但函数调用是表达式(产生了值)
```

_分号_

js 中分号可选，会自动判断语句结束位置并插入分号，但，，，，，，不推荐，最好一直带着分号

_注释_

单行注释： //  
多行注释： /\* \*/

## 变量和赋值

标识符：使用 unicode 字符、美元符、下划线开头后跟 unicode 字符、数字、美元符  
保留字和 NAN、Infinity、undefined 不能用作变量名  
使用 = 赋值， 复合赋值为 += 、 -= 、 /= 、 \*=

## 值

分类： 布尔值、数字、字符串、undefined、 null、 对象  
每一类值都有属性，每个属性都由 key 和 value 组成

### 原始值

原始值有布尔值、数字、字符串、undefined、null  
特点：

- 原始值按值进行比较，只要值相同就相等

```
3 === 3
'' === ''
```

- 属性值不能改变、添加或移除

### 对象

属于对象的有：简单对象、数组、正则表达式

特点：

- 按引用进行比较，比较身份标识符，每个值都有各自的身份标识符
- 默认可变，对象的属性可以自由的被改变

### undefined 和 null

undefined 表示没有值，而 null 表示没有对象，未赋值和缺失的参数都为 undefined

### typeof 与 instanceof

typeof 操作结果：
操作数 | 结果
----------|-----------
undefined | undefined
数字 | number
字符串 | string
布尔值 | boolean
函数 | function
null | object
数组 | object
对象 | object

instanceof:  
`value instanceof constr` 如果 value 是通过 constr 构造器创建的对象则返回 true

## 布尔值

布尔值只有 true 和 false 两个值。  
产生布尔值的运算符：

- 二元逻辑运算符： && 、||
- 前置逻辑运算符： ！
- 比较运算符： ` ===, !==, ==, !=, >, <, >=, <=`

解释为 false 的值：

- undefined、null
- 布尔值 false
- 数字： -0、0、NaN
- 字符串： ''

其余都是 true 特别注意： _[] 和 {} 都被解析为 true_

二元逻辑运算符：

- 二元逻辑运算符具有短路操作，能确定整个表达式的值后后面的运算数就不会执行

```javascript
var i = 0;
true || i++;
i; //0;
false || i++;
i; //1
```

- 二元运算符的返回值：如果第一个运算数能确定表达式的值则返回第一个运算数，否则返回第二个值

```javascript
true && 1; //1
true && 0; //0
false && 1; //false
true || 0; // true
true || 1; // true
```

## 数字

js 中所有数字都是浮点数，也有三个特殊的值：NaN，Infinity，-Infinity；

## 运算符

运算操作: + - \* / % ++ --

## 字符串

直接通过字面量来创建，通过方括号来方位字符串里的字符(只读)，具有 length 属性。

### 字符串方法

slice、trim、toUpperCase, indexOf,

## 语句

### 条件语句

```javascript
if (condition) {
    // statement
}

if (condition) {
    // statement
} else if (condition) {
    // other statement
}

switch (condition) { // 通过 === 比较
    case 'value':
        // do something
        break;
    case '':
        break;
    ...
    default:
        // default statement

}
```

### 循环语句

```javascript
for ([<<init>>], [<<condition>>], [<<post_iteration>>]) {
    // <<statement>>
}

while (condition) {
    <<statement>>
}

do {
    <<statement>>
} while (condition);


```

break 跳出循环，而 continue 结束本次循环，开始下一次循环

## 函数

函数声明：
`function funName(parameter1, parameter2) {function body}`
函数声明会提升，声明后的函数连同实体会被移动到其所在作用域的开始处； 通过 var 定义的变量也会发生提升，但只是定义发生了提升，赋值未提升。调用函数后返回一个值(函数表达式)。

###

## 异常捕获

## 严格模式

## 变量作用域和闭包

## 对象和构造函数

## 数组

## 正则表达式

## Math

## 标准库的其他功能

### Date

### JSON

### console 系列
