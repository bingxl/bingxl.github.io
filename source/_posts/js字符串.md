---
layout: post
title: js字符串
date: 2017-08-05 22:47:02
tags:
- 前端
- js
- js字符串
- web
categories:
- web
- 前端
- js
---
js字符串方法预览:  
fromCharCode(num1, num2,,,),    
charAt(),    
charCodeAt(),   
length,     
split(''),  
slice(start, end?)      
substring(start, end?)  
trim()  
concat()    
toLowerCase()   
toUpperCase()   
indexOf(str, index?)    
lastIndexOf(str, index?)    
search(regexp)      
match(regexp)   
replace(search, replacement)    

<!--more  -->

## 字符字面量与转义
单引号和双引号都可以表示字符字面量，'string is this' "other string is that" 推荐在js中使用单引号，HTML中使用双引号，转义字符以\开始, \n换行符  \f换页符号  \b空格符  \r回车符  \t水平制表符号   \v 垂直制表符号

## charCodeAt、charAt 与 fromCharCode 
fromCharCode返回由utf-16编码单元组成的字符串,而charCodeAt则返回指定位置的字符的utf-16码, charAt返回制定位置的字符

String.fromCharCode(97, 98, 99) // 'abc'        
'abc'.charCodeAt(0) // 97
'abc'.charAt(0) // 'a'

## length
字符串的length属性为字符串的长度, '稻草人'.length // 3

## split, slice, substring
split(code, limit)将字符串转换为数组以code字符分割，limit为分隔后显示前几项

slice(start, end?)从字符串中截取子字符串，start为开始位置，end为结束位置（不包含）如果没有end参数则到字符串结尾

substring和slice函数一样，参数值可以为负值
```
'test'.split('') ;//['t','e','s','t']
'test'.split('', 2) //['t','e']
'test'.slice(0,2); //'te'
```
## trim, concat
trim去除字符串两侧的空格，concat把对字符串进行拼接；
```
'  test   '.trim() //'test'
'hello'.concat(' name',' test') // 'hello name test'
```
## toLowerCase, toUpperCase
toLowerCase 把字符串转换为小写，toUpperCase将字符串转换为大写字母

## indexOf, lastIndexOf
indexOf(str, index?) str为索引的字符，index为开始的位置默认为0；
lastIndexOf(str, index?) 和indexOf一样，只是从index位置开始向前开始查找
```
'test'.indexOf('t') // 0
'test'.indexOf('t', 2) // 3
'test'.lastIndexOf('t') // 3
'test'.lastIndexOf('t', 2) // 0
```

## search， match， replace
search(regexp) 返回字符串中第一个与regexp相匹配的子字符串的起始位置，为匹配则返回-1；match(regexp) 将regexp与字符串匹配，若未设置 全局匹配标志则返回第一次匹配的相关信息，若设置了全局匹配标志则返回所有匹配的子字符串；replace(str or regexp, 'replacestring'),将字符串中第一个str字符替换，或将匹配正则的字符替换，正则表达式中若设置全局标志则把所有匹配的字符全部替换，若未设置则只替换第一个匹配的字符，替换的目标字符中可以使用$符号进行完全匹配或捕获分组

```
'-yy-xxx-y-'.search(/x+/) // 4,不使用正则表达式时和indexOf函数一样
'-abb--aaab-'.match(/(a+)b/) // [ 'ab', 'a', index: 1, input: '-abb--aaab-' ]
'-abb--aaab-'.match(/(a+)b/g)  //[ 'ab', 'aaab' ]

var str = 'iixxxixx';
log(str.replace('i', 'o') ) // oixxxixx
log(str.replace(/i/, 'o') )  // oixxxixx
log(str.replace(/i/g, 'o') ) // ooxxxoxx
log(str.replace(/i+/g, '[$&]') ) // [ii]xxx[i]xx
log(str.replace(/(i+)/g, '[$1]') ) //[ii]xxx[i]xx

//replace 使用函数
var str = 'axbbyyxaa';

function log(){
    console.log.apply(null, arguments);
}

function repl(all){
    return all.toUpperCase();
}

log(str.replace(/a+|b+/g, repl)); //AxBByyxAA
```