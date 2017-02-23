var _VER = (new Date()).getTime();//开发，测试环境
//_VER = 2016120005;//生产环境
require.config({
	urlArgs: "v=" +  _VER,
	baseUrl : "./",
    paths: {
    	jquery:'component/jquery/jquery-3.1.0.min',
        fastclick: 'component/jquery/fastclick',
        artTemplate: 'component/template/artTemplate-3.0',
        common: 'js/common',
        li: 'li/li-1.1.0',
        liAlert: 'li/li-alert',//常用弹框组件
    },
    shim: {
        li: {
            deps: ['jquery'],
            exports: '$'
        }
    }
});