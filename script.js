
$(document).ready(function() {

	var machinePower = checkPower();
	var volume = 0.5;
	var padButton = [
	{ //Q
		'key': 'Q',
		'name1': 'Heater-1',
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
		'name2': 'Chord-1',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
	},

	{ //W
		'key': 'W',
		'name1': "Heater-2",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
		'name2': 'Chord-2',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
	},

	{
		'key': 'E',
		'name1': "Heater-3",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' ,
		'name2': 'Chord-3',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
	},

	{
		'key': 'A',
		'name1': "Heater-4",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
		'name2': 'Shaker',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
	},

	{
		'key': 'S',
		'name1': "Clap",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
		'name2': 'Open-HH',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
	},

	{
		'key': 'D',
		'name1': "Open-HH",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
		'name2': 'Closed-HH',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
	},

	{
		'key': 'Z',
		'name1': "Kick-n'-Hat",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
		'name2': 'Punchy-Kick',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
	},

	{
		'key': 'X',
		'name1': "Kick",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
		'name2': 'Side-Stick',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
	},

	{
		'key': 'C',
		'name1': "Closed-HH",
		'bank1': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
		'name2': 'Snare',
		'bank2' : 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
	},

	];

	assignlinks();

	function assignlinks(){
		for(var i = 0; i < 9; i++){
				$('#' + padButton[i].key).attr('src', padButton[i].bank1);
				$('#' + padButton[i].key).attr('name', padButton[i].name1);
			}
	}

	function checkPower(){ //check if the power button is on
		var power = $('#powercheck').is(':checked');
		if(power==true){
			return true;
		}
		else{ 
			return false;
		}
	}

	function pressed(id, description){
			$('#'+ id)[0].play();
			$('#display').text(description);	
	}

	$('#powercheck').change(function(event) {
		machinePower = checkPower();
		var audioID = $(this).find("audio").attr('id');

		if(machinePower == false){
			$('audio').prop("volume", 0);
			$('#display').text('');
			$("button").prop('disabled', true);

		}
		else{
			$("button").prop('disabled', false);
			$('audio').prop("volume", volume);
		}
	});

	$("#bankcheck").change(function(event) { //check change in bank
		if ($('#bankcheck').is(':checked')){

			for(var i = 0; i < 9; i++){
				$('#' + padButton[i].key).attr('src', padButton[i].bank2);
				$('#' + padButton[i].key).attr('name', padButton[i].name2);
			}
		} //end of bankcheck is checked
		else{
			for(var i = 0; i < 9; i++){
				$('#' + padButton[i].key).attr('src', padButton[i].bank1);
				$('#' + padButton[i].key).attr('name', padButton[i].name1);
			}
		}
	});
	
	$("#volume").change(function() {
		volume = ($(this).val())/100;	
		$('audio').prop("volume", volume);
	});


	$(".drum-pad").click(function(event) {
		if(checkPower()==true){
			var audioID = $(this).find("audio").attr('id');
			var description = $(this).find("audio").attr('name');
			pressed(audioID, description);
		}
		else{
			$('#display').text('');
			$('button').removeClass('inactive');
		}
	});


	$('body').on('keydown', function (e) { //function to run when keyboard is pressed
		var letter = e.key.toUpperCase();	
		if(checkPower()== true){
				switch(letter){
		    		case 'Q': case 'W': case 'E': case 'A': case 'S': case 'D': case 'Z': case 'X': case 'C':  
		    		pressed(letter, $('#'+ letter).attr('name')); 
		    		$('#button' + letter).addClass('active');
	    		}
		}
	    
	});

	$('body').on('keyup', function (e) { 
  		$('button').removeClass('active');
	});

});
