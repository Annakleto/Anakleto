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
    //if enter button is pressed, the room link is called
		else if (e.keyCode == 13) { // 13 = enter
			goToRoomURL();
   		}
	});
    //if the input lose focus, the room link is called
	$( "#roomNameInput" ).change(function() {
  		goToRoomURL();
	});
    
    //the input value is salved into a variable that becomes the calling room name
    function goToRoomURL(){
    	var number = $.trim($("#roomNameInput").val());
		$( "#link" ).html("Calling Room Created");
		//window.location = "https://appr.tc/r/" + number;
        document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + number + "\" id=\"appr\"></iframe>";
        //$( "#videobox" ).innerHTML = "<iframe src=\"https://appr.tc/r/" + number + "\" id=\"appr\"></iframe>";
    }
    
    $( "#hangup" ).css("background-color: red");
		
});