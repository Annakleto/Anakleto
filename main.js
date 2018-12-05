// JavaScript Document

$( document ).ready(function() {
	"use strict";
	
	//Initialize Firebase
	  var config = {
		apiKey: "AIzaSyCQC2o5BQTMJGgm25aB51u6xf2qp4SG1Bs",
		authDomain: "anakleto-f56e5.firebaseapp.com",
		databaseURL: "https://anakleto-f56e5.firebaseio.com",
		projectId: "anakleto-f56e5",
		storageBucket: "anakleto-f56e5.appspot.com",
		messagingSenderId: "734303653154"
	  };
	firebase.initializeApp(config);
	
	var dbRef = firebase.database();
	var dbValRoom = null;
	
	var onesNumber = null;
	var myNumber = null;
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	$( "#demoNumber" ).keyup(function(e) {
		if (e.keyCode == 13) { // 13 = enter
			//set your room number
			myNumber = $.trim($("#demoNumber").val());
			$("#startDemo").hide();
			$( "#roomNameInput" ).focus();
		}
	});
	
	//add a new user location or change the one
	function writeUserData(user, number) {
		dbRef.ref('phonebook/' + user).set({
		actual_room: number,
		my_room: user
	  });
	}
	
	//register the new value when a change occurs
	dbRef.ref("phonebook/" + onesNumber + "/actual_room").on('value', function(snapshot){
        dbValRoom = snapshot.val();
        $("#title").html(dbValRoom);
    });
	
	/*
	function checkRoom(){
		if ( === ) {
			
		}
	}
	*/
	
	//if alt button is pressed, the input value is changed into support
	$( "#roomNameInput" ).keyup(function(e) {
		if (e.keyCode == 18) { // 18 = alt
			$( "#roomNameInput" ).val("Support");
   		}
    //if enter button is pressed, the room link is called
		else if (e.keyCode == 13) { // 13 = enter
			alertCall();
			writeUserData(myNumber, onesNumber);
   		}
	});
    
	//
	function alertCall(){
		onesNumber = $.trim($("#roomNameInput").val());
		//userToCall = $.trim($("#userNameInput").val());
		$("#callingAlert").show();
		if(number != 0){
			$( "#number" ).html(onesNumber);
			//$("#yes").focus();
			$("#callingAlert").focus();
		} else {
			$( "#number" ).html("Error");
		}
    }
	
	
	//when a button is clicked, the overlay goes away
	$(".choice").click( function(){
		$("#callingAlert").hide();
	});
	
	
	//if yes was chosen, the room for the call is changed
	$("#yes").click( function(){
		//goToRoomURL();
	});
	
	
	
	$("#callingAlert").keyup(function(e) {
		if (e.keyCode == 89) { // 89 = yes
			goToRoomURL();
			$("#callingAlert").hide();
   		} else if (e.keyCode == 78) { // 78 = no
			$("#callingAlert").hide();
   		}
 	});
	
	/*
	//the input value is salved into a variable that becomes the calling room name
    function goToRoomURL(){
    	var number = $.trim($("#roomNameInput").val());
        document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + number + "\" id=\"appr\"></iframe>";
    }*/
	
}); //document ready ends