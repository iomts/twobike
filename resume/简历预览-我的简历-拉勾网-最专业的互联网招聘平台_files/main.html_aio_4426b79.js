/*!mycenter/modules/common/js/common.js*/
;define("mycenter/modules/common/js/common",["require","exports","module"],function(){function a(a,c){$.colorbox({html:'<div id="uploadFile" class="popup"><table width="100%"><tr><td align="center"><h4 class="error_msg">'+a+'</h4></td></tr><tr><td align="center"><a href="javascript:;" class="btn_s">确&nbsp;定</a></td></tr></table></div>',title:c?c:"错误提示"})}var c=window.location.protocol+"//www.lagou.com";window.myresumeCommon=window.myresumeCommon||{requestTargets:{workShowSave:"/workShow/save.json",workShowDel:"/workShow/delws.json",skillSave:"/skillEvaluate/save.json",skillDel:"/skillEvaluate/delSkill.json",skillDelAll:"/skillEvaluate/delAllSkill.json",workUpload:"/workShow/uploadWorkPic.json",workCut:"/workShow/cutWorkPic.json",projectExpSave:"/projectExperience/save.json",projectExpDel:"/projectExperience/delProject.json",expectJobSave:"/expectJobs/expectJobs.json",myRemark:"/resume/intro.json",uploadLogo:"/workExperience/uploadLogo.json",photoUpload:"/resume/uploadPhoto.json",upCreateCompanyLogo:"/c/uploadPic.json",createCompanyCut:"/c/cutPic.json"},templates:{workShowOnline:['<div class="mr_wo_show" data-type="#{type}" data-id="#{id}">',"<div>",'<div class="mr_edit mr_c_r_t">','<i></i><em class="mr_edit_text" data-type="#{type}">编辑</em>',"</div>","</div>",'<div class="mr_self_site">','<a class="mr_self_sitelink" href="#{ahref}" target="_blank">',"#{href}","</a>","</div>",'<div class="mr_wo_preview ueditor_parse">',"#{desc}","</div>","</div>",'<form class="add_worksshow_form addWorksShowOnlineFormUpdate dn">','<div class="mr_add_work mr_addwork_online">','<div class="mr_worksshow_tab">','<span class="mr_wst_upimage disabled">上传图片</span>','<span class="mr_wst_uponline selected">在线作品</span>',"</div>",'<div class="mr_wo_show">','<div class="mr_self_site">','<a class="mr_self_sitelink" href="#{ahref}" target="_blank">',"#{href}","</a>","</div>",'<div class="mr_wo_preview ueditor_parse">',"#{desc}","</div>","</div>","<label>作品地址</label>",'<div class="mr_input_div mr_click_flag">','<input class="mr_btn workOnlineUrlUpdate" name="url" value="#{href}"/>',"</div>","<label>作品描述</label>",'<div id="workOnlineDescUpdate" class="wrap_editor">','<script id="ueditor_#{id}" type="text/plain" class="ueditor_updateonlineImage"></script>',"</div>",'<div class="mr_ope clearfixs">','<div class="mr_delete">','<div class="mr_delete_pop dn">',"<p>确定删除本条信息？</p>","<div>",'<span class="mr_del_ok">删除</span>','<span class="mr_del_cancel">取消</span>  ',"</div>","</div>","<span>删除本条</span>","</div>",'<input type="submit" class="mr_save" value="保存">','<a href="javascript:;" class="mr_cancel">取消</a>',"</div>","</div>","</form>"].join(""),workShowUpload:['<div class="mr_wu_show" data-type="#{type}" data-id="#{id}">','<div class="mr_wu_t">','<a href="'+c+'/#{imageUrl}" target="_blank">','<img class="wh43" src="'+c+'/#{imgsrc}" alt="#{title}" data-origin-src="#{imageUrl}" data-cut-url="#{imgsrc}">',"</a>","</div>",'<div class="mr_wu_con">','<div class="clearfixs">','<div class="mr_content_l #{hasTitle}">','<div class="l2 maxWidth">','<span class="mr_work_title">[ #{title} ]</span>',"</div>","</div>",'<div class="mr_content_r">','<div class="mr_edit mr_c_r_t">','<i></i><em class="mr_edit_text" data-type="#{type}">编辑</em>',"</div>","</div>","</div> ",'<div class="mr_wu_con_m ueditor_parse">',"#{desc}","</div> ","</div>","</div>",'<form class="add_worksshow_form dn addWorksShowUploadFormUpdate">','<div class="mr_add_work mr_addwork_online">','<div class="mr_worksshow_tab">','<span class="mr_wst_upimage selected">上传图片</span>','<span class="mr_wst_uponline disabled">在线作品</span>',"</div>",'<div class="mr_worksshow_upimage">',"<div>","<i></i>","<span>上传作品图片</span>","</div>",'<input type="file" class="worksshow_up" id="worksshowUpUpdate_#{id}" name="workPic" title="目前仅支持10MB以内的PNG/JPG/JPEG/GIF图片" onchange="myresumeCommon.utils.imageUpload( this, myresumeCommon.requestTargets.workUpload, worksShowOperator.addUploadSucc, worksShowOperator.addUploadFail );" />','<img class="worksshowUpUpdateShow worksshow_img" src="" alt=""/>',"</div>","<label>作品标题</label>",'<div class="mr_input_div mr_click_flag">','<input class="mr_btn workUploadTitleUpdate" name="workTitle" value="#{title}"/>',"</div>","<label>作品描述</label>",'<div id="workImagesDescUpdate" class="mr_click_flag wrap_editor">','<script id="ueditor_#{id}" type="text/plain" class="ueditor_updateupdateImage"></script>',"</div>",'<div class="mr_ope clearfixs">','<div class="mr_delete">','<div class="mr_delete_pop dn">',"<p>确定删除本条信息？</p>","<div>",'<span class="mr_del_ok">删除</span>','<span class="mr_del_cancel">取消</span>  ',"</div>","</div>","<span>删除本条</span>","</div>",'<input type="submit" class="mr_save" value="保存">','<a href="javascript:;" class="mr_cancel">取消</a>',"</div> ","</div>","</form>"].join(""),skillItem:['<div class="mr_skill_con" data-grade="#{skillPercent}" data-skill-id="#{id}">','<span class="mr_skill_name" title="#{skillName}">#{skillName}</span>','<span class="mr_skill_plan">',"<em></em>","</span>",'<span class="mr_skill_delete"></span>','<span class="mr_skill_level">#{masterLevel}</span>','<i class="mr_skill_circle"><em>#{masterLevel}</em></i>',"</div>"].join("")},config:{userPhotoSelector:{width:250,height:250},companyLogoSelector:{width:250,height:250},perImagSelector:{width:120,height:120},productImgSelector:{width:300,height:180},workShowSelector:{width:280,height:210},cutLogoImage:{width:360,height:360,bgColor:"#ccc",enableRotation:!1,enableZoom:!0,selector:{w:170,h:170,showPositionsOnDrag:!1,showDimetionsOnDrag:!1,centered:!0,bgInfoLayer:"#fff",borderColor:"#02d1a1",animated:!1,maxWidth:358,maxHeight:358,borderColorHover:"#02d1a1"},image:{source:"",width:0,height:0,minZoom:10,maxZoom:300}},cutImage:{width:360,height:360,bgColor:"#ccc",enableRotation:!1,enableZoom:!0,selector:{w:250,h:250,showPositionsOnDrag:!1,showDimetionsOnDrag:!1,centered:!0,bgInfoLayer:"#fff",borderColor:"#02d1a1",animated:!1,maxWidth:358,maxHeight:358,borderColorHover:"#02d1a1"},image:{source:"",width:0,height:0,minZoom:10,maxZoom:300}},cutPerImage:{width:360,height:360,bgColor:"#ccc",enableRotation:!1,enableZoom:!0,selector:{w:120,h:120,showPositionsOnDrag:!1,showDimetionsOnDrag:!1,centered:!0,bgInfoLayer:"#fff",borderColor:"#02d1a1",animated:!1,maxWidth:358,maxHeight:358,borderColorHover:"#02d1a1"},image:{source:"",width:0,height:0,minZoom:10,maxZoom:300}},cutProductImage:{width:360,height:360,bgColor:"#ccc",enableRotation:!1,enableZoom:!0,selector:{w:300,h:180,showPositionsOnDrag:!1,showDimetionsOnDrag:!1,centered:!0,bgInfoLayer:"#fff",borderColor:"#02d1a1",animated:!1,maxWidth:358,maxHeight:358,borderColorHover:"#02d1a1"},image:{source:"",width:0,height:0,minZoom:10,maxZoom:300}},tinymce:{script_url:c+"/js/tinymce/jscripts/tiny_mce/tiny_mce.js",theme:"advanced",language:"zh-cn",plugins:"paste,autolink,lists,style,layer,save,advhr,advimage,advlink,iespell,inlinepopups,preview,media,searchreplace,contextmenu,fullscreen,noneditable,visualchars,nonbreaking",theme_advanced_buttons1:"bullist,numlist",theme_advanced_toolbar_location:"top",theme_advanced_toolbar_align:"left",theme_advanced_statusbar_location:"none",theme_advanced_resizing:!1,paste_auto_cleanup_on_paste:!0,paste_as_text:!0,auto_cleanup_word:!0,paste_remove_styles:!0,contextmenu:"copy cut paste",force_br_newlines:!0,force_p_newlines:!1,apply_source_formatting:!1,remove_linebreaks:!1,convert_newlines_to_brs:!0,content_css:c+"/js/tinymce/examples/css/content.css",template_external_list_url:"lists/template_list.js",external_link_list_url:"lists/link_list.js",template_replace_values:{username:"Some User",staffid:"991234"},onchange_callback:function(a){tinyMCE.triggerSave();var c=tinyMCE.get(a.id).getContent();c.length>20&&$("#"+a.id).valid()}}},errorTips:function(a,c,_){_=_||2e3,1!=a.data("errortipspending")&&(a.text(c),a.show(),a.data("errortipspending",1),window.setTimeout(function(){a.hide(),a.data("errortipspending",0)},_))},utils:{imageUpload:function(c,_,v,h){c=$(c);var w=c.attr("id"),g=c.attr("title"),b="text",k={};this.AllowExt=".jpg,.gif,.jpeg,.png,.pjpeg",this.FileExt=c.val().substr(c.val().lastIndexOf(".")).toLowerCase(),0!=this.AllowExt&&-1==this.AllowExt.indexOf(this.FileExt)?(a(g),$("input[type = 'file']").val("")):$.ajaxFileUpload({url:_,secureuri:!1,fileElementId:w,data:k,dataType:b,success:function(c){"text"==b&&(c=$.parseJSON(c)),c.success?v&&v(c.content,w):(h&&h(1),a(g,"错误提示"))},error:function(c){h&&h(c),a("支持jpg、jpeg、gif、png格式，文件小于10M","错误提示")}})},unset:function(a){$.each(a,function(c){a[c]=null})},strFormat:function(a,c){a=String(a);var _=Array.prototype.slice.call(arguments,1),v=Object.prototype.toString;return _.length?(_=1==_.length&&null!==c&&/\[object Array\]|\[object Object\]/.test(v.call(c))?c:_,a.replace(/#\{(.+?)\}/g,function(a,c){var h=_[c];return"[object Function]"==v.call(h)&&(h=h(c)),"undefined"==typeof h?"":h})):a},requester:function(a,c){a.dataType=a.dataType||"json",a.type=a.type||"POST",a.data=a.data||{},a.data.resubmitToken=globals.token,$.ajax(a).done(function(a){null!=a.resubmitToken&&""!=a.resubmitToken&&(globals.token=a.resubmitToken),c&&c(a)})},addHttpPrefix:function(a,c,_){a=a.split("|");for(var v=a[0],i=0,h=a.length;h>i;i++)if(a[i]===c.substring(0,a[i].length))return;_(v+c)},errorTips:function(a,c,_){_=_||2e3,1!=a.data("errortipspending")&&(a.text(c),a.show(),a.data("errortipspending",1),window.setTimeout(function(){a.hide(),a.data("errortipspending",0)},_))},throttle:function(a,c,_,v){_=void 0==_?null:_,a.tId&&clearTimeout(a.tId),a.tId=setTimeout(function(){a.apply(_,c)},v?v:140)},inputerListener:function(a,c){var _=0;if("onpropertychange"in a[0]&&$.browser.ie&&parseInt($.browser.version<=8))a.bind("propertychange",function(e){"value"==e.originalEvent.propertyName&&myresumeCommon.utils.throttle(c,[a.val()],_)});else if($.browser.ie&&9==$.browser.version){var v,h=a.val();a.bind("focus",function(){v=window.setInterval(function(){var v=a.val();v!=h&&(h=v,myresumeCommon.utils.throttle(c,[h],_))},50)}),a.bind("blur",function(){window.clearInterval(v),v=void 0})}else a.bind("input",function(){myresumeCommon.utils.throttle(c,[a.val()],_)})}}};var _="paiRecTip",v=$("#pai_top_tip").find(".tip_close");v.on("click",function(){$("#pai_top_tip").hide(),$.cookie(_,"0",{expires:365})}),$("body").on("click","a.btn_s",function(){$.colorbox.close(),parent.jQuery.colorbox.close()}),$(".inline").colorbox({inline:!0}),$(".errorTips").click(function(){a("上传附件格式错误!")})});
/*!mycenter/modules/preview/preview/main.js*/
;define("mycenter/modules/preview/preview/main",["require","exports","module","dep/jquery-colorbox/jquery.colorbox","mycenter/modules/common/js/common"],function(require){function a(){var a=$(".mr_sns a");a.eq(a.length-1).addClass(),a.each(function(){{var a=$(this).data("sns"),c=$(this),v=c.find("span");v.find("em")}switch(parseInt(a)){case 1:var h=document.createTextNode("Twitter");c.addClass("sns1");break;case 2:var h=document.createTextNode("Dribbble");c.addClass("sns2");break;case 3:var h=document.createTextNode("Behance");c.addClass("sns3");break;case 4:var h=document.createTextNode("LinkedIn");c.addClass("sns4");break;case 5:var h=document.createTextNode("Quora");c.addClass("sns5");break;case 6:var h=document.createTextNode("Github");c.addClass("sns6");break;case 7:var h=document.createTextNode("知乎");c.addClass("sns7");break;case 8:var h=document.createTextNode("LOFTER");c.addClass("sns8");break;case 9:var h=document.createTextNode("UI中国");c.addClass("sns9");break;case 10:var h=document.createTextNode("新浪微博");c.addClass("sns10");break;case 11:var h=document.createTextNode("SegmentFault");c.addClass("sns11");break;case 12:var h=document.createTextNode("StackoverFlow");c.addClass("sns12")}v.prepend($(h)).css("marginLeft",-(v.width()+20)/2+"px")})}require("dep/jquery-colorbox/jquery.colorbox"),require("mycenter/modules/common/js/common");var c=$(".mr_jobe_list .l2 .projectTitle");c.each(function(){var a=$(this),c=a.width();a.find("span").css("left",c+5)}),$(".a").hover(function(){var a=$(".birth_span"),c=$.trim(a.text()),v=$(".a");""!=c&&"年出生"!=c?(a.removeClass("dn"),v.css("cursor","pointer")):v.css("cursor","default")},function(){setTimeout(function(){var a=$(".birth_span");a.addClass("dn")},90)});var v=parseInt($("#customBlock .cust_title").width())/2;$("#customBlock .cust_title").css("margin-left",-v-10),$(".mr_sns")&&$(".mr_sns a").length>0&&a(),$(".mr_sns a").hover(function(){$(this).find("span").show()},function(){$(this).find("span").hide()}),$(document).click(function(){$(".mr_down_tip").hide()}),$(".mr_down").bind("click",function(e){e.stopPropagation();var a=$(".mr_down_tip");a.is(":hidden")?a.show():a.hide()}),$(".mr_down_tip li").bind("click",function(e){e.stopPropagation(),$(".mr_down_tip").addClass("dn")}),$(".mr_down_tip li").hover(function(){$(".mr_down_tip li.active").removeClass("active"),$(this).addClass("active")},function(){$(".mr_down_tip li.active").removeClass("active"),$(this).removeClass("active")}),$(".mr_skill_con .mr_skill_plan").each(function(){var a=$(this).attr("data-skillLevel"),c=$(this).outerWidth(),v=a/100*c;$(this).find("em").width(v+10)})});
/*!mycenter/page/preview/main.js*/
;define("mycenter/page/preview/main",["require","exports","module","mycenter/modules/preview/preview/main"],function(require){require("mycenter/modules/preview/preview/main")});