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
				$(".navbar-collapse .rightActions").toggleClass("navbar-right");
			}
			else if(windowWidth<1190&&windowWidth>640){
				$(".followThem").insertAfter('#trendTopics');
			}else if(windowWidth>=1190){
						$(".followThem").insertAfter('.tweetsBoard');
			}
			//console.log(windowWidth);
		});

	}]).directive('tweetDirective', function(){
		// Runs during compile
		return {
			restrict: 'AE', 
			templateUrl: 'Templates/tweetTemplate.ptl.html',
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				$('a:not(.rightActions a)').click(function(e){
					e.preventDefault();
				})

				$('.collapsible').hide();
				$('.closeMsg').hide();
				$('.openMsg').show();

				$(iElm).click(function(e){
					$('.collapsible',this).slideToggle('fast');
					$('.closeMsg',this).slideToggle(0);
					$('.openMsg',this).slideToggle(0);
					$('.imageContainer', this).toggleClass("expanded");

				});

			}
		};
	}).controller('toFollowController', ['$scope', function($scope){

		$.get("Templates/followTemplate.html", function(template, textStatus){
			$.getJSON("Data/followUsers.json", function(context) {
		 var compiled = dust.compile(template, "toFollow");
	    dust.loadSource(compiled);
	    dust.render('toFollow', context, function (err, out){
	    	//Make it jquery like
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
		$scope.characters="";
		 $scope.textAreaAdjust= function(textField){
		  if (textField.clientHeight < textField.scrollHeight)
		  {
		    textField.style.height = textField.scrollHeight + "px";
		    if (textField.clientHeight < textField.scrollHeight)
		    {
		      textField.style.height = 
		        (textField.scrollHeight * 2 - textField.clientHeight) + "px";
		    }
		  }
		}
		$('#myProfile #hideTweetOptions').hide();
		$('#myProfile .tweetBox').click(function(e){
				e.stopPropagation();
			$('#myProfile .tweetForm textarea').addClass('display');
			$('#myProfile .tweetBox').addClass('display');
			$('#myProfile #hideTweetOptions').show();
		})	
		$(document).click(function(){
						$('#myProfile .tweetBox').removeClass('display');
				$('#myProfile .tweetBox textarea').removeClass('display');
				$('#myProfile #hideTweetOptions').hide();
			});
		$scope.$watch('characters', function(newV, oldV){
			if(newV.length>140){
				$("#hideTweetOptions .charCounter").addClass('red');
				$("#hideTweetOptions .newTweetButton").addClass('disabled');
			}
			if(newV.length<=140){
				$("#hideTweetOptions .newTweetButton").removeClass('disabled');
				$("#hideTweetOptions .charCounter").removeClass('red');
			}
		})
		

	}]).controller('mainController', ['$scope', function($scope){
		var pop = function(){
      $('#screenGray').css({  "display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
      $('#boxGray').css({"display": "block"}).click(function(e){e.stopPropagation();});
      $('#screenGray').click(function(){$('#boxGray').css("display", "none");$('#screenGray').css("display", "none")});}

      $('#screenPopper').click(pop);
      $(window).resize(function(){
      $('#boxGray').css("display") == 'block'? pop.call($('#screenPopper')):""; });

      $scope.chars="";
      $scope.$watch('chars', function(newV, oldV){
      	console.log(newV);
			if(newV.length>140){
				$("#boxGray .tweetForm .charCounter").addClass('red');
				$("#boxGray .tweetForm .newTweetButton").addClass('disabled');
			}
			if(newV.length<=140){
				$("#boxGray .tweetForm .newTweetButton").removeClass('disabled');
				$("#boxGray .tweetForm .charCounter").removeClass('red');
			}
		})
	}]);