---
layout: post
title: travis-ci构建与部署
date: 2017-08-24 10:36:59
tags:
---
参考网上的一篇文章，实现了项目提交后再travics-cl上自动构建部署 [链接](http://blog.csdn.net/woblog/article/details/51319364)

travis-cl 是在线持续集成工具，对于项目开发时可以本地编写源码，推到github上时出发travis-cl，Travis-cl进行后续操作，包括代码测试、代码压缩打包、代码部署等操作

对于传统的开发流程，编写源码后再本地进行代码测试、编译、压缩、打包等操作，得到最终代码后再部署到服务器上。需要花费大量的时间特别是测试部分。使用持续集成后只需要把源码推到github上，后续所有工作都自动完成。