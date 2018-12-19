function createChatBubble(is_bot) {
	var newBlob = document.createElement('div');
	newBlob.className = 'triangle-right';
	if (is_bot)
		$(newBlob).addClass('left');
	else
		$(newBlob).addClass('right');
	return newBlob;
}

function showChatText(text, is_bot) {
	var newBlob = createChatBubble(is_bot);
	newBlob.innerText = text;
	$(".chat-container").append(newBlob);
}

function showChatImage(img, is_bot) {
	var newBlob = createChatBubble(is_bot);
	newBlob.innerHTML = `<img src="${img}" />`
	$(".chat-container").append(newBlob);
}

var requestSendMessage = function() {
	let msg = $('#chat_message').val();
	sendMessage(msg);
}

function sendMessage(msg) {
	showChatText(msg, false);
	$('#chat_message').val('');
};

// Binding methods
$('#btn_chat_send').bind('click touchstart', function(e) {
	requestSendMessage();
});

$("#chat_message").keypress(function(e){
	if (e.which == 13) { //enter
		requestSendMessage();
	}
});
