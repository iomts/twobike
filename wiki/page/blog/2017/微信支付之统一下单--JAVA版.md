# 微信支付之统一下单--JAVA版
> 都说微信支付有些坑，都抱怨微信支付的文档太烂，一会APPId，一会商户id，还有appsecret，支付API秘钥让你傻傻分不清楚，还有这里大写那里小写，几种标准，让你眼花缭乱。没错，这就是很多技术团队都存在的问题，没有统一的标准！且团队越大越严重，即使是在微信这样的顶尖团队。然而这些在一番痛苦折腾之后，最后都会不值一提。**这里只详细讲JSAPI方式的公众号支付**


## 简要思路图
![](http://upload-images.jianshu.io/upload_images/2166524-9f1b66f15685ae94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 配置支付授权目录
有点类似授权回调安全域名的韵味，需要将支付的页面路径添加到授权目录里面，否则再页面调起支付时会报没有添加支付目录的错误
![](http://upload-images.jianshu.io/upload_images/2166524-13686702ef80d6f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

配置地址： 微信公众平台-微信支付-开发配置

## 获取openid
[参考之前的微信授权文章](http://www.cnblogs.com/liliangel/p/6045201.html)

## 统一下单
通常情况下是自身系统生成订单后进入支付页面，用户点击支付触发一个请求，将订单id、openid传给后台微信统一下单接口，后台根据订单id在自身系统查询一遍，获得价格、描述详情等信息

#### 一次签名，发送xml报文给微信服务器

```
String nonceStr = "5K8264ILTKCH16CQ2502SI8ZNMTM67VS";//暂时不变
    
// 加密，这里只列举必填字段
Map<String, String> map = new HashMap<String, String>();
map.put("body", body);//商品描述
map.put("mch_id", MCHID);//商户平台id
map.put("appid", WX_APPID);//公众号id
map.put("nonce_str", nonceStr);//随机字符串
map.put("notify_url", WX_PAY_CALLBACK);//异步回调api
map.put("spbill_create_ip", ip);//支付ip
map.put("out_trade_no", orderSn);//商品订单号
map.put("total_fee", (int) relAmount + "");//真实金额
map.put("trade_type", "JSAPI");//JSAPI、h5调用
map.put("openid", openid);//支付用户openid

String sign = WxPaySignatureUtils.signature(map, WX_PAY_KEY);

String xml = "<xml>" +
    	        "<appid>"+ WX_APPID +"</appid>"+
    	        "<body>"+ body +"</body>"+
    	        "<mch_id>"+ MCHID +"</mch_id>"+
    	        "<nonce_str>"+ nonceStr +"</nonce_str>"+
    	        "<notify_url>"+ WX_PAY_CALLBACK +"</notify_url>"+
    	        "<openid>"+ openid +"</openid>"+
    	        "<out_trade_no>"+ orderSn +"</out_trade_no>"+
    	        "<spbill_create_ip>"+ ip +"</spbill_create_ip>"+
    	        "<total_fee>"+ (int) relAmount + "" +"</total_fee>"+
    	        "<trade_type>JSAPI</trade_type>"+
    	        "<sign>"+ sign +"</sign>"+
    	     "</xml>";

LOGGER.info("发送给微信的报文：" + xml);
LOGGER.info("加密后的的签名字符串：" + sign);

// 请求
String response = "";
try {
    response = apiService.doPostString(WX_UNIFIEDORDER, xml);
} catch (Exception e) {
    //TODO
    return null;
}
LOGGER.info("请求/pay/unifiedorder下单接口后返回数据：" + response);
//处理请求结果
XStream s = new XStream(new DomDriver());
s.alias("xml", WechatOrder.class);
WechatOrder order = (WechatOrder) s.fromXML(response);

if ("SUCCESS".equals(order.getReturn_code()) && "SUCCESS".equals(order.getResult_code())) {
	LOGGER.info("微信支付统一下单请求成功，获得的Prepay_id是：" + order.getPrepay_id());
} else {
	LOGGER.error("微信支付统一下单请求错误：" + order.getReturn_msg() + order.getErr_code());
	//TODO
    return null;
}

```
注：
1. WX_UNIFIEDORDER变量的地址是： https://api.mch.weixin.qq.com/pay/unifiedorder
2. relAmount 是实际支付的金额，实际项目中应该是根据订单号在自身系统查询后获得
3. body 是最终显示在支付凭证里面的【商品详情】
4. orderSn 是最终显示在支付凭证-交易记录 里面的【商户单号】，也就是自身系统的订单号

这个时候如果你看到下面的日志，恭喜你伟大的第一步已经完成了，可以小憩喝杯咖啡再来哈哈
```
11:46:25.170 INFO  com.cramix.portal.service.WechatService 451 createOrder - 请求/pay/unifiedorder下单接口后返回数据：<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg><appid><![CDATA[wx8daca08d2f87216f]]></appid><mch_id><![CDATA[1482800922]]></mch_id><nonce_str><![CDATA[mjIbwmjLNFcD5tAF]]></nonce_str><sign><![CDATA[65EFB7B0BACBA01163765EB28B4E3F31]]></sign><result_code><![CDATA[SUCCESS]]></result_code><prepay_id><![CDATA[wx201706291146256b14b6eb620242392023]]></prepay_id><trade_type><![CDATA[JSAPI]]></trade_type></xml>
11:46:25.179 INFO  com.cramix.portal.service.WechatService 459 createOrder - 微信支付统一下单请求成功，获得的Prepay_id是：wx201706291146256b14b6eb620242392023

```

当然，更多的时候不会有这么顺利，大多数人都会遇到**签名错误**的状态返回，微信确实是很喜欢用签名，签名错误这个四个字估计把所有的微信开发者都折磨了一遍，没有经历过签名错误的程序员不是真正的微信开发者。

然而，签名错误该怎么解决呢？通常情况下注意有三：
1. 发送给微信的xml报文格式、字段有误。body字段如有中文一定要在请求里面加上这句：

```
HttpPost post = new HttpPost(uri);
post.setEntity(new StringEntity(str,"utf-8"));
```

1. 加密算法是否有误，参考[WxPaySignatureUtils](https://github.com/helijun/documents/blob/master/util/WxPaySignatureUtils.java)
2. 确认商户平台API秘钥（仔细阅读微信支付申请成功后发过来的邮件，点击【下载API证书、设置API密钥】）

#### 二次签名
当你喝完那杯“甜”的咖啡之后，就要撸接下来的代码了。将前端需要用的字段进行加密校验，并返回

核心代码如下：

```
HashMap<String, String> back = new HashMap<String, String>();
String time = Long.toString(System.currentTimeMillis());
back.put("appId", WX_APPID);
back.put("timeStamp", time);
back.put("nonceStr", nonceStr);
back.put("package", "prepay_id=" + order.getPrepay_id());
back.put("signType", "MD5");
String sign2 = WxPaySignatureUtils.signature(back, WX_PAY_KEY);
LOGGER.info("二次签名后返回给前端的签名证书字符串是：" + sign2);

JSONObject jsonObject = new JSONObject();
jsonObject.put("appId", WX_APPID);
jsonObject.put("timeStamp", time);
jsonObject.put("nonceStr", nonceStr);
jsonObject.put("package", "prepay_id=" + order.getPrepay_id());
jsonObject.put("signType", "MD5");
jsonObject.put("paySign", sign2);

LOGGER.info("二次签名后返回给前端的数据是：" + jsonObject.toJSONString());

```
到此为止，微信支付统一下单环节简单的后台代码已经码好了，只欠前端唤起支付了！
## 前端调起支付
这里有个巨坑，千万不要踩，微信公众平台技术文档-微信JSSDK里面的微信支付跟这里没有任何关系！**你只要看商户平台的文档！**，也就是通过WeixinJSBridge对象去调用，当然只在微信app里有用！


```
//统一下单
unifiedorder: function(){
    var self = this;
    var userInfo = localStorage.getItem('ssqf_h5_wxUserInfo');

    CRAMIX.POST({
        baseUrl: URL.BASE + '/api/wechat/pay/h5',
        data: {
            'openid': JSON.parse(userInfo).openid,
            'body':'书身祈福支付',
            'orderSn': $('#orderSn').val() || 20 ,
            'amount': $('#money').val() || '0.01'
        },
        success: function(data){
            self.options.unifiedorderData = data;
        }
    })
},

//支付
pay: function(){
    var self = this;

    var appId = self.options.unifiedorderData.appId;
    var timeStamp = self.options.unifiedorderData.timeStamp;
    var nonceStr = self.options.unifiedorderData.nonceStr;
    var package1 = self.options.unifiedorderData.package;
    var paySign = self.options.unifiedorderData.paySign;

    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId":appId,     //公众号名称，由商户传入
            "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":nonceStr, //随机串
            "package":package1,
            "signType":"MD5",         //微信签名方式：
            "paySign":paySign //微信签名
        },
        function(res){
            WeixinJSBridge.log(res.err_msg);
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                window.location.href = '/weixin/pay/pay-success.html';//去支付成功页面
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                $.toast("用户取消", "text");
            }else{
                $.toast("支付失败", "forbidden", function() {
                    window.location.reload();//刷新页面
                });
            }
        }
    );
},
```
授权获取openid这里就不多说了，amount为支付金额，我这里是为了方便测试改为了金额前端传输，实际肯定不是哈！当然金额有变之后需要重新走一遍统一下单的流程。

## 感悟
其实我们认为的所有坑大部分原因都是源自不细心，尽管文档等各种会让我们多走一些弯路，但是不能带着情绪去开发，遇到问题首先想自身不足，静下心来，写程序本身就需要有足够的耐心和十分的细心。去年做微信分享，也是有个签名，足足让我困了三天才搞定，有时候真的都怀疑人生了，但是最后都解决了，解决的那一瞬间，真的能感动自己！这回做微信支付，同样还是签名问题，也前前后后搞了差不多一天，当然这其中有很大部分原因是吸取了去年的经验，也就是上面所说。

## 参考资源
[微信公众平台支付接口调试工具](https://pay.weixin.qq.com/wiki/tools/signverify/)





<link rel="stylesheet" href="../../../static/github.css">
<script src="../../../static/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>