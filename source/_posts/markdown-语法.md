---
title: markdown 语法
date: 2017-07-12 15:59:36
tags:
- markdown
---
# MARKDOWN note
## 兼容HTML 
在makdown里可以使用html标签，块状标签里面的makdown语法无效（起始标签前有空行，没空行就会解析）
## 特殊字符自动转换
< 和 & 会自动根据内容来决定是否转义，若是HTML实体则不转义，其余则转义
<!-- more -->
## 段落和换行
空行就是换行，两个以上空格在回车就是 &lt;br />
## 标题
 ##表示
## 区块引用
 > \> 引用
 
区块引用使用空行结束
## 列表
 first
 second

1. first
2. second

##代码快
使用四个空格或一个tab建，直到没有缩进的行或者文件结束

    <?php
    $a = "string" ;
    $b = new array();
    ?>
##分隔线
一行中使用三个以上星号或者减号、底线
**********
这是一个分隔符

##链接
使用[]书写链接文字后根()写明链接地址以及标题
[link]\(http://xdlxb.cn "title")

[this is a link](http://blog.xdlxb.cn "个人博客")
    另一种使用方法，在文件使用时直接使用[link] 在文件其余地方定义  前面有空行才生效[link]: http://example.com "this is another used"
##强调
使用 \*或_ 包含强调文字 \**斜体*\* &nbsp;**\*\*粗体**\*\*
##代码
小段（行内）代码使用反引号 `echo "php code"` 代码内有反引号则使用多个反引来解决

## 图片
![替换文字]\(https://cn.vuejs.org/images/logo.png "title")

## 自动链接
<http://example.com>
链接文字就是网址
<address@example.com>邮件地址

##转义
使用反斜杠 \*