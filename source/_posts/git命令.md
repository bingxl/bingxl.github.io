---
layout: post
title: git命令
date: 2017-08-23 22:41:19
tags:
- git
- git笔记
---
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

查看tree对象使用 git ls-tree sha1

### commit
一个commit对象指向一个tree对象，用来标记项目某一个特定时间点的状态，包含了时间戳、最近一次提交作者、上一次提交的指针

commit | size   
tree | shal     
parent | shal   
author | shal   
committer | scott   

tree是当前提交的对象，patent指向前一个提交对象，author为作者，committer是实际提交的人

使用git show -s --pretty=raw shal 查看commit对象信息
### tag
tag用来标记某一个提交

tag | size  
object | shal   
type | blob or commit or tree   
tagger | name

object为对象名， type为标签类型，tagger为创建标签的人

可以使用 git cat-file tag tagName 查看标签信息

## git目录
工作目录，仓库目录，暂存区(索引目录)

## 配置
```
git config --global user.name "yourname"
git config --global user.email "yourEmail"
```