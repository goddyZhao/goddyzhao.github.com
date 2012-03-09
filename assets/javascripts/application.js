;(function(win, undefined){
	$(function(){
		var templateSource = $("#page-template").html()
		  , template = Handlebars.compile(templateSource)
		  , templateUrl = "locales/#{language}.json"
		  , languageMap = {
			  	  zh: $("#hd .language li[data-language='zh']")
			  	, en: $("#hd .language li[data-language='en']")
		    }
		  , currentLanguage = "en"
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
		
		(function init(){
			switchLanguage(currentLanguage);
		})();
		
		 
	});
	
})(window);
