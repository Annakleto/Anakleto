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
	var phonebookRef = dbRef.ref("phonebook");
	
	var numberToCall = null;
	var userToCall = null;
	var myNumber = null;
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	/*
	dbRef.on("child_changed", function(snapshot) {
		var changedPost = snapshot.val();
		//console.log("The updated post title is " + changedPost.title);
	});
	*/
	
	$("dbBut").click( function(){
		$("#dbBut").html(dbRef.child(myNumber).orderByChild("userToReach").equalTo('name'));
		dbRef.child(myNumber).orderByChild("userToReach").equalTo('name').on("value", function(snapshot) {
			$("#dbBut").html(snapshot.val());
		});
	});
	
	$( "#demoNumber" ).keyup(function(e) {
		if (e.keyCode == 13) { // 13 = enter
			//set your room number
			myNumber = $.trim($("#demoNumber").val());
			$("#startDemo").hide();
			$( "#roomNameInput" ).focus();
		}
	});
	
	//add a new user location or change the one
	function writeUserData(user, name, number) {
	  firebase.database().ref('phonebook/' + user).set({
		userToReach: name,
		telephoneCalling: number
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
			writeUserData(myNumber, userToCall, numberToCall);
   		}
	});
    
	//
	function alertCall(){
		numberToCall = $.trim($("#roomNameInput").val());
		userToCall = $.trim($("#userNameInput").val());
		$("#callingAlert").show();
		if(number != 0){
			$( "#number" ).html(numberToCall);
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
		goToRoomURL();
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