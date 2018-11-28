// JavaScript Document

$( document ).ready(function() {
	"use strict";
	
	//start the document with focus on the Room Name input space
	$( "#roomNameInput" ).focus();
	
	//if alt button is pressed, the input value is changed into support
	$( "#roomNameInput" ).keyup(function(e) {
		if (e.keyCode == 18) { // 18 = alt
			$( "#roomNameInput" ).val("Support");
   		}
		else if (e.keyCode == 13) { // 13 = enter
			var number = $.trim($("#roomNameInput").val());
			$( "#link" ).html("Calling Room Created");
			var link = $( "#link" ).attr("href");
			link = "https://appr.tc/r/" + number;
			window.location = link;
   		}
	});
	
	
	/*
	$( "button" ).on("click", function() {
		$( this ).html("pushed");
		var number = $.trim($("#roomNameInput").val());
		$( "#link" ).html("Room Created");
		$( "#link" ).attr("href", "https://appr.tc/r/" + number);
		
	});
	*/
	
	//called when the value inside the input is changed
	$( "#roomNameInput" ).change(function() {
  		var number = $.trim($("#roomNameInput").val());
		$( "#link" ).html("Calling Room Created");
		var link = $( "#link" ).attr("href");
		link = "https://appr.tc/r/" + number;
		window.location = link;
	});
	
	
	

	
});