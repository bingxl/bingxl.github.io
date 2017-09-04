---
layout: post
title: js对象之对象间的原型
date: 2017-09-03 18:35:58
tags:
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

## 遍历和检测属性

## 属性特性和属性描述符

## 保护对象
+ 防止扩展。防止扩展是指对象不能再添加属性, 但可以删除和更改属性值。 相关操作为： Object.preventExtensions(obj),  判断对象是否可扩展 用 Object.isExtensible(obj)
+ 封闭。封闭了的对象不能扩展，属性特性也不能再更改。 Object.seal(obj) 封闭对象， Object.isSealed(obj)判断对象是否封闭。
+ 冻结。使所有属性不可写且封闭对象，与封闭的区别是冻结使所有属性不可写而封闭使保持属性的可读可写性(只是不能再变更可读可写性)。Object.freeze(obj)冻结对象， Object.isFrozen(obj)判断对象是否被冻结

