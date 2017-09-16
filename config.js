var _VER = (new Date()).getTime();//开发，测试环境
//_VER = 2016120005;//生产环境
require.config({
	urlArgs: "v=" +  _VER,
	baseUrl : "/static/",
    paths: {
        jquery:'component/jquery/jquery-3.1.0.min',
        zepto: 'plugin/amazeui/js/zepto.min',
        fastclick: 'component/jquery/fastclick',
        amazeui: 'plugin/amazeui/js/amazeui.min',
        fullpage: 'plugin/fullpage/fullpage',
        artTemplate: 'component/template/artTemplate-3.0',
        underscore: 'plugin/underscore/underscore',
        common: 'js/common',
        li: 'li/li-1.1.0',
        liAlert: 'li/li-alert',//常用弹框组件
    },
    shim: {
        li: {
            deps: ['jquery'],
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        fullpage: {
            deps: ['jquery','css!plugin/fullpage/fullpage'],
            exports: '$'
        }
    }
});