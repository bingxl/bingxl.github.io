---
layout: post
title: js中的this
date: 2017-07-12 20:54:54
tags:
  - web
  - 前端
  - js
categories:
  - web
  - 前端
  - js
---

刚接触 js 不久时对 this 总是感到无比迷茫，以下是来自 js 设计模式与实践里的总结

this 总是指向一个对象，有时指向全局对象，有时指向构造对象，有时指向 DOM 对象

<!-- more -->

## 1. 作为对象的方法调用

做为对象的方法调用时 `this` 指向对象本生

```javascript
var Person = {
  name: "bingxl",
  getName: function () {
    console.log(this.name); //bingxl
  },
};
Person.getName();
```

## 2. 作为普通函数被调用

普通函数里的 this 总是指向全局变量

```javascript
var name = "window";
function getName() {
  var name = "function";
  return this.name;
}

console.log(getName()); //window  严格模式下为undefined
```

对象的方法复制给变量，在通过变量来调用后对象的方法变成了普通函数

```javascript
var name = "window";
var Person = {
  name: "bingxl",
  getName: function () {
    return this.name;
  },
};
var getName1 = Person.getName;
console.log(getName1()); // window
var getName2 = Person.getName();
console.log(getName2); // bingxl
```

自习观看这个例子发现：  
getName1 = Person.getName 是把 getName1 指向 Person.getName 方法的内存地址(方法本身没有被执行)，其本质是个函数，所以在使用 getName1() 时就是调用普通函数  
getName2 = Person.getName() 是把 Person.getName 的返回值(已经执行了)bingxl 赋值给 getName2  
对两个变量经行 typeof 操作

```javascript
console.log(typeof getName1); //function
console.log(typeof getName2); // string
```

## 3. DOM 事件触发函数里的 this

DOM 事件触发函数里的 this 指向 DOM 节点本身

```html
<!DOCHTML html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="person">click this</div>
    <script>
      window.id = "window";
      var div = document.getElementById("person");
      div.addEventListener("click", function () {
        console.log(this.id); //person
        var test = function () {
          console.log(this.id); // window
        };
        test();
      });
    </script>
  </body>
</html>
```

test() 是一个普通函数，所以 test 里的 this 指向了全局对象 window

## 4. 构造器调用

使用 new 运算符调用构造函数时会返回一个对象，构造函数里的 this 一般就指向返回的对象  
当构造函数使用 return 显式的返回一个对象时 new 操作符返回的就是显式返回的对象

```javascript
var Person = function () {
  this.name = "bingxl";
};
var student = new Person();
console.log(student.name); // bingxl
var Person = function () {
  this.name = "bingxl";
  return {
    name: "test",
  };
};
var student = new Person();
console.log(student.name); // test
```

## 5. call 与 apply

通过 call 或 apply 调用会改变 this 的指向

```javascript
var Doctor = {
  name: "bingxl",
  profession: "doctor",
  getProfession: function () {
    console.log(this.profession);
  },
};

var Student = {
  name: "zhangsan",
  profession: "student",
};
Doctor.getProfession(); // doctor
Doctor.getProfession.call(Student); //student
```

---

end
