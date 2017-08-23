---
layout: post
title: apt命令
date: 2017-08-23 08:28:48
tags:
- linux
- ubuntu
- apt
---

## apt简介
　　高级包装工具（Advanced Packaging Tools）是Debian及其衍生发行版（如：ubuntu）的软件包管理器。APT可以自动下载，配置，安装二进制或者源代码格式的软件包。

　　apt-get命令一般需要root权限执行，所以一般跟着sudo命令。与/etc/apt/sources.list中匹配。
## apt常用命令集合

+ apt-cache search packagename 搜索包
+ apt-cache show packagename 获取包的相关信息，如说明、大小、版本等
+ apt-get install packagename 安装包
+ apt-get install packagename --reinstall 重新安装包
+ apt-get -f install 修复安装”-f = –fix-missing”
+ apt-get remove packagename 删除包
+ apt-get remove packagename --purge 删除包，包括删除配置文件等
+ apt-get update 更新源
+ apt-get upgrade 更新已安装的包
+ apt-get dist-upgrade 升级系统
+ apt-get clean 清理无用的包
+ apt-get autoclean 清理无用的包
+ apt-get check 检查是否有损坏的依赖
+ apt-get dselect-upgrade 使用 dselect 升级
+ apt-cache depends packagename 了解使用依赖
+ apt-cache rdepends packagename 是查看该包被哪些包依赖
+ apt-get build-dep packagename 安装相关的编译环境
+ apt-get source packagename 下载该包的源代码