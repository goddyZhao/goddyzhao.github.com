;(function(win, undefined){
	$(function(){
		var templateSource = $("#page-template").html()
		  , template = Handlebars.compile(templateSource)
		  , templateUrl = "locales/#{language}.json"
		  , languageMap = {
			  	  zh: $("#hd .language li[data-language='zh']")
			  	, en: $("#hd .language li[data-language='en']")
		    }
		  , currentLanguage = "zh"
		  , $body = $("body");
		  
		
		function switchLanguage(language){
			$.getJSON(templateUrl.replace("#{language}", language), function(data){
				if(!data){ return; }
				render(data);
			});
		};
		
		function render(data){
			$body.fadeOut(function(){
				$("#bd").html(template(data));
				initPopover();
				$body.fadeIn(function(){
					$("#bd .avatar").css("z-index","101");
				});
			});
		};
		
		function initPopover(){
			//initialize data-original-title and data-content
			$(".milestones ul li .content").each(function(){
				var $this  = $(this)
				  , $li = $this.parent()
				  , details = $this.next(".details").html();
				$li.attr("data-original-title", $this.html());
				if(!!details){
					$li.attr("data-content", details)
				}
			});
			
			$(".milestones ul li").popover({
				    placement: "bottom"
				});
		}
		
		//bind events on the language triggers
		$("#hd .language").click(function(e){
			var $languageDom = $(e.target)
			  , language = $languageDom.attr("data-language");
			if(!language || currentLanguage === language){ return; }
			languageMap[currentLanguage].removeClass("active");
			languageMap[language].addClass("active");
			switchLanguage(language);
			currentLanguage = language;
		});

		/**
		 * Check whether the user agent is IE, if so, degrade to a pdf version
		 */
		function entryCheck(){
			if($.browser.msie){
				$body.html("Sorry")
				$body.fadeIn();
			}else{
				var template = [
					'<div class="degrade-info">'
				  ,   '<h1 class="title">很抱歉，我的简历在线浏览不支持您当前浏览器，您可以：</h1>'
				  ,   '<ul>'
				  ,     '<li>1. 下载 <a href="resumes/GoddyZhao-Resume-CN.pdf">简历PDF版</a></li>'
				  ,     '<li>2. 访问 <a href="http://blog.goddyzhao.me">我的博客</a></li>'
				  ,   '</ul>'
				  ,   '<h1 class="title">Sorry, online viewing of my resume doesn\' support your browser, you can: </h1>'
				  ,   '<ul>'
				  ,     '<li>1. Download <a href="resumes/GoddyZhao-Resume-EN.pdf">the PDF version of my resume</a></li>'
				  ,     '<li>2. Visit <a href="http://goddyzhaoen.tumblr.com">My Blog</a></li>'
				  ,   '</ul>'
				  , '</div>'
				].join("");
				$body.html(template);
				$body.fadeIn();
				return false;
			}
		};
		
		
		(function init(){
			if(entryCheck()){
				switchLanguage(currentLanguage);
			}
		})();
		
		 
	});


})(window);
