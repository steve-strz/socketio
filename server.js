const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const formatMessage = require('./utils/messages');

const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

//L'event "connection" permet de savoir lorsqu'un utilisateur se connecte au site
io.on('connection', (socket) => {
   console.log("A new user just connected.");
   //Permet d'envoyer un message a l'utilisateur
   //socket.emit('message', 'Welcome to my app');

   //Permet d'envoyer un message à tous les utilisateurs sauf moi
   socket.broadcast.emit('message', formatMessage('Chabot', 'A user has joined the chat.'));

   //Permet de savoir l'utilisateur quitte le site
   socket.on('disconnect', () => {
      //Envoi un message à tous les utilisateurs de façon globale 
      io.emit('message', formatMessage('Chabot','A user disconnect.'));
   });

   //On écoute les events "chatMessage"
   socket.on("chatMessage", (msg) => {
      io.emit('message', formatMessage('USER',msg));
   })
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});