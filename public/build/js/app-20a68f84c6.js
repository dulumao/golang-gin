$(function(){function e(e){$(e).on("click",".disabled",function(){$("#ajax-status").text("已经没有了。"),$("#ajax-status").show(),$("#ajax-status").fadeOut(2e3)})}function i(e){$("html, body").animate({scrollTop:$(e).offset().top-100},1e3)}$("#ajax-status").click(function(){$(this).hide()}),$(".disabled").click(function(){$("#ajax-status").text("已经没有了。"),$("#ajax-status").show(),$("#ajax-status").fadeOut(2e3)}),$("#send").click(function(){var e=$("#content").val(),i=e.replace(/\ +/g,"");if(""==e||""==i)return $("#content").val("").attr("placeholder","老大，我很饿...."),!1;$("#message-form").submit()});var a=[];$(".get-comments").click(function(){var i=$(this).parent().next();i.is(":hidden")?i.show():i.hide();var t=$(this).parent().attr("data-id");-1==$.inArray(t,a)&&($.ajax({type:"get",url:"/article/get-comments/"+t,dataType:"json",success:function(i){var a="";return $(i.comments).each(function(e,i){a+='<div><span class="author"><i class="fa fa-user" aria-hidden="true"></i> 匿名用户 &nbsp;&nbsp;<i>'+i.Created_at+"</i></span><p>"+i.Comment+"</p><hr></div>"}),$("#"+i.id).prev().html(a),1==i.all_page?void $("#"+i.id).children("div").hide():1==i.current_page?($("#"+i.id).children("div").children("span").removeClass("disabled"),$("#"+i.id).children("div").children(".comment-prev").addClass("disabled"),void e($("#"+i.id).children("div"))):i.current_page==i.all_page?($("#"+i.id).children("div").children("span").removeClass("disabled"),$("#"+i.id).children("div").children(".comment-next").addClass("disabled"),void e($("#"+i.id).children("div"))):void 0},error:function(e){console.log(e)}}),a.push(t))}),$(".comment-next, .comment-prev").click(function(){if(!$(this).is(".disabled")){var a=$(this).parent().parent().attr("id"),t=$(this).parent().parent().data("currpage");if($(this).is(".comment-next"))var n=Number(t)+1;else var n=Number(t)-1;$.ajax({type:"get",url:"/article/get-comments/"+a+"?page="+n,dataType:"json",success:function(a){var t="";return $(a.comments).each(function(e,i){t+='<div><span class="author"><i class="fa fa-user" aria-hidden="true"></i> 匿名用户 &nbsp;&nbsp;<i>'+i.Created_at+"</i></span><p>"+i.Comment+"</p><hr></div>"}),$("#"+a.id).prev().html(t),1==a.all_page?void $("#"+a.id).children("div").hide():1==a.current_page?($("#"+a.id).children("div").children("span").removeClass("disabled"),$("#"+a.id).children("div").children("a").text(a.current_page),$("#"+a.id).data("currpage",a.current_page),$("#"+a.id).children("div").children(".comment-prev").addClass("disabled"),e($("#"+a.id).children("div")),void i($("#"+a.id).parent().parent())):a.current_page>=a.all_page?($("#"+a.id).children("div").children("span").removeClass("disabled"),$("#"+a.id).children("div").children("a").text(a.current_page),$("#"+a.id).data("currpage",a.current_page),$("#"+a.id).children("div").children(".comment-next").addClass("disabled"),e($("#"+a.id).children("div")),void i($("#"+a.id).parent().parent())):void 0},error:function(e){console.log(e)}})}}),$(".btn-comment").click(function(){var e=$(this).prev().val(),i=$(this).parent().attr("id"),a=e.replace(/\ +/g,"");if(""==e||""==a)return $(this).prev().val("").attr("placeholder","请写下你的评论"),!1;$.ajax({type:"post",url:"/article/add-comment",headers:{"X-CSRF-TOKEN":$("input[name=_csrf]").val()},dataType:"json",data:{comment:e,article_id:i},success:function(e){$("#"+e.id).children("input").val(""),$("#"+e.id).prev().append('<div><span class="author"><i class="fa fa-user" aria-hidden="true"></i> 匿名用户 &nbsp;&nbsp;<i>'+e.created_at+"</i></span><p>"+e.comment+"</p><hr></div>");var i=$("#"+e.id).parent().prev().find("i:last");i.text(Number(i.text())+1)},error:function(e){console.log(e)}})}),$("#form-register").validate({rules:{"昵称":{required:!0,minlength:4,maxlength:15},"邮箱":{required:!0,email:!0},"密码":{required:!0,minlength:6},"密码确认":{required:!0,minlength:6,equalTo:"#password"}},messages:{"昵称":{required:"不能为空",minlength:"至少4个字符",maxlength:"最多15个字符"},"邮箱":{required:"不能为空",email:"请填写正确的格式 如：name@domain.com"},"密码":{required:"不能为空",minlength:"至少6位"},"密码确认":{required:"不能为空",minlength:"至少6位",equalTo:"两次密码不相同"}}})}),$(".btn-thx").click(function(){var e=$(this).children("i:last-child"),i=$(this).parent().attr("data-id");e.text(Number(e.text())+1),$(this).unbind("click"),$.get("/article/add-thank/"+i)});