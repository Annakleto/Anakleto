// JavaScript source code
$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'basic_tone.mp3');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
    
    $('#suona').click(function() {
        audioElement.play();
		
        //$("#status").text("Status: Playing");
    });
    
    $('#rispondi').click(function() {
        audioElement.pause();
		audioElement.currentTime = 0;
    });
    
    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
});