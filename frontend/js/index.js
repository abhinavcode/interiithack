var listGames = [];

function greetings() {
	showChatText('Hiya there! Here are some games for you.', true);
}

function fetchGames() {
	let url = `${WEB_URL}users/${USER_UID}/recommend/`;
	$.get(url).then((response) => {
		listGames = response;
		response.forEach(element => {
			showChatText(element.name, true);
		});
	});
}

let _alias_requestSendMessage = requestSendMessage;
var requestSendMessage = function() {
	let msg = $('#chat_message').val();
	_alias_requestSendMessage.call(this);

	for (let i = 0; i < listGames.length; i++) {
		if (msg.toLowerCase().indexOf(listGames[i].toLowerCase()) > -1){
			launchGame(listGames[i].id);
			break;
		}
	}
};

function launchGame(game_uid) {
	localStorage.setItem('game.uid', game_uid);
	window.location = 'game.htm';
}

function init() {
	greetings();
	fetchGames();
	$("#chat_message").focus();
}

init();
