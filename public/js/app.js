(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function(){
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});
		// Method ajax recherche par critère
		var $selectorGenre=$('#select-genre');
		var $selectorYear=$('#select-year');
		console.log($selectorYear);
		if($selectorGenre.length && $selectorYear.length){
			//1. attach change event listener
			$( ".filter-selector").on ('change',function(){
				//2. retrieve selected data
				var genre=$selectorGenre.val();
				var year=$selectorYear.val();
				//3.Do ajax request
				var url='/reviews/'+genre+'/'+year;
				console.log(year);console.log(genre);
				$.ajax({
					url:url,
					type:'GET',
					success:function(response,status){
						//methode 1: le serveur retourne une vue compilée
						//console.log(response);
						$('.movie-list').html(response);
					},
					error:function(error,response,status){
						alert(error.message);
					}
				})
			}); 
		}


		$(".slider").flexslider({
			controlNav: false,
			prevText:'<i class="fa fa-chevron-left"></i>',
			nextText:'<i class="fa fa-chevron-right"></i>',
		});
		if( $(".map").length ) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14 
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    	
	    }
	});


	$(window).load(function(){

	});

})(jQuery, document, window);