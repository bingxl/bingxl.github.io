# 博客源码
hexo clean

hexo generate

gulp

hexo deploy


## hexo相关操作
添加新文章：`hexo new 'articleName'`  //运行后文章在source下的 _posts文件夹下

清除以往静态信息 ： `hexo clean`

打包 ： `hexo generate`

部署： `hexo deploy`

本地运行： `hexo server`

$ hexo init [folder]

$ hexo new [layout] <title>  // layout's value is post/page/draft

$ hexo generate   // option -d or --deploy deploy after generation, -w or -- watch watch file changes

$ hexo publish [layout] <filename>  // publish a draft

hexo server  // start a static server , -p port

$ hexo deploy

$ hexo render <file1> [file2]  -0  //output

$ hexo clean

$ hexo list <type> //type is post/page/toute/tag/category


## 添加travis-ci
在项目里添加了travis-ci, hexo博客的生成，压缩，部署都在travis里面进行，源码只负责写和修改文章，然后提交到github上

百度推送：

curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=bingxl.cn&token=TXPxWXjnHVPzbF7b"