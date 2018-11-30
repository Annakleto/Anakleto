// JavaScript Document

$( document ).ready(function() {
	"use strict";
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	$( "#demoNumber" ).keyup(function(e) {
		var myNumber = $.trim($("#demoNumber").val());
		
		if (e.keyCode == 13) { // 13 = enter
			//starts your room, so you can be called by someone else
			document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + myNumber + "\" id=\"appr\"></iframe>";
			$("#startDemo").hide();
			$( "#roomNameInput" ).focus();
   		}
	});
	
	//if alt button is pressed, the input value is changed into support
	$( "#roomNameInput" ).keyup(function(e) {
		if (e.keyCode == 18) { // 18 = alt
			$( "#roomNameInput" ).val("Support");
   		}
    //if enter button is pressed, the room link is called
		else if (e.keyCode == 13) { // 13 = enter
			alertCall();
   		}
	});
    
	//
	function alertCall(){
		var number = $.trim($("#roomNameInput").val());
		$("#callingAlert").show();
		if(number != 0){
		   $( "#number" ).html(number);
			$("#yes").focus();
		} else {
			$( "#number" ).html("Error");
		}
		
    }
	
	//when a button is clicked, the overlay goes away
	$(".choice").click( function(e){
		$("#callingAlert").hide();
	});
	
	
	//if yes was chosen, the room for the call is changed
	$("#yes").click( function(e){
		goToRoomURL();
	});
	
	//the input value is salved into a variable that becomes the calling room name
    function goToRoomURL(){
    	var number = $.trim($("#roomNameInput").val());
		//$( "#link" ).html("Calling Room Created");
		//window.location = "https://appr.tc/r/" + number;
        document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + number + "\" id=\"appr\"></iframe>";
		//$("#videobox").attr("src", "https://appr.tc/r/" + number + "\" id=\"appr\");
    }
	
	
	//while no one is calling me, hide the local-video
	while($("#remote-video").hasClass("")){
		$("#link").html("tappooooo");
	}
	
	
}); //document ready ends