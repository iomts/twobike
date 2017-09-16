# react-learn
react学习，持续集成，一直更新

```
mkdir react-learn
cd react-learn

npm install 

npm start
```
浏览器访问 localhost:404

## 2017-08-19
1. 工程构建
2. 添加webpack打包，编译jsx、scss
3. 集成了amazeui-touch，作为UI库

## 2017-08-20
1. 添加react-router，版本2.4.1

## 2017-08-24
1. 集成flux，Index组件点击 Default Buttom 改变第一个Group标题（手机号码）

## 2017-08-25
1. 使用nginx实现跨域 </br>
本机ip 192.168.1.168 </br>
cd  /nginx  </br>
start nginx.exe
2. 测试： Index组件点击 Default Buttom，触发ajax请求，代理到http://192.168.1.239:8080

## 2017-08-26
1. 添加了以前自己封装的LIUI，后续将在LIUI上继续添加更多项目开发中常用的方法
2. 使用li-ajax

## 2017-08-28
1. 开始重构达农移动端集市页面，完成sidler加载
2. 重新定义目录结构，参考小程序
3. 真正的页面开发中有许多坑要填，进度稍慢

## 2017-08-30
1. 统一页面路由文件，router.config.js
2. 添加通用带参路由转换
3. 添加404页面
4. 留下疑问：目录结构到底是按功能模块分（action、store、css、view全部放一个文件夹） 还是 按flux层次（action、store、view分别一个文件夹）划分较好？

## 2017-08-31
1. 完成个人中心页面
2. 添加通用的头部组件

## 2017-09-01
1. 完善路由配置
2. 完善头部组件配置，如显示、隐藏、icon、文字等
3. 删除原有的flux层次，正式使用按功能模块分目录（action、store、css、view全部放一个文件夹）

## 2017-09-04
1. 添加自定义input组件，button组件
2. 开发注册界面，使用自定义组件

## 2017-09-05
1. 完成tips自定义组件开发

## 2017-09-06
1. 阅读并修改部分amazeui NavBar，OffCanvasTrigger源码，深入理解子组件向父组件传值
2. 完成侧边栏组件集成

## 2017-09-11
1. 完成加载中组件
2. 完善登录功能
3. 重新定义跨域前缀