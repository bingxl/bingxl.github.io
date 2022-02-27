---
layout: post
title: vscode online
date: 2022-02-27 10:28:38
tags:
---

## what is vscode online
vscode onlie 是在服务器中搭建vscode环境，然后在任何带有浏览器的设备中通过浏览器使用vscode

## requirements
一台具有公网ip云服务器，服务器最低配置是 内存:1GB, cpu: 2核

## 使用软件
- code-server
- chrome浏览器

## 步骤
1. 在服务器中安装 code-server， 具体步骤参考 [https://coder.com/docs/code-server/latest/install](https://coder.com/docs/code-server/latest/install)； 服务器上网络原因使用shell脚本安装时经常卡住，所以我是在本地下载上传到服务器安装，[下载地址](https://github.com/coder/code-server/tags)

2. 配置    
配置文件位置 `~/.config/code-server/config.yaml` 
```yaml
# port改为自己的端口
bind-addr: 0.0.0:port
auth: password
password: 改为自己的密码
cert: false
```

3. 启动服务
`code-server`

4. 从浏览器访问 `ip:port`   
界面截图如下：
![vscode online](/images/vscode-online.png)