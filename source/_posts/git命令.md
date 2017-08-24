---
layout: post
title: git命令
date: 2017-08-23 22:41:19
tags:
---
测试使用 add .是否会提交文件

## git里的对象
共有四种对象，分别是blob、tree、commit、tag。每个对象包含了类型、大小和内容
### blob
blob对象用来存储文件数据，通常是一个文件，一个blob对象的内容如下：

blob | size |       
——————————————      
文件内容

查看blob对象里的内容： git show <SHA1>  sha1是文件经过sha1处理过的标识符
<!-- more -->
### tree
tree类似一个目录，管理一些tree和blob对象

tree | size     
blog | sha1 | filename      
tree | sha2 | treeName  


### commit
一个commit对象指向一个tree对象，用来标记项目某一个特定时间点的状态，包含了时间戳、最近一次提交作者、上一次提交的指针


### tag
tag用来标记某一个提交