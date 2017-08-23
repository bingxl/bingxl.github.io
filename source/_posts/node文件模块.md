---
layout: post
title: node文件模块
date: 2017-08-07 11:32:58
tags:
- web
- node
- node文件模块
---

## 概述
+ 文件操作的同步与异步
+ 对文件的读写操作
+ 从指定位置开始读写文件
+ 创建与读取目录
+ 查看文件或目录信息
+ 其它操作
+ 文件流
<!--more  -->
## 文件操作的同步与异步
所有文件、目录的创建、读取、删除操作都有同步和异步两种方式，同步方式方法名后有Sync

```
let fs = require('fs');
fs.readFile(__dirname + '/index.md',(err,stdout,stderr){
    if(err){
        console.log(stderr);
        return;
    }
    console.log('异步读取文件', stdout);
}; //异步方式


let data = fs.readFileSync(__dirname + 'index.md');
console.log('同步方式读取文件', data);
```

## 对文件的读写操作
### 完整读写
#### 读取
readFile(path, {encoding:'',flag:''}, callback(err, data)):完整读取文件  
encoding: utf8, ascii, base64;  默认二进制
flag:   
```
r, 读取文件，不存在则抛出异常
r+,读写方式，文件不存在则抛出异常
rs, 同步方式读取，忽略本地缓存，文件不存在则抛出异常
rs+, 同步读取写入
w, 写入文件，不存在则创建，存在则清空
wx, 排他式写入文件
w+, 读取并写入
wx+, 读取并写入，拍他式
a, 追加写入文件，不存在则创建
ax, 排他式写入
a+, 读取并追加
ax+ 读取并追加，排他式
```

#### 写入
fs.writeFile(path, data, [options], callback)     
```  
option:{
    flag:'',
    encoding: 'utf8', //utf8, ascii, base64
    mode:'' //对文件的读写权限，默认为0666
}   
```
mode：第一位为0，第二位为文件或目录所有者的权限， 第三个为文件或目录所有者所属用户组的权限， 第四个为其他人权限     
数字所对应的权限：
+ 1:执行权限
+ 2：写权限
+ 3：读权限
fs.writeFileSync(); 同步版本的 writeFile()

fs.appendFile(fileName, data, [options], callback) // 在文件地步追加写入数据，文件不存在则创建文件  
options中flag默认为a

同步版：appendFileSync()

## 从指定位置开始读写文件
### 读取文件
fs.open(filename, flags, [mode], callback(err, fd)),fd是文件句柄。同步版：fs.openSync()  //106行   
文件句柄用于read 、 readSync、 write 、writeSync 方法

fs.read(fd, buffer, offset, length, position, callback(err, bytesRead, buffer))
+ buffer是存储读取数据的缓冲池；
+ offset是存储池中开始存储时的偏移字节数；
+ length 需要读取的字节数；
+ position 读取文件的开始位置 以字节为单位；
+ bytesRead 实际读取到的字节数，在 length + position 大于文件长度时bytesRead !== length

同步读取：readSync()返回实际读取到的字节数

### 写入文件
fs.write(fd, buffer, offset, length, position,callback(err, writeen, buffer))
+ written: 被写入的字节数
+ buffer： 被读取的缓冲区对象 和write参数里的buffer相同

同步版： writeSync();

### 关闭文件
fs.close(fd, callback)  
同步版本：fs.closeSync(fd)   
fs.fsync(fd, callback) 同步缓存中的数据到文件  
fs.fsyncSync(fd) 同步版本的fsync

## 创建与读取目录
fs.mkdir(path, [mode], callback(err))
+ mode默认0777
mkdirSync();

fs.readdir(path, callback(err, files))      
fs.readdirSync()    

## 查看文件或目录信息
fs.stat(path, callback(err, stats)),fs.lstat(path, callback(err, stats))两者基本相同，lstat不能查看符号链接文件信息
```
stats对象：{
    isFile(),
    isDirectory(),
    isBlockDevice(),
    isCharacterDevice() ,是否是字符设备文件
    mode
    nlink 硬链接数量
    uid 文件所有者ID
    gid 文件所有者所在组的ID
    rdev
    blksize
    ino
    size 文件字节数
    blocks
    atimeMs
    mtimeMs
    ctimeMs
    birthtimeMs
    atime 文件访问时间
    mtime 文件修改时间
    ctime 文件创建时间
    birthtime
    _checkModeProperty
    isDirectory
    isFile
    isBlockDevice
    isCharacterDevice
    isSymbolicLink
    isFIFO
    isSocket
}
```

同步版：fs.statSync   fs.lstatSync

使用open和openSync打开的文件使用fs.fstat(fd,callback)访问信息，同步版为fs.fstatSync

### 检查文件或目录是否存在
fs.exists(path, callback(exists)) 回掉函数的参数为布尔值，文件存在则为true    
同步版本：fs.existsSync

### 获取绝对路径
fs.realpath(path,[cache],callback(err, resolvedPath))   
cache是预先指定的路径对象：{'/etc': '/somepath/etc'}   
同步版： fs.realpathSync()

### 修改文件访问时间和修改时间
fs.utimes(path, atime, mtime, callback(err))    
使用open打开的文件时间修改使用：fs.futimes(fd, atime, mtime, callback)

### 修改文件或目录的读写权限
fs.chmod(path, mode, callback(err)) 
fs.fchomd(fd, mode, callback)   使用open打开的文件 

## 其他操作 P118
### 移动文件或目录
fs.rename(oldname, newname, callback(err))

### 硬链接操作
*硬链接*：实际上就是文件名，通过特殊操作可以为文件创造多个文件名即多个硬链接


创建硬链接
```
fs.link(srcpath, dstpath,callback(err))
srcpath为需要创建硬链接的文件的路径及文件名，dstpath与srcpath必须在同一卷中

linkSync同步版
```

删除硬链接
```
fs.unlink(path,callback(err)); // 当删除的硬链接是文件的最后一个硬链接时等同于删除文件
```
### 符号链接
符号链接亦称软链接，是一种仅包含另一个文件或目录的路径及文件名或目录名的特殊文件
```
// 创建
fs.symlink(srcpath, dstpath, [type], callback)
// type 为符号链接的类型默认为 file ，目录类型为 dir  

// 读取
fs.readlink(path, callback(err, linkString))
// 读取链接中所包含的另一个文件或目录的路径及文件名或目录名
```
### 截断文件
文件截断是先清楚文件内容，然后修改文件尺寸的操作

```
fs.truncate(filename, length, callback(err))

fs.ftruncate(fd, length, callback);// 对使用open打开的文件进行截断
```

### 删除空目录
fs.rmdir(path, callback(err))

### 监视文件或目录
```
fs.watchFile(file,[options],listener(curr, prev))
// options:{
    persistent: true 当指定了监视文件后是否停止当前运行的程序
    interval: int  每隔多少毫秒监视一次文件是否发生改变
}

curr 和 prev都是两个 fs.stats对象
```
fs.unwatchFile(filname, [listener]),当文件发生更改时取消某个处理函数，没有listener表示取消监听


fs.watch(file, [options],listener(event, file));event为 rename(重命名，移动，删除)或change(修改)；watch函数返回一个fs.FSWatcher对象，使用此对象的close方法关闭watch监视
## 文件流