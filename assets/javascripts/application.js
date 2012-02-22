;(function(win, undefined){
	$(function(){
		//initialize data-original-title and data-content
		$(".milestones ul li .content").each(function(){
			$(this).parent().attr("data-original-title", $(this).html());
		});
		$(".milestones ul li").popover({
			    content: "<a href='http://baidu.com/'>goddyzhao</a>"
			  , placement: "bottom"
			});
		return;
		$(".milestones ul li")
			.hover(function(e){
				$(this).parent().parent().parent().addClass("active");
			}, function(e){
				$(this).parent().parent().parent().removeClass("active");
			});
		 
	});
	
})(window);
