
## 效果
首先看下效果，这是在h5页面中常见的一中文字展现方式，那么是怎么实现的呢？其实很简单

![文字逐个出现](http://upload-images.jianshu.io/upload_images/2166524-6ec3f7a1d436f462.gif?imageMogr2/auto-orient/strip)


## 思路
用一个定时器将预制的文字通过.substring(0, i)方法不断的赋给要显示的区域，i在定时器里面迭代累加，当预制的文字跟显示区的文字相同时，清除定时器。

## 核心代码

#### html

    <div class="page">
        <p class="li-none" id="page2Txt">
        深圳达农保险经纪有限公司成立于2016年5月，总部设立于深圳，立足打造农村互联网保险平台，首期注册资本5000万人民币，是诺普信农化股份有限公司控股的保险经纪服务商。达农保险将一直秉持“保险基于需求”的理念，以国家农业现代化的发展趋势为导向，积极发挥保险经纪金融工具的特有优势，以创新的模式，深入三农，为农业的现代化发展提供保障。展望未来，达农保险将以金融手段持续附着产业共同发展。
        </p>
        <div class="el-page2 li-none">
            <h1 class="page2-title">公司介绍</h1>
            <p class="fenge-solid"></p>
            <p class="page2-txt" id="page2TxtShow"></p>
        </div>
    </div>

#### js

    var page2Txt = document.getElementById('page2Txt'),
        page2TxtShow = document.getElementById('page2TxtShow'),
        i = 0,
        timer = setInterval(function(){
        	page2TxtShow.innerHTML = page2Txt.innerHTML.substring(0, i);
            i++;
            if(page2TxtShow.innerHTML == page2Txt.innerHTML){
                clearInterval(timer);
            };
        },60);


<link rel="stylesheet" href="../../../static/github.css">
<script src="../../../static/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>