# js实现复制功能
> 2017-03-23 下午

在一些涉及到个人信息比较多的h页面，经常可能会出现复制账号到剪切板的功能，那么怎么用js怎么实现复制粘贴功能呢？正好最近开发的模块中又有一个这样的功能，总结一下，方便后面使用。

## 效果图
![](http://images2015.cnblogs.com/blog/834823/201703/834823-20170323111958783-179853315.gif)

## 核心代码

		<input type="hidden" id="forCopy" value="microman756">
		
		require(['clipBoard'],function(clipBoard){
		    var el = document.getElementById('forCopy'),
		        clip = new clipBoard(el, {
		        copy: function() {
		            return el.value;
		        },
		        afterCopy: function() {
		            $.tip({content: '复制成功'})
		        }
		})

这里require了一个js插件，插件里实现了复制（copy）、剪切（cut）、粘贴（paste）三个方法，备份到github：[https://github.com/helijun/component/tree/master/clipBoard](https://github.com/helijun/component/tree/master/clipBoard)


<link rel="stylesheet" href="../../../static/github.css">
<script src="../../../static/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>