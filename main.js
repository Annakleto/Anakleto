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
	var incomingCall = false;
	var calling = "ongoing";
	
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'Anakleto/basic_tone.mp3');
	
		//INITIAL SETTING
	
	//start the document with focus on the Room Name input space
	$( "#demoNumber" ).focus();
	
	$( "#controller" ).keyup(function(e) {
		 if (e.keyCode == 89) { // 89 = y = yes
			writeUserData(myNumber, onesNumber); //maybe this is making stuff going crazy
			if(roomCount ==  2) {
				/*writeUserData(myNumber, desiredRoom);
				console.log("request accepted");
				goToRoomURL(personMoving);
				incomingCall = false;*/
				
				if(incomingCall){
					//writeUserData(myNumber, desiredRoom);
					console.log("request accepted, incoming call");
					goToRoomURL(myNumber);
					incomingCall = false;
				} else if(!incomingCall){
					writeUserData(myNumber, desiredRoom);
					console.log("request accepted, not incoming call");
					goToRoomURL(desiredRoom);
				}
				
				
			} else if(roomCount >=  3) {
				writeUserData(myNumber, myNumber);
				console.log("request denied: room full");
				$("#alert").hide();
				fullRoomAlert();
			} else if (roomCount <= 1) {
				if(incomingCall){
					//writeUserData(myNumber, desiredRoom);
					console.log("request accepted, incoming call");
					goToRoomURL(myNumber);
					incomingCall = false;
				} else {
					writeUserData(myNumber, myNumber);
					console.log("request denied: room doesn't exist or not defined");
					$("#alert").hide();
					noRoomAlert();
				}
				
				
			} else {
				$(".overlay").hide();
				$( "#controller" ).val("");
			}
		} else if (e.keyCode == 78) { // 78 = n = no
			$(".overlay").hide();
			$( "#controller" ).val("");
			$( "#roomNameInput" ).focus();
		}
	});
	
	$( "#demoNumber" ).keyup(function(e) {
		if (e.keyCode == 13) { // 13 = enter
			//set your room number
			myNumber = $.trim($("#demoNumber").val());
			writeUserData(myNumber, myNumber)
			//open the first menù
			$("#startDemo").hide();
			$("#main").show();
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
		
		roomCount = cnt;
		
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
		//check if you can call
		console.log("roomCount: " + roomCount);
	});
	
		//ERRORS
	
	function fullRoomAlert() {
		$("#errors").show();
		$( "#error" ).html(onesNumber + " is already calling someone. <br/> Please push the red button to return.");
		$("#controller").focus();
	}
	
	function noRoomAlert() {
		$("#errors").show();
		$( "#error" ).html("The number " + onesNumber + " doesn't exist. <br/> Please push the red button to return.");
		$("#controller").focus();
	}
	
		//RECEIVE A CALL
	
	function incomingCallAlert() {
		//if someone else actual room is the same as my room, then let me now i'm being called
		if(desiredRoom == myNumber && personMoving != myNumber) {
			//alert("you are being called");
			incomingCall = true;
			audioElement.play();
			
			$("#alert").show();
			$( "#message" ).html(personMoving + " is calling you. <br/> Do you want to reply?");
			$("#controller").focus();
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
			$( "#roomNameInput" ).val("Simone");
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