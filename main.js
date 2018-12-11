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
    var roomCount;
	var peopleInRoom = [];
	var personMoving;
  	var desiredRoom;
	
	var rooms = [];
	
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'Anakleto/basic_tone.mp3');
	
		//INITIAL SETTING
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	//reads y/n commands
	/*$("#controls").keydown(function(e) {
        console.log(e.keyCode);
		if(myNumber != null){
		   if (e.keyCode == 89) { // 89 = y = yes
				goToRoomURL(onesNumber);
				writeUserData(myNumber, onesNumber);
				$(".overlay").hide();
			} else if (e.keyCode == 78) { // 78 = n = no
				$(".overlay").hide();
			}
		}
    });*/
	
	$( "#controller" ).keyup(function(e) {
		 if (e.keyCode == 89) { // 89 = y = yes
			goToRoomURL(onesNumber);
			writeUserData(myNumber, onesNumber);
			$(".overlay").hide();
			$( "#controller" ).val("");
		} else if (e.keyCode == 78) { // 78 = n = no
			$(".overlay").hide();
			$( "#controller" ).val("");
		}
	});
	
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
	
	//counts how many element in an array are the same as the one I want to reach
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
		roomCount = cnt;
		cnt = 0;
	}
	
	//writes values in the array
	function writeArray(array){
	  for(var i = 0; i < array.length; i++){
		console.log(array[i]);
	  }
	}
	
	//detect changes
	dbRef.ref("phonebook").on("value", function(snapshot) {
		rooms = [];
		count(rooms);
		
		console.log("roomCount: " + roomCount);
		
		if(roomCount = 2){
			writeArray(actualRoomToArray(snapshot));
		} else if (roomCount = 1 || roomCount > 2) {
			console.log("error, 1 or 3 detected");
		} else {
			console.log("unknown error");
		}
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
		if(desiredRoom == myNumber && personMoving != myNumber) {
			audioElement.play();
			
			$("#alert").show();
			$( "#message" ).html(personMoving + " is calling you. <br/> Do you want to reply?");
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
		$("#alert").show();
		if(onesNumber != 0){
			$( "#message" ).html("You are calling: <br/>" + onesNumber + "<br/> Do you confirm?");
			$("#controller").focus();
		} else {
			$( "#message" ).html("Error");
			$("#controller").focus();
		}
    }
	
	//the input value is salved into a variable that becomes the calling room name
    function goToRoomURL(number){
		$("#videobox").show();
        document.getElementById("videobox").innerHTML = "<iframe src=\"https://appr.tc/r/" + number + "\" id=\"appr\"></iframe>";
    }
	
}); //document ready ends