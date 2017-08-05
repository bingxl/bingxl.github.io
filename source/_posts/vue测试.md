---
layout: post
title: vue测试
date: 2017-08-05 09:45:51
tags:
- 前端
- vue
---
# 浏览器
使用vuex时在测试时会报错，因为在 phantomjs 里 的 vuex 需要 polyfill 支持

npm安装babel-polyfill  `npm install babel-polyfill --save-dev`

在test/unit/karma.conf.js里 files 选项里引入polyfill
```
files: [
    '../../node_modules/babel-polyfill/dist/polyfill.js',
    './index.js'
],
```