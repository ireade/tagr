"use strict";
$(document).ready(function() {

	function apiRequest() {

		var cleanTag = tag.replace(/\s/g, "");
		var requestUrl = 'https://api.instagram.com/v1/tags/'+cleanTag+'/media/recent?access_token='+accessToken+'&callback=?';

		$.getJSON(requestUrl, {}, function(data) {

			var source = $('#grams-template').html();
			var template = Handlebars.compile(source);
			var output = template( {Grams: data.data} );

			
			if (data.data.length == 0) {
				$("#pictures").html('<p class="error">Sorry, nothing turned up! Please try again</p>')
			} else {
				$("#pictures").html(output).fadeIn();
			}
		});
	}

	$('#submit').on('click', function() {

		var searchInput = $('#searchText').val();
		tag = searchInput;
		apiRequest();

		return false;
	})

	// Set Default
	var tag = 'turndownforwhat';
	apiRequest();

});