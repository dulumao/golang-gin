$(function(){$(".btn-thx").click(function(){var t=$(this).children("i:last-child");t.text(Number(t.text())+1),$(this).unbind("click")}),$("#send").click(function(){var t=$("#content").val(),n=t.replace(/\ +/g,"");if(""==t||""==n)return $("#content").val("").attr("placeholder","我需要内容..."),!1;$("#message-form").submit()})});