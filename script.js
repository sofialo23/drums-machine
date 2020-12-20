
$(document).ready(function() {

	var machinePower = checkPower();
	var bank = 1;
	var volume = 0.5;
	function checkPower(){ //check if the power button is on
		var power = $('#powercheck').is(':checked');
		if(power==true){
			//console.log('true');
			return true;
		}
		else{ 
			//console.log('false');
			return false;
		}
	}

	function keypadTouch(){
		console.log("you clicked a button");
	}

	function setVolume(){

	}

	$('#powercheck').change(function(event) {
		machinePower = checkPower();
		var audioID = $(this).find("audio").attr('id');

		if(machinePower == false){
			$('audio').prop("volume", 0);
			/*MAKE SURE DISPLAY IS EMPTY WHEN OFF******/
		}
		else{
			$('audio').prop("volume", volume);
		}
	});

	$("#bankcheck").change(function(event) { //check change in bank
		if ($('#bankcheck').is(':checked')){
			bank = 2;	

			$("#Q").attr("src",'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3');
			$("#Q").attr("name",'Heater-1');

		}
		else{
			bank = 1;
			$("#Q").attr("src", 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3');
			$("#Q").attr("name",'Chord-1');
		}
	});
	
	$("#volume").change(function() {
		var power = checkPower();
		volume = ($(this).val())/100;
		if(power == true){
			volume = ($(this).val())/100;
			$('audio').prop("volume", volume);
		}

	});

	$(".drum-pad").click(function(event) {
		//var buttonID = this.id;
		var audioID = $(this).find("audio").attr('id');
		var description = $(this).find("audio").attr('name');
		//var audioURL = $(this).find("audio").attr('src');

		$('#'+ audioID)[0].play();
		console.log(description);
		//console.log(audio.attr('src'));
		//console.log(audio.attr('id')); 

	});
});