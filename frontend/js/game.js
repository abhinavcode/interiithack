// Global vars
var startTime = -1;
var game;
var game_uid;
var user_uid = USER_UID;

// SDK methods
function showText(text) {
	showChatText(text, true);
}

function showImage(img) {
	showChatImage(img, true);
}

function end(score){
	const timeTaken = new Date().getTime() - startTime;
	$.ajax(
		{
			type: 'POST',
			url: WEB_URL+'play/',
			dataType: 'json',
			data: JSON.stringify({
				score: score, time: timeTaken, game: game_uid, user: user_uid, level:game.level}),
			success: ()=>{
				window.location = 'index.htm';
			}
		}
	)
}

function onRequestInput() {
	$("#chat_message").focus();
}

function onCorrectResponse() {
	let $latestMessage = getLatestMessage();
	$latestMessage.addClass('pulse');
}

function onWrongResponse() {
	let $latestMessage = getLatestMessage();
	$latestMessage.addClass('wobble');
}

// Helper methods
function updateGameDetails() {
	$('#game_title').html(game.name);
}

let _alias_requestSendMessage = requestSendMessage;
var requestSendMessage = function() {
	let msg = $('#chat_message').val();

	_alias_requestSendMessage.call(this);
	input(msg);
};

var cleanup = function() {
	localStorage.removeItem('game.uid');
	window.location = 'index.htm';
};

function mainLoop() {
	startTime = new Date().getTime();
}

$(document).ready(()=>{
	game_uid = localStorage.getItem("game.uid");
	if (!game_uid) {
		alert('Invalid Game UID');
		return;
	}

	$.get(WEB_URL+'games/'+game_uid+'/play/').then((response)=>{
		game = response;
		updateGameDetails();
		var script = document.createElement('script');
		script.onload = ()=>{
			start().then(mainLoop);
		}
		script.src = MEDIA_URL + response.code;
		document.head.appendChild(script);
	});
});

$('#btn_back').bind('click touchstart', () => cleanup());
