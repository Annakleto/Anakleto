// JavaScript Document

$( document ).ready(function() {
	"use strict";
	
	/* Initialize Firebase
	  var config = {
		apiKey: "AIzaSyCQC2o5BQTMJGgm25aB51u6xf2qp4SG1Bs",
		authDomain: "anakleto-f56e5.firebaseapp.com",
		databaseURL: "https://anakleto-f56e5.firebaseio.com",
		projectId: "anakleto-f56e5",
		storageBucket: "anakleto-f56e5.appspot.com",
		messagingSenderId: "734303653154"
	  };
	firebase.initializeApp(config);
	*/
	var dbRef = firebase.database();
	var phonebookRef = dbRef.ref("phonebook");
	
	$("#overwrite").click( function(e){
			phonebookRef.push({
			  name: 'Time to Hack',
			  number: '333',
		});
	});
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	/*
	$("button").click(function(){
    	$.ajax({
			url: "https://appr.tc/r/Support",
			async: false,
			success: function(result){
				$("#videobox").html(result);
    		}
		});
	});
	*/
	
	$( "#demoNumber" ).keyup(function(e) {
		var myNumber = $.trim($("#demoNumber").val());
		
		if (e.keyCode == 13) { // 13 = enter
			//starts your room, so you can be called by someone else
			document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + myNumber + "\" id=\"appr\"></iframe>";
			$("#startDemo").hide();
			$( "#roomNameInput" ).focus();
   		} else if (e.keyCode == 18) { // 18 = alt
			var butText = $("#ajaxBut");
			var dbRef = database().ref().child("1");
			dbRef.on("value", snap => butText.innerText = snap.val());
   		}
	});
	
	function writeUserData(userId, name, number) {
	  firebase.database().ref('phonebook/' + userId).set({
		username: name,
		telephone: number
	  });
	}
	
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