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
	
	var onesNumber = null;
	var myNumber = null;
	
	var roomsArray = [];
    var room;
	var peopleInRoom = [];
	var personMoving;
  	var desiredRoom;
	
	var rooms = [];
	
		//INITIAL SETTING
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	$( "#demoNumber" ).keyup(function(e) {
		if (e.keyCode == 13) { // 13 = enter
			//set your room number
			myNumber = $.trim($("#demoNumber").val());
			writeUserData(myNumber, myNumber)
			//open the first menù
			$("#startDemo").hide();
			$( "#roomNameInput" ).focus();
		}
	});
	
		//ADD PEOPLE
	
	//add a new user location or change the one
	function writeUserData(user, number) {
		dbRef.ref('phonebook/' + user).set({
		actual_room: number,
		my_room: user
	  });
	}
	
	
		//DETECT PEOPLE MOVES
	
	//return an array with all actual_room values in the db
	function actualRoomToArray(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            rooms.push(item.actual_room);
        });
        return rooms;
    };
	
	//counts how many element in an array are the as the one I want to reach
	function count(array_elements) {
		var current = desiredRoom;
		var cnt = 0;
		for (var i = 0; i < array_elements.length; i++) {
			console.log(array_elements[i] == desiredRoom);
			if (array_elements[i] == desiredRoom) {
				cnt++;
			}
		}
		console.log(current + ' comes --> ' + cnt + ' times');
		cnt = 0;
	}
	
	//writes values in the array
	function writeArray(array){
	  for(var i = 0; i < array.length; i++){
		console.log(array[i]);
	  }
	}
	
	//count elements repetitions
	function count(array_elements) {
		var current = desiredRoom;
		var cnt = 0;
		for (var i = 0; i < array_elements.length; i++) {
			console.log(array_elements[i] == desiredRoom);
			if (array_elements[i] == desiredRoom) {
				cnt++;
			}
		}
		console.log(current + ' comes --> ' + cnt + ' times');
		cnt = 0;
	}
	
	//detect changes
	dbRef.ref("phonebook").on("value", function(snapshot) {
		rooms = [];
		writeArray(actualRoomToArray(snapshot));
		count(rooms);
	});
				
	dbRef.ref("phonebook").on("child_changed", function(snapshot) {
		desiredRoom = snapshot.child('actual_room').val();
		personMoving = snapshot.key;
		console.log(personMoving + " has tried to reach: " + desiredRoom);
		//alert the other person that he's being called
		incomingCallAlert();
	});
	
		//RECEIVE A CALL
	
	function incomingCallAlert() {
		//if someone else actual room is the same as my room, then let me now i'm being called
		if(desiredRoom === myNumber){
			alert("you are being called");
		}
	}
	
	
		//CONFIRM CALL
	
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
	function alertCall() {
		onesNumber = $.trim($("#roomNameInput").val());
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
		goToRoomURL();
		writeUserData(myNumber, onesNumber);
	});
	
	
	$("#callingAlert").keyup(function(e) {
		if (e.keyCode == 89) { // 89 = yes
			//goToRoomURL();
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