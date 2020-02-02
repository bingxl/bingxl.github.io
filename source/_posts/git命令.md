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

## 常用命令参考
### 创建版本库
- `git init` 初始化仓库
- `git add [file]` 将文件添加到暂存区
- `git commit -m 'commit说明'` 提交暂存区的对象到仓库里
- `git status ` 查看当前仓库状态
- `git diff[file]` 查看文件再仓库和工作去的区别
### 时光穿梭
- `git reset --hard HEAD^/[commit id]` 回退到之前版本，HEAD^^ 为上两个版本，
- `git reflog `查看执行过的提交命令
- `git log`查看提交历史
- `git checkout --[file]` 将仓库里的文件切换出来（工作区的修改会被丢弃）
- `git reset HEAD [file]` 和上一条命令功能相同
- `git rm [file]` 之后commit达到删除文件功能

### 远程仓库
- `git remote` 查看远程仓库
- `git remote -v` 查看远程仓库信息
- `git remote add origin git@github.com:userName/repo-name.git` 添加远程仓库
- `git remote rm origin` 删除已存在的远程分支
- `git push -u origin master`第一次推送master分支的所有内容

### 分支管理
- `git branch` 查看分支
- `git branch <name>` 创建分支
- `git checkout <name>` 切换分支
- `git checkout -b <name>`创建并切换分支
- `git merge <name>` 合并某分支到当前分支
- `git branch -d <name>` 删除分支
- `git branch -D <name>` 强行删除未合并过的分支
- `git log --graph` 查看分支合并图
- `git merge --no-ff -m '提交说明' <branchName>` 禁止使用fast forward模式合并，会创建一个提交


- `git stash` 把当前工作现场存储起来，等以后恢复现场后自动工作
- `git stash list `查看存储的工作现场
- `git stash apply` 恢复现场，恢复后不会删除stash
- `git stash drop` 删除stash
- `git stash pop` 恢复并删除stash

- `git push origin branchName`推送本地分支
- `git pull` 抓取远程分支到工作区，而fetch只是抓取到本地仓库中
- `git checkout -b branchName origin/branchName`创建本地分支并和远程分支关联
- `git branch --set-upstream branch-name origin/branch-name` 建立本地分支和远程分支的关联

### 标签管理
@TODO
标签是和某次提交绑定到一起的
- `git tag <tagname> [commitId]` 创建一个标签，默认指向当前HEAD
- `git tag -a <tagname> -m 'blabla' [commitId]`创建一个标签和说明
- `git push origin <tagname>` 推送本地标签到远程
- `git push origin --tags` 推送所有未推送过的本地标签到远程
- `git tag -d <tagname>` 删除一个本地标签
- `git push originn :refs/tags/<tagname>`删除一个远程标签