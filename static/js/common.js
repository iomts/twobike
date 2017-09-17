;(function(win){
	"use strict";
	//全局变量 >> TWOBIKE
	var TWOBIKE = {
	    //全局初始化函数
	    init: function(callback){
	        this.watch();
	        callback && callback();
	    },
	    //发送get请求
	    GET: function(options){
	        var self = this;
	        self.ajax(options,'get');
	    },
	    //发送post请求
	    POST: function(options){
	        var self = this;
	        self.ajax(options,'post');
	    },
	    ajax: function(opts,type){
	        var selfData = {
	                url: opts.url,//真实的url
	                params: JSON.stringify(opts.params)
	            };

	        if (opts.baseUrl) {//非跨域
	            selfData = opts.data;
	        }

	        $.ajax({
	            url: opts.baseUrl || URL.CORS,
	            data: selfData,
	            type: type,
	            async: opts.async,
	            beforeSend: function() {
	                opts.beforeSend && opts.beforeSend();
	            },
	            success: function(json) {
	                if(json){
	                    console.log(opts.baseUrl || opts.url,' ajax is successful',json);
	                    opts.success && opts.success(json);

	                    if(opts[json.status]){//区分不同的状态码回调函数
	                    	console.log(opts.baseUrl || opts.url,'ajax status is', json.status, '并已回调'+ json.status +'方法');
	                    	eval(opts[json.status])(json);
	                    }
	                }else{
	                    console.error(opts.baseUrl || opts.url,'ajax 数据返回格式异常');
	                    TWOBIKE.ajaxError();
	                }
	            },
	            error: function(){
	                console.error(opts.baseUrl || opts.url,' ajax is error');
	                opts.error != undefined ? opts.error() : TWOBIKE.commonError();
	            },
	            complete: function(XMLHttpRequest, textStatus) {
	                console.log(opts.baseUrl || opts.url,' ajax is complete');
	            },
	            timeout: opts.timeout || 20000
	        })
		},

		/**
         * 数据请求失败提示
         * @param  {[type]}
         * @return {[type]}         [description]
         */
        ajaxError: function(){
        	alert('请求失败，请稍后重试！');
        },

		/**
         * 通用的错误提示
         * @param  {[type]} element [待展示错误的dom]
         * @return {[type]}         [description]
         */
        commonError: function(element){
            console.error('出错');
		},
		
	    /**
	     * 通用的跳转页面
	     *
	     * target "_blank" 新窗口打开
	     * @return {[type]} [description]
	     */
	    openPage: function(href,target){
	    	if (target) {
	    		window.open(href, target)
	    	}else{
	    		//todo  暂定使用location.href 没有版本号
	    		window.location.href = href;
	    	}
		},
		
	    /**
	     * 去错误页面
	     */
	    toErrorPage: function(status){
	        this.openPage(URL.BASE + status);
	    },

		/**
		 * 加载css
		 */
		loadCss: function(url, callback){
			var link = document.createElement("link"); 
				link.type = "text/css"; 
				link.rel = "stylesheet"; 
				link.href = url; 

			document.getElementsByTagName("head")[0].appendChild(link); 
			
			callback && callback();
		},

	    /**
	     * 获取url后面的参数，优化后版本
	     * @param  {[type]} name [par]
	     * @return {[type]}
	     */
	    getUrlParameter: function(name){
	        var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
	            _regNext = window.location.search.substr(1).match(_reg);
	        if (_regNext != null) return decodeURI(_regNext[2]) || '';
	        else return '';
	    },

        /**
         * 通用的加载中动画
         */
        loadingShow: function(){
        	//TODO
        },

        /**
         * 加载中动画消失
         * @return {[type]} [description]
         */
	    loadingHide: function(){

        },

        noData: function(el){
        	var html = [
        		'<div class="weui-msg">',
			        '<div class="weui-msg__icon-area">',
			            '<i class="weui-icon-warn weui-icon_msg"></i></div>',
			        '<div class="weui-msg__text-area">',
			        '<p class="weui-msg__desc">暂无数据</p>',
			    '</div>',
			    '<div class="weui-msg__opr-area">',
			        '<p class="weui-btn-area">',
			          	'<a href="javascript:;" class="weui-btn weui-btn_default">返回</a>',
			        '</p>',
			    '</div>',
        	]

        	var cur = el ? $(el) : $('article');
        	cur.html(html.join(''));
        	console.log('没有数据');
        },

        /**
         * 动态渲染下拉框
         * data-kv : {"value":"id","name":"title,cid","space":"-"}
           data-from : /item/list?page=1&rows=20 注意url前面有/
           返回数据必须是CRARESULT格式
         * @param  {[type]} element [description]
         * @return {[type]}         [description]
         */
        renderSelect: function(element){
        	var el = element || 'select',
        		thisSpace = ',';

        	var keyValue = JSON.parse($(el).attr('data-kv')) || '';
        	if(!keyValue){
        		console.info('请配置好正确的渲染下拉框字段，如{"value":"id","name":"title,cid","space":"-"}')
        		return;
        	}

        	TWOBIKE.GET({
        		async: false,
                baseUrl: URL.BASE + $(el).attr('data-from'),
                beforeSend: function(){
                    TWOBIKE.loadingShow()
                },
                success: function(json){
                    if(json && json.status == CODE.SUCCESS){
                    	/*var data = '{"data":[{"id":5365634,"title":"阿尔卡特 (OT-927) 炭黑 联通3G手机 双卡双待1","cid":560,"status":1},{"id":536563,"title":"阿尔卡特 (OT-927) 炭黑 联通3G手机 双卡双待","cid":560,"status":1}]}';
                        	json = JSON.parse(data);
*/
	                    var optionsHtml = [];
	                    $(json.data).each(function(index, el) {
	                    	var optionName = '';
	                    	if(keyValue.name.indexOf(thisSpace) > -1) {
	                    		$(keyValue.name.split(thisSpace)).each(function(index2, el2){
	                    			optionName += (el[el2] + (index2 == keyValue.name.split(thisSpace).length - 1 ? '': el[el2] + keyValue.space))
	                    		})
	                    	}else{
	                    		optionName += el[keyValue.name]
	                    	}
	                    	optionsHtml.push('<option value="'+ el[keyValue.value] +'" ' + (index == 0?'select':'') +'>'+ optionName +'</option>')
	                    });
	                    $(el).html(optionsHtml.join(''));
                    }
                },
                error: function(){
                    TWOBIKE.commonError()
                }
            })
        },

	    //所有全局事件监听
	    watch: function(){
	        var self = this;

	        //ajax 错误监听
	        $(document).on('ajaxError', function(e, xhr, options){
	            var status = xhr.status;
	            /*if (404 == status) {
	                self.openPage(404)
	            }else if(500 == status){
	                self.openPage(500)
	            }*/
	        })
	    }
	}

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function() {
			return TWOBIKE;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = TWOBIKE;
		module.exports.TWOBIKE = TWOBIKE;
	} else {
		win.TWOBIKE = TWOBIKE;
	}

})(window)
