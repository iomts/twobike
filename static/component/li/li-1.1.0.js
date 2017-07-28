/**
 * liui js v1.1.0
 * @author helijun
 * description 依赖jquery或者zepto，集成了
 * 弹框组件
 */
;(function($){
    var $body = $('body');
    
    $.toptip = function(opts){
        var defaultOpts = {
                content: '',//内容  文字 || html
                type: 'info',//提示类型
                closeTime: 2000,
                callback: function(){},
                effect: 'fadeIn'
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        if(opts.type === 'info'){
            opts.content = '<span>'+ opts.content +'</span>'
        }
     
        $body.append('<div class="li-tips-'+ opts.type +'" id="tipsMain">'+ opts.content +'</div>');

        setTimeout(function(){
            $('#tipsMain').remove();
            opts.callback && opts.callback();
        },opts.closeTime)
    }

    $.alert = function(opts){
        var defaultOpts = {
                title: '',//标题
                content: '',//内容  文字 || html
                height: 50,//默认屏幕（父级）的50%
                width: 80,//默认屏幕（父级）的80%
                type: 'default',//弹框类型，transparent 透明、没有边距，铺满
                effect: 'fadeIn',//出现效果，默认下跌落
                delayTime: 500,//效果延时时间，默认.5s
                autoClose: false,//自动关闭
                autoTime: 2000, //自动关闭时间默认2s
                autoEffect: 'default',//关闭效果
                buttons: [
                    {
                        text: '知道了',
                        color: '#ff1c0b',
                        onclick: function(){}
                    }
                ],
                okShow: false,
                ok: '确定',
                okCallback: function(){},//确定回调
                cancelShow: false,
                cancel: '取消',
                cancelCallback: function(){},//取消回调
                before : function() {
                    console.log('before')
                }, 
                close: function() {
                    console.log('close')
                },
                blankclose: false//空白处点击关闭
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        opts.before && opts.before();

        var titleHtml = '',
            contentHtml = '',
            btnHtml = '',
            btnClass = 'li-col-' + parseInt(100/opts.buttons.length);

        //标题
        opts.title && (titleHtml = '<div class="li-dialog-title">'+ opts.title +'</div>')

        //内容
        if(opts.type === 'transparent'){
            contentHtml = opts.content;
        }else{
            contentHtml = '<div class="li-dialog-txt">'+ opts.content +'</div>';
        }

        //按钮
        opts.buttons.forEach(function(element){
            btnHtml += '<div class='+ btnClass +' style="color:'+ element.color +'">'+ element.text +'</div>'
        })

        var alertHtml = [
                '<section class="li-dialog" id="dialogMain">',
                    '<div class="li-mask" id="alertMask"></div>',
                    '<div class="li-dialog-content '+ opts.type +'" id="dialogContent">',
                    titleHtml,
                    contentHtml,
                    '<div class="li-row li-dialog-footer">'+ btnHtml +'</div>',
                    '</div>',
                '</section>'
            ]

        $body.append(alertHtml.join(''))

        var $dialogContent = $('#dialogContent'),
            $dialogMain = $('#dialogMain');

        $dialogContent.css({
            'height': opts.height + '%',
            'top': (100 - opts.height)/2 + '%',
            'width': opts.width + '%',
            'left': (100 - opts.width)/2 + '%'
        })

        $('#alertMask').css({
            '-webkit-animation-duration' : opts.delayTime/1000 + 's'
        })

        var effect = {
            'fadeIn': 'top',
            'fadeInStart': '-100%',
            'fadeInValue': (100 - opts.height)/2 + '%',
            'sideLeft': 'left',
            'sideLeftStart': '-100%',
            'sideLeftValue': (100 - opts.width)/2 + '%',
            'scale': '-webkit-transform',
            'scaleStart': 'scale(0)',
            'scaleValue': 'scale(1)',
            'info': '-webkit-transform',
            'infoStart': 'scale(1.2)',
            'infoValue': 'scale(1)'
        }

        setTimeout(function(){
            $dialogContent.css(effect[opts.effect],effect[opts.effect + 'Start']).show();

            setTimeout(function(){
                $dialogContent.css(effect[opts.effect], effect[opts.effect + 'Value'])
                opts.close && opts.close()
            },10)
        },opts.delayTime)

        if(opts.blankclose) {
            $('#dialogMain :not(#dialogContent)').on('click',function(event){
                $dialogMain.remove()
                opts.close && opts.close()
                event.stopPropagation()
                event.preventDefault()
            })
        }

        if(opts.autoClose && opts.autoTime > 0) {
            setTimeout(function(){$dialogMain.remove()},opts.autoTime)
            opts.close && opts.close()
        }
    }
})(jQuery || Zepto)