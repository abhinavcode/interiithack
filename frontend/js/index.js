var listGames = [];

const replies = [
	"Sorry. Can you reply clearly",
	"Sorry, didn't get you",
	"I need more training",
	"I beg your pardon",
	"I'm stupid. Didn't get you"
];

function greetings() {
	showChatText('Hi there! Here are some games for you.', true);
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

	let flag = false;
	for (let i = 0; i < listGames.length; i++) {
		if (msg.toLowerCase().indexOf(listGames[i].name.toLowerCase()) > -1){
			launchGame(listGames[i].id);
			flag = true;
			break;
		}
	}
	if (!flag) {
		if (msg.toLowerCase().indexOf("hi") > -1 || msg.toLowerCase().indexOf("hello") > -1 ){
			showChatText("Hi", true);
		} else if (msg.toLowerCase().indexOf("how") > -1 && msg.toLowerCase().indexOf("are") > -1 ){
			showChatText("I'm fine. How are you?", true);
		} else{
			showChatText(replies[msg.length % replies.length], true);
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
	let timer = setTimeout(() => launchGame(2), 15000);
	$('#chat_message').on('keypress', () => clearTimeout(timer));
}

init();
