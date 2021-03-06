---
title: js数组集锦
date: 2017-07-12 16:23:01
tags:
  - web
  - 前端
  - js
  - js数组
categories:
  - web
  - 前端
  - js
---

# 设计数组的函数方法

toString, toLocaleString, valueOf,  
concat, splice, slice  
indexOf,lastIndexOf,  
push, pop, shift, unshift,  
sort, reverse  
map, reduce, reduceRight, filter, every, some, forEach

<!-- more -->

# 创建数组

- 数组字面量创建：`var arr = [val1, val2, val3];`
- 数组构造函数：

```javascript
var arr = new Array();
var arr = new Array(1, 2, 3, 5); //返回[1, 2, 3, 4, 5]
var arr = new Array(2); // 返回 [ , , ]  一个参数时是数组的长度length
```

# 清空数组

清空数组有两种方法

- arr.length = 0;
- arr = [];

两者区别：js 中数组是对象，所以 arr 是一个指向数组值的链接，arr.length = 0 时，把数组所有值清除，执行速度慢；arr = []时把 arr 的链接指向一个新的空数组，原数组值存在于内存中如果未被其它变量引用时则被回收。

```javascript
var arr1 = [1, 2, 3];
var arr2 = arr1;
arr2 = [];
console.log(arr1); // [1, 2, 3] arr1 还在
arr2 = arr1;
arr2.length = 0;
console.log(arr1); // [] arr1同时也被清空了
```

# 转换方法

arr.toString() 返回由数组中的每个值的字符串形式拼接(以逗号分隔)的字符串  
arr.toLocaleString() 和 toString 作用相同，不同之处在于对数组的每一项调用 toString 方法  
arr.valueOf() 和 toString 类似，不过返回数组最适合的原始类型  
arr.join() toString 只能使用逗号分隔字符串，而 join 可以指定分隔符

```javascript
var arr1 = ["h", ["e", "g"], "n"];
var arr2 = [1, 2, 3, 4];
arr1.toString(); //"h,e,g,n"
arr1.toLocaleString(); // "h,e,g,n"
arr2.valueOf(); //[1, 2, 3, 4]
arr2.toString(); //"1,2,3,4"
arr1.valueOf(); //["h", Array(2), "n"]
arr2.join("-"); //"1-2-3-4" 指定 - 分隔符
```

# 堆栈、队列方法

push(item) 在数组末尾压入数组项，可以是多项 ，返回修改后的数组长度  
pop() 弹出并返回数组最后一项  
shift() 弹出并返回数组第一项  
unshift() 在数组前端压入数组项并返回数组长度

```javascript
var arr = [4, 5, 6];
arr.push(7, 8);
arr; //[4, 5, 6, 7, 8]
arr.push([9, 10]);
arr; //[4, 5, 6, 7, 8, [9, 10]]

arr.pop();
arr; //[4, 5, 6, 7, 8]
arr.shift(); // arr  [5, 6 ,7, 8]
arr, unshift(1, 2, 3, 4); //arr [1, 2, 3, 4, 5, 6, 7, 8]
```

# 重排序 sort 和 reverse

arr.reverse() 反转数组，第一项变最后一项，最后一项变第一项，依次类推  
sort() 对数组重排序，默认从小到大排序(按字符比较而非数值 如 2 > 100) ,可以传入排序函数  
sort 的函数参数里面，value1 是之前排好的最近一个数，value2 是新传入的参数，当函数返回负值时不调换位置，当返回正值是调换位置

```javascript
var arr = [1, 2, 3, 100];
arr.reverse(); //[100, 3, 2, 1]
arr.sort(); //[1, 100, 2, 3]
arr.sort(compare); //[1, 2, 3, 100]
function compare(value1, currentValue) {
  console.log(value1, currentValue);
  return value1 - currentValue;
}
/*
排序函数打印出来的,可以看出是插入排序// 当数组过长时排序方法已不在是插入排序
1 100
100 2
1 2
100 3
 2 3
*/
```

# 操作方法与位置方法 concat，slice, splice， indexOf ，lastIndexOf

arr.concat() 基于当前数组的所有项创建一个新数组，传入的项被添加到数组末尾构成新数组  
arr.slice(start, end ) 基于当前数组中的一项或多项创建新数组,start 为开始位置，end 为结束位置，end 没有的话默认为到数组结束
arr.splice(start, num, arr1, arr2......) 从 start 位置开始删除 num 项数组，然后在 start 位置插入 arr1 ，arr2 ,,,,,,,,,。num 为 0 时没有删除项， arr1, arr2 ,,,,,可以没有  
arr.indexOf(value, start) 搜索 value 值在数组中的索引值 ,start 为开始项默认为 0，未找到返回 -1  
arr.lastIndexOf(value, start) 从数组的末尾开始查找(倒序查找)，没找到返回 -1

```javascript
var arr1 = [1, 2];
var arr2 = arr1.concat(3, [4, 5]);//[ 1, 2, 3, 4, 5 ]
arr2.slice()
//[ 1, 2, 3, 4, 5 ]
 arr2.slice(1)
//[ 2, 3, 4, 5 ]
arr2.slice(1,4)
//[ 2, 3, 4 ]

 arr2
//[ 1, 2, 3, 4, 5 ]

//以下为node环境下， > 为js表达式，回车后是输出
> arr2.slice(1)
[ 2, 3, 4, 5 ]
> arr2.slice(1,2)
[ 2 ]
> arr2.slice(1,4)
[ 2, 3, 4 ]
> arr2
[ 1, 2, 3, 4, 5 ]
> arr2.splice(0,1)
[ 1 ]
> arr2
[ 2, 3, 4, 5 ]
> arr2.splice(0,1,1)
[ 2 ]
> arr2
[ 1, 3, 4, 5 ]
> arr2.splice(1,0,2)
[]
> arr2
[ 1, 2, 3, 4, 5 ]
> arr2.splice(5,0,6, 7, 8)
[]
> arr2
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
> arr2.indexOf(8)
7
> arr2.lastIndexOf(8)
7
// 当查找的值在数组中有多个时indexOf 和lastIndexOf返回不同

```

# 迭代方法 map, filter, every, some, forEach, reduce, reduceRight

arr.map() 对数组中的每一项运行给定的函数，返回每次调用的结果组成的数组。  
arr.filter() 对数组中的每一项运行给定的函数，返回由给定函数返回 ture 的项组成的新数组。  
arr.every()对数组中的每一项运行给定的函数，如果该函数对每一项都返回 true 则返回 true  
arr.some()对数组中的每一项运行给定的函数，如果该函数对任一项返回 true 则返回 true  
arr.forEach()对数组中的每一项运行给定的函数，没有返回值  
以上 5 个方法传入的函数有三个参数 分别是 item、index、arr，分别是当前项，当前项的索引，数组

arr.reduce()，arr.reduceRight()
迭代所有项，然后构建一个最终返回值，只是迭代的顺序不同，reduce 从左到右，reduceRight 从右到左。传入的函数的参数有 prev、cur、index、arr，分别是前一项迭代的结果，当前项，当前项的索引，数组 arr

```javascript
var arr = [1, 2, 3, 4, 5];

arr.map(function (item, index, arr) {
  return item * 2;
}); //数组的每项都乘2 ，返回 [2, 4, 6, 8, 10]

arr.filter(function (item, index, arr) {
  return item % 2 == 0;
}); // 返回偶数项 [2, 4]

arr.every(function (item, index, arr) {
  return item > 0;
}); // 数组所有项都大于0 ，返回 true

arr.some(function (item, index, arr) {
  return item < 2;
}); //  数组里有小于2的项？ 返回true

arr.forEach(function (item, index, arr) {
  console.log(item, index, arr);
}); // 没有返回项
/*
forEach打印出来的
1 0 [ 1, 2, 3, 4, 5 ]
2 1 [ 1, 2, 3, 4, 5 ]
3 2 [ 1, 2, 3, 4, 5 ]
4 3 [ 1, 2, 3, 4, 5 ]
5 4 [ 1, 2, 3, 4, 5 ]
*/

arr.reduce(function (prev, cur, index, array) {
  console.log(prev, cur);
  return prev * cur;
}); // 返回数组所有项相乘的结果120
/*
打印结果
1 2
2 3
6 4
24 5
*/

arr.reduceRight(function (prev, cur, index, array) {
  console.log(prev, cur);
  return prev * cur;
}); // 返回数组所有项相乘的结果120
/*
打印结果
5 4
20 3
60 2
120 1
*/
```
