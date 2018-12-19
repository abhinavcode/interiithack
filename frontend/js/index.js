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

const replies = ["Sorry. Can you reply clearly", "Sorry, didn't get you","I need more training","I beg your pardon","I'm stupid. Didn't get you"];
let _alias_requestSendMessage = requestSendMessage;
var requestSendMessage = function() {
	let msg = $('#chat_message').val();
	_alias_requestSendMessage.call(this);

	for (let i = 0; i < listGames.length; i++) {
		if (msg.toLowerCase().indexOf(listGames[i].name.toLowerCase()) > -1){
			launchGame(listGames[i].id);
			break;
		}else if (msg.toLowerCase().indexOf("hi") > -1 || msg.toLowerCase().indexOf("hello") > -1 ){
			showChatText("Hi", true);
			break;
		}else if (msg.toLowerCase().indexOf("how") > -1 && msg.toLowerCase().indexOf("are") > -1 ){
			showChatText("I'm fine. How are you?", true);
			break;
		}else{
			showChatText(replies[msg.length%replies.length], true);
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
