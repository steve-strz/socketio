const socket = io();
const chatForm = document.getElementById('chat-form');
const chat = document.getElementById('chat');

socket.on('message', (msg) => {
   outputMessage(msg);
});

function outputMessage(newMessage){
   const div = document.createElement('div');
   div.innerHTML = `<p><b>${newMessage.username}</b> <i>(${newMessage.time})</i> : ${newMessage.text} </p>`;
   chat.appendChild(div);
}

chatForm.addEventListener('submit', (event) => {
   event.preventDefault();

   const msg = event.target.elements.msg.value;

   //On envoie le message au serveur
   socket.emit('chatMessage', msg);

   event.target.elements.msg.value = "";
   event.target.elements.msg.focus();
});

