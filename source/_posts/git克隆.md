---
layout: post
title: git克隆
date: 2017-08-31 16:51:06
tags:
  - git
  - git关联远程分支
---

git 支持多种协议：本地协议，ssh 协议，git 协议，http，https 协议。

当我关联远程分支时使用 http 或 https 协议则每次提交代码都需要输入用户名和密码，所以更换为 git 协议。

查看使用的传输协议:

<!-- more -->

```
git remote -v

wuxiao@wuxiao-C-B150M-K-Pro:~/MyGithub/DailyBlog$ Git remote -v
origin https://github.com/bingxl/hexoBlogSource.git (fetch)
origin https://github.com/bingxl/hexoBlogSource.git (push)
```

重新设置成 ssh 的方式:

```
git remote rm origin
git remote add origin git@github.com:username/repository.git
git push -u origin master  //关联远程分支第一次提交时
```
