# 用docsify快速构建文档，并用GitHub Pages展示
> 2017-01-13 下午


## 什么是docsify
无需构建，写完 markdown 直接发布成文档，写说明文档的极佳选择。
## 快速上手
### 安装
> npm i docsify-cli -g
> docsify init docs

### 创建项目
新建一个空项目，接着创建一个 docs 目录并进入到 docs 目录下
> mkdir my-project && cd my-project
> mkdir docs && cd docs

### 创建入口文件
根目录下创建index.html 文件
    
    <!DOCTYPE html>
    	<html lang="en">
    	<head>
    	  <meta charset="UTF-8">
    	  <title>li.css</title>
    	  <meta name="description" content="Description">
    	  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    	  <link rel="stylesheet" href="../../../static/vue.css">
    	</head>
    	<body>
    	  <div id="app"></div>
    	</body>
    	<script src="../../../static/docsify.js" data-router data-repo="https://helijun.github.io/pages/docs/index.html"></script>
    	</html>


### 预览
> docsify serve docs

docsify自动监听3000端口，浏览器输入 [http://localhost:3000]( http://localhost:3000)
就可以看到你在README.md里面编辑的内容了

### 发布到 GitHub Page
将文档托管到github，这样就可以随时随地访问了。
新建一个仓库，在setting里面开启 GitHub Pages 功能，如图：

![](http://upload-images.jianshu.io/upload_images/2166524-f6fdfcdeebc67241.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

浏览器输入[https://helijun.github.io/pages/](https://helijun.github.io/pages/). 就可以看到你的文档了，当然如果你这个仓库包含了其他的文档的话 select source那里选择master branch，这样就不会影响其他文档的浏览，比如我的最终链接是 [https://helijun.github.io/pages/docs/index.html#/](https://helijun.github.io/pages/docs/index.html#/)，暂时存放LIUI的草稿文档

## 其他参考
官方文档：[https://docsify.js.org/zh-cn](https://docsify.js.org/zh-cn)

<link rel="stylesheet" href="../../../static/github.css">
<script src="../../../static/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>