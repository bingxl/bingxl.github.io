---
layout: post
title: ssh别名登陆服务器
date: 2019-04-12 15:22:08
tags:
  - linux
  - ssh
  - apt
---

## 介绍

做开发时常常需要登陆远程服务器执行一些操作，以前每次都是使用 ssh userName@ip 来登陆，然而 ip 地址很难记，每次都需要查找下，导致效率太低下，使用 ssh 别名登陆后可以简化为 ssh userName@aliasName 登陆，方便记忆，操作也简化了，而且 aliasName 还可以用于 scp 之类的操作中

<!-- more -->

## 操作步骤

1. 在本地生成 ssh key， `ssh-keygen` ,一路回车后的到 ~/.ssh 目录下的密钥和公钥
2. 拷贝公钥到远程主机 `ssh-copy-id user@ip`, 其中 user 是登陆用户名， ip 是远程主机的 ip 地址; 此步的目的是将公钥拷贝到服务器的 authorized_keys 文件中， 也可以用 `cat ~/.ssh/id_rsa.pub | ssh user@123.45.67.89 "cat >> ~/.ssh/authorized_keys"`命令代替。
3. 设置别名登陆， 在 ~/.ssh/ 目录下新建 config 文件， 文件内容如下

```
HOST host2
    HostName 127.0.0.1 # 远程主机的IP地址
    User root # 登陆名

HOST host1
    HostName 123.123.123
    User root
```

## 说明

配置完成后 就可以使用 ssh host1 命令登陆 host1 服务器
_特别注意_
在 linux 中有文件权限问题， 需要设置 `~/.ssh/config` 和 `~/.ssh/id_rsa.pub` 两个文件的权限 为 `600`

更改命令`chmod 600 config`

## github ssh 访问失败

最近总遇到 clone 时提示访问 22 端口超时，可以通过 https 端口实现 ssh 访问，配置上文提到的 config 文件，添加如下内容

```
Host github.com
    HostName ssh.github.co
    Port 443
```
