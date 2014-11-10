	angular.module("twitterApp").controller('tweetsController', ['$scope', function($scope){
	$scope.tweets=[];
	var windowWidth;

	$.getJSON( "Data/tweets.json", function(data) {
		$scope.tweets=data.tweets;

	});
		$(window).resize(function(){
			windowWidth=$(window).width();
			if(windowWidth<=640){
				$(".followThem").insertAfter('.tweetsBoard');
			}
			else if(windowWidth<1090&&windowWidth>640){
				$(".followThem").insertAfter('#trendTopics');
			}else if(windowWidth>=1090){
						$(".followThem").insertAfter('.tweetsBoard');
			}
			//console.log(windowWidth);
		});

		$(".content .imageContainer img").click(function(){
			console.log(this);
			$(this).addClass("expanded");
		})

	}]).directive('tweetDirective', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'Templates/tweetTemplate.ptl.html',
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$('a').click(function(e){
					e.preventDefault();
				})

				$('.collapsible').hide();
				$('.closeMsg').hide();
				$('.openMsg').show();

				$(iElm).click(function(e){
					$('.collapsible',this).slideToggle('slow');
					$('.closeMsg',this).slideToggle(0);
					$('.openMsg',this).slideToggle(0);

				})
			}
		};
	}).controller('toFollowController', ['$scope', function($scope){

		$.get("Templates/followTemplate.html", function(template, textStatus){
			$.getJSON("Data/followUsers.json", function(context) {
		 var compiled = dust.compile(template, "toFollow");
	    dust.loadSource(compiled);
	    dust.render('toFollow', context, function (err, out){

	        document.getElementById('toFollow').innerHTML += out;
	        $(".willFollow .dismiss").click(function(e){
	        	$(this.parentNode.parentNode).hide();
	        })

	    }); 
		});

		});
		
	}]).controller('hashtagController', ['$scope', function($scope){
		$scope.hashtags=[];
		$.getJSON("Data/hashtags.json", function(data){
			$scope.hashtags=data.hashtags;
		})
		
	}]).controller('postController', ['$scope', function($scope){
		$('#myProfile #hideTweetOptions').hide();
		$('#myProfile .tweetBox').click(function(e){
				e.stopPropagation();
			$('#myProfile .tweetForm input').addClass('display');
			$('#myProfile .tweetBox').addClass('display');
			$('#myProfile #hideTweetOptions').show();
		})	
		$(document).click(function(){
						$('#myProfile .tweetBox').removeClass('display');
				$('#myProfile .tweetBox input').removeClass('display');
				$('#myProfile #hideTweetOptions').hide();
			});

	}]).controller('mainController', ['$scope', function($scope){
		var pop = function(){
      $('#screenGray').css({  "display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
      $('#boxGray').css({"display": "block"}).click(function(e){e.stopPropagation();});
      $('#screenGray').click(function(){$('#boxGray').css("display", "none");$('#screenGray').css("display", "none")});}

      $('#screenPopper').click(pop);
      $(window).resize(function(){
      $('#boxGray').css("display") == 'block'? pop.call($('#screenPopper')):"";
  });
	}]);