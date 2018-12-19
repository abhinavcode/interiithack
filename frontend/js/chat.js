function createChatBubble(is_bot) {
	var newBlob = document.createElement('div');
	newBlob.className = 'triangle-right';
	$(newBlob).addClass('animated faster');
	if (is_bot)
		$(newBlob).addClass('left slideInLeft');
	else
		$(newBlob).addClass('right slideInRight');
	return newBlob;
}

function showChatText(text, is_bot) {
	var newBlob = createChatBubble(is_bot);
	newBlob.innerText = text;
	
	var $scrollContainer = $(".mdl-layout__content");
	$('.chat-container').append(newBlob);
	$scrollContainer.scrollTop($scrollContainer.prop('scrollHeight'));
}

function getLatestMessage() {
	return $('.chat-container div').last()
}

function showChatImage(img, is_bot) {
	var newBlob = createChatBubble(is_bot);
	newBlob.innerHTML = `<img src="${img}" />`

	var $chatContainer = $(".chat-container");
	$chatContainer.append(newBlob);
	$chatContainer.scrollTop($chatContainer.prop('scrollHeight'));
}

var requestSendMessage = function() {
	let msg = $('#chat_message').val();
	if (!msg)
		return;
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
