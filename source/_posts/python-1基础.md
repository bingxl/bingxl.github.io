---
layout: post
title: python.1基础
date: 2017-12-07 10:42:24
tags:

categroes:
- python
---
## python代码转换成二进制
python代码的执行过程是：源代码-》解析器-》字节码-》解析器-》机器码，pyc和pyo文件是以字节码的形式存在，可以加速代码加载速度，两者不一样的地方在于pyo文件是经过优化的字节码
```pyc和pyo文件生成
# 生成pyc和pyo文件的方式
python -m py_compile file.py  #将file.py转化成pyc 文件
python -O -m py_compile file.py  #将file.py转化成pyo文件
```

# numpy
从文件加载：np.loadtxt(filepath, dtype, comments,delimiter, converters, skiprows,usercols,ndmin, unpack)
存储到文件： np.savetxt(filepath, X, fmt, delimiter, newline, header, footer, comments)
# patplotlib
绘制散点图： plt.scatter(X, Y, c, marker, label)