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
	function actualRoomArray(snapshot) {
		var returnArr = [];
		snapshot.forEach(function(childSnapshot) {
			var item = childSnapshot.val();
			returnArr.push(item.actual_room);
		});
		return returnArr;
	};
	
	//search for values that are repeated twice into the array
	function findDoubles(arra1) {
        var object = {};
        var result = [];
        arra1.forEach(function (item) {
          if(!object[item])
            object[item] = 0;
            object[item] += 1;
        })
        for (var prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }
        return result;
    }
	
	//understands if there are more than 2 people in the same room
	//if so, it doesn't allow to enter the room and sends you back to your staring room
	function checkPeopleInRoom() {
		peopleInRoom.push(personMoving);	//add caller
		peopleInRoom.push(desiredRoom);		//add called
		console.log(peopleInRoom.length);
		if (peopleInRoom.length = 2) {
			//writeUserData(personMoving, personMoving);
		}
	}
	
	//
	dbRef.ref("phonebook").on("child_changed", function(snapshot) {
		desiredRoom = snapshot.child('actual_room').val();
		personMoving = snapshot.key;
		console.log(personMoving + " has tried to reach: " + desiredRoom);
		
		//roomsArray = findDoubles(actualRoomArray(snapshot));
		//room = roomsArray[0];
		//console.log("This room is in common: " + room + ".");
		//checkPeopleInRoom();
		
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
		//goToRoomURL();
		//writeUserData(myNumber, onesNumber);
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