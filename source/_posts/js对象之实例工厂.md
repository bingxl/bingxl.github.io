---
layout: post
title: js对象之实例工厂
date: 2017-09-03 18:36:12
tags:
---
## new相关
```
let Person = function (name) {
    this.name = name;
};
let lihua = new Person('lihua'); // lihua是Person对象的一个实例
```
new操作符有执行过程：
+ 设置行为： 创建一个新对象，其原型为 Person.prototype
+ 设置数据： Person接受刚上一步创建的对象作为隐式参数 this，设置新创对象的属性值this.name

<!-- more -->
两个原型： 首先是常见的对象的原型，这是在对象原型链上的对象；每个构造函数都有一个prototype属性指向一个对象，该对象成了构造函数所有实例的原型，称为实例原型。而每个实例原型的constructor属性指向构造函数，每个实例也继承了实例原型里的constructor属性
```
let Person = function (name) {
    this.name = name;
};
let lihua = new Person('lihua');
Person.prototype === lihua.__proto__ //true
Person.prototype.constructor === Person //true 
Person === lihua.constructor // true
```

### instanceof
value instanceof constr  检测constr.prototype对象是否在value的原型上，等价于 constr.prototype.isPrototypeOf(value)

以null为原型创建的对象的原型为null，Object.prototype对象的原型为null。

## 原型属性中的数据
+ 对于实例属性，避免使用带初始值的原型属性，因为更改值时可能更改了原型中的值，是的其它实例的值也改变；对于每个实例里都有一个属性但值不同的情况下，在构造函数里为每个实例创建变量而不适用原型默认值
+ 更具需要创建实例属性。共享的属性未固定值时，可在实例原型里设置属性特性的get、但不设置set，这样就只能获取属性不能更改属性了
+ 避免非多态的原型属性。对于非多态的原型属性可以使用常量来替换