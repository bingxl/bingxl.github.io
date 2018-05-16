<!--
@title webAssembly 环境搭建
@author bingxl
@emaill scarecrowlxb@qq.com 
 -->
# 开发者指导
本页面提供一步一步的操作将一个简单的程序编译成webassembly

## 前提要求
为了编译成webAssembly，需要提前安装一些工具：
+ Git。在Linux和OSX下已自带了Git，在Windows下需要安装 [Git for Windows](https://git-scm.com/download/win)
+ CMake。在Linux和OSX下可以使用像apt-get 或 brew 这样的包管理工具来安装，在Windows下下载[CMake installer](https://cmake.org/download);
+ 编译工具。 在linux下安装[GCC](https://askubuntu.com/questions/154402/install-gcc-on-ubuntu-12-04-lts)，在OSX下安装[Xcode](https://itunes.apple.com/us/app/xcode/id497799835)。在Windows下安装 [Visual Studio 2015 Community with Update 3](://www.visualstudio.com/downloads/) 或更新的版本;
+ Python2.7.x。在Linux和OSX下大部分都内置了Python2.7版本，没有的需要安装，Windows下需要自动下载安装；

安装完后，确保git,cmake,python可访问（否则手动添加环境变量）；从技术上讲,如果使用提前编译好的工具链，那么CMake和编译工具不是必须的，只是开发选项可能受到一点限制。

## 下载或编译工具链
在GitHub行容易获得一个提前编译好的工具链，用以将c/c++编译d为webAssembly
```
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
```
如果你在Linux发布版本的操作系统里无法获得预编译的Emscripten 工具链，或者你想从源码构建所有工具链，Emscripten SDK 也能用来构建。它的操作步骤如下：
```
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
$ ./emsdk activate --build=Release sdk-incoming-64bit binaryen-master-64bit
```
经过h这些步骤后，安装已经完成了。在下载完预编译工具链或者你自己构建完成后，将Emscripten编译环境添加到当前shell环境中，输入：
```
$ source ./emsdk_env.sh --build=Release
```
此条命令添加相关的环境变量和目录到PATH中，使得当前终端很容易的找到编译工具。

在Windows下 把上面所有命令中的 `./emsdk`替换为 `emsdk`， `source ./emsdk_env.sh`替换为 `emsdk_env`。

如果你是使用 Visual Studio 2017 ，在`emsdk install`命令后面添加一个参数 `--vs2017`

## 编译执行一个简单的程序
现在有一个完整的工具链来编译简单的程序为webAssembly。但是下面还有几个说明：
+ 需要使用`emcc`的 `-s WASM=1`选项。否则`emcc`默认编译为asm.js;
+ 如果要使Emscripten生成除了Wasm二进制文件和JavaScript包装文件外的可执行HTML文件，需要指定一个以 `.html`结尾的输出文件；
+ 最后，不能在浏览器里通过file://协议简单的打开HTML文件，因为在`file`协议里跨源请求时不被允许的，需要通过一个http服务来打开文件。

下面的命令创建和编译一个简单的“hello world”程序：
```
$ mkdir hello
$ cd hello
$ touch hello.c
$ echo '#include <stdio.h> int main(int argc, char ** argv) {  printf("Hello world!");}' > hello.c
$ emcc hello.c -s WASM=1 -o hello.html
```
可以g通过Emscript SDK的 `emrun`来提供一个http服务：
```
$ emrun --no_browser --port 8000 ./
```
当http服务运行起来，可以从浏览器打开,[地址为: http://localhost:8000/hello.html](http://localhost:8000/hello.html)，如果你在Emscripten 控制台看到“Hello world!”,那么恭喜你已经成功的编译webAssembly!

## 一点思考
对于办公来说，首选的时Windows或OSX，但OSX太贵了，所以Windows用的还是挺多的，我遇到好多的工具在Windows下的使用都依赖Visual Studio，但是Visual Studio实在是太笨重了，我特别厌恶，之后遇到了WSL 即Windows子系统，在里面可以安装好几种Linux系统，用起来特别流畅，比虚拟机好用多了，我觉得这个微软的这个功能特别赞。

WebAssembly文件加载常会碰都WebAssembly因为MIME 不是 wasm类型而无法编译问题，可以查看自己的服务器软件里有么有 Application/wasm类型。

## nginx配置 MIME类型
找到nginx的配置文件所在目录，我的在`/etc/nginx/`下，里面有个mime.types文件，为了不弄乱排序结构，找到 application/v**** 和 application/x****的配置项中间加一行 `application/wasm   wasm;`,保存后重启nginx `systemctl restart nginx`

```
// 配置后的一部分内容
..................
application/vnd.google-earth.kmz   kmz;
application/wasm                   wasm;
application/x-7z-compressed        7z;
....................
```
使用 `curl -I url`查看服务器响应的头部信息。
