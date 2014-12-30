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

		var timestamp = '201312227';
		 
		function detectLanguage(){
			var search = win.location.search;
			var query;
			var language;

			if(search === ''){
				return;
			}

			query = search.substr(1).split('&');
			query.forEach(function(item){
				var pair = item.split('=');
				if(pair[0] === 'l' && typeof pair[1] !== 'undefined'){
					currentLanguage = pair[1];
				}
			});
		};
		
		function switchLanguage(language){
			var url = templateUrl.replace("#{language}", language) + 
					'?t=' + timestamp;

			$.getJSON(url, function(data){
				if(!data){ return; }
				render(data);
				activeLanguage(language);
				decorateBody(language);
				currentLanguage = language;
			});
		};

		function decorateBody(language){
			$body[0].className = language;
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
			switchLanguage(language);
		});

		function activeLanguage(language){
			languageMap[currentLanguage].removeClass("active");
			languageMap[language].addClass("active");
		};

		/**
		 * Check whether the user agent is IE, if so, degrade to a pdf version
		 */
		function entryCheck(){
			if($.browser.msie){
				var template = [
					'<div class="degrade-info">'
				  ,   '<h1 class="title">很抱歉，我的简历在线浏览不支持您当前浏览器，请使用Chrome、Safari或者Firefox进行浏览：</h1>'
				  , '</div>'
				].join("");
				$body.html(template);
				$body.fadeIn();
				return false;
			}else{
				return true;
			}
		};
		
		
		(function init(){
			if(entryCheck()){
				detectLanguage();
				switchLanguage(currentLanguage);
			}
		})();
		
		 
	});


})(window);
