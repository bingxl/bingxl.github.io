---
layout: post
title: termux
date: 2022-03-10 01:31:54
tags:
---

## termux
termux是一款安卓端的linux模拟器，功能非常强大
下载： 从github伤下载最新版本 https://github.com/termux/termux-app/tags；



## 修改软件源
termux清华源

## 设置存储权限
termux-setup-storage

## 安装ubuntu
```bash
apt install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
```

## 设置Ubuntu得apt源
需要特别注意得一点是平板/安卓上用的是ubuntu-ports源
先安装ca-certificates
`apt install ca-certificates`,再更换apt源
参考 https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu-ports/


## 安装code-server