---
layout: draft
title: leetcode-add-two-numbers
tags:
  - javascript
  - leetcode
categories:
  - leetcode
  - javascript
date: 2020-05-09 10:15:55
---

## leetcode 两数相加问题描述

[原问题链接 https://leetcode.com/problems/add-two-numbers](https://leetcode.com/problems/add-two-numbers)

问题描述: 输入两个非空链表 l1,l2, 链表节点为`{val:'', next: node}`, 链表每个节点的 val 都在 0~9 之间. l1,l2 代表两个数, 链表的第一个节点存储对应数的个位数,第二个节点存储对应数的十位数依次类推.

任务: 计算 l1, l2 代表的两个数之和,然后将和转换成链表表示, 并输出链表.

链表格式

```
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
 }
```

example:

```
输入: l1 (2 -> 4 -> 3), l2 (5 -> 6 -> 4)
输出: 7 -> 0 -> 8
解释: 342 + 465 = 807
```

<!-- more -->

## version 1

思路: 遍历两个链表,将 l1, l2 的内容还原为字符串并解析成数字,再求和.

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let num1 = String(l1.val);
  let num2 = String(l2.val);
  // 遍历l1链表,将内容拼接成字符串
  while (l1.next) {
    num1 = String(l1.next.val) + num1;
    l1 = l1.next;
  }
  // 遍历l2, 拼接成字符串
  while (l2.next) {
    num2 = String(l2.next.val) + num2;
    l2 = l2.next;
  }

  // 将l1, l2拼接的字符串转为数字,相加后再转为字符串,再分割为数组
  console.log(num1, num2);
  const count = String(Number.parseInt(num1) + Number.parseInt(num2)).split("");

  let result = null;
  // 使用倒插法建立链表
  for (let i = 0; i < count.length; i++) {
    let node = {
      val: count[i],
      next: result,
    };
    result = node;
  }

  return result;
};
```

遇到的问题:  
当输入的两个链表为:`[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1] [5,6,4]`  
输出了 `[0,3,NaN,NaN,1]`, NAN 是 leetcode 将输出链表中每个值转换为数字时造成的  
而期待的输出是 `[6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]`

原因在于 js 中数字比较大时会用科学计数法表示

## version 2

接下来是解决科学计数法转为字符串的问题

`number.toLocaleString(10)` 将数字转为字符串,不存在科学计数法表示的问题,但每三个字符之间会加个逗号,再将其转为数组时进行过滤处理`number.toLocaleString(10).split('').filter(val => val != ',')`;

经过上述处理后能够正确表示数字了,但是数字太大时发生了精度损失,导致最终结果不正确.

## version 3

由于精度问题,不能直接将链表转为数字,然后用数字相加.

解决思路: 提取链表节点值拼接成字符,然后分别按位数来处理相加问题.

```javascript
var addTwoNumbers = function (l1, l2) {
  let num1 = String(l1.val);
  let num2 = String(l2.val);
  // 遍历l1链表,将内容拼接成字符串
  while (l1.next) {
    num1 += String(l1.next.val);
    l1 = l1.next;
  }
  // 遍历l2, 拼接成字符串
  while (l2.next) {
    num2 += String(l2.next.val);
    l2 = l2.next;
  }

  const maxLength = num1.length > num2.length ? num1.length : num2.length;
  let carry = 0;
  let count = "";
  for (let i = 0; i < maxLength; i++) {
    const sum = Number(num1[i] || 0) + Number(num2[i] || 0) + carry;
    // 取个位数
    count += String(sum % 10);

    // 是否有进位
    carry = sum >= 10 ? 1 : 0;
  }

  // 最后还有进位时再count字符后再添加1
  if (carry) count += 1;

  // 数组倒序
  let result = null;
  // 使用倒插法建立链表
  for (let i = count.length - 1; i >= 0; i--) {
    let node = {
      val: count[i],
      next: result,
    };
    result = node;
  }

  return result;
};
```

到此完美解决了两数相加问题

## summary

1. 做数值运算时一定要考虑数值大小问题,提前评估计算是否会溢出.
2. number 类型转字符串时要考虑科学计数法的影响
3. 对可能溢出的数值计算多考虑用字符串来处理
