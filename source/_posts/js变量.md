---
layout: post
title: js变量
date: 2020-10-27 11:54:25
tags:
  - js

categories:
  - 前端
  - js
---

## es5 中得变量

es5 中变量使用`var`关键字声明，var 声明得关键字存在变量提升，没有块级作用域，可重复定义,后面定义得覆盖前面定义

```javascript
console.log(a); // undefined，变量a在后面申明，发生了变量提升，但赋值没有提升，所以是 undefined
var a = 1;
var a = 2; // 覆盖前面定义得a变量
console.log(a);
```

```javascript
for (var i = 0; i < 2; i++) {
  setTimeout(() => console.log(i), 100); // 2 2, var声明得变量没有块级作用域，执行setTimeout函数时i已变为2
}
console.log(i); // 2, var声明得变量作用域在当前函数作用域中
```

## es6 中变量声明

es6 中使用`let`和`const`声明变量，不会发生变量声明提升，拥有块级作用域，同一作用域中不可重复声明变量

```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

```javascript
let a = 10;
var a = 11; // SynataxError: Identifier 'a' has already been declared, 重复声明的变量只要不都是用var声明都会报重复声明错误
```

```javascript
for (let i = 0; i < 2; i++) {
  setTimeout(() => console.log(i), 100); // 0 1, let 声明的变量有块级作用域， 当前函数是一个作用域， for条件中是一个作用域， for循环体内是一个作用域
}
console.log(i); // ReferenceError
```

**let 和 const 的区别**
let 声明的变量可以重新赋值，const 声明的变量不能重新赋值

```javascript
let a = 0;
const b = 10;

a = 12;
console.log(a); // 12

b = 13; // TypeError: Assignment to constant variable
```
