// const enterMessengerForm = document.querySelector('#enter-messenger-from');
// const enterMessengerInput = document.querySelector('#enter-messenger-input');
// const messengerWrapper = document.querySelector('.messenger-wrapper');
// const activeUsersContainer = document.querySelector('.active-users');
// const messagesContainer = document.querySelector('.messages');
// const messageForm = document.querySelector('#message-form');
// const messageInput = document.querySelector('#message-input');
// const typingIndicatorContainer = document.querySelector('#typing-indicator');
//
// enterMessengerForm.addEventListener('submit' , e => {
//   e.preventDefault();
//   initMessenger(enterMessengerInput.value);
//   enterMessengerForm.classList.add('hide');
//   messengerWrapper.classList.add('visible');
// })
//
// function initMessenger(newUserName){
//   const ws = new WebSocket('ws://139.59.145.232:8080');
//   ws.addEventListener('open', e => {
//     console.log('Connected');
//     ws.send(JSON.stringify({type: 'newUser', data: newUserName}));
//   });
//   ws.addEventListener('error', e => {
//     console.log('Error - ', e);
//   });
//   ws.addEventListener('message', e => {
//     const messageData = JSON.parse(e.data);
//     if(messageData.type === 'activeUsers'){
//       handleActiveUsers(messageData);
//     }
//     if(messageData.type === 'newUser'){
//       handleNewUser(messageData);
//     }
//     if(messageData.type === 'chatMessage'){
//       handleNewMessage(messageData, ws);
//     }
//     if(messageData.type === 'userTyping'){
//       handleUserTyping(messageData);
//     }
//     if(messageData.type === 'messageLike'){
//       handleMessageLike(messageData);
//     }
//     console.log('Message incoming', e);
//     console.log('Message parsed', messageData);
//   });
//
//   messageForm.addEventListener('submit', e => {
//     e.preventDefault();
//     sendMessage(messageInput.value, ws);
//     messageInput.value = '';
//   });
//   messageInput.addEventListener('input', () => {
//     ws.send(JSON.stringify({type: 'userTyping', data: newUserName}));
//   })
// }
//
// function handleNewUser(userData){
//   const newUserDiv = document.createElement('div');
//   newUserDiv.classList.add('user-item');
//   newUserDiv.innerText = userData.data;
//
//   activeUsersContainer.appendChild(newUserDiv);
// }
//
// function handleActiveUsers(usersData){
//   activeUsersContainer.innerHTML = '';
//   usersData.data.forEach(user => {
//     handleNewUser(user)
//   });
// }
//
// function sendMessage(message, ws) {
//   ws.send(JSON.stringify({ type: 'chatMessage', data: message }));
// }
//
// function handleNewMessage(messageData, ws) {
//   const messageLikes = document.createElement('span');
//   const newMessageDiv = document.createElement('div');
//   newMessageDiv.innerHTML = messageData.data;
//   newMessageDiv.setAttribute('data-id', messageData.id);
//   newMessageDiv.innerText = messageData.data;
//   newMessageDiv.appendChild(messageLikes);
//
//   newMessageDiv.addEventListener('click', () => {
//     ws.send(JSON.stringify({type: 'messageLike', id: messageData.id}));
//   });
//
//   messagesContainer.appendChild(newMessageDiv);
// }
//
// function handleUserTyping(messageData) {
//   typingIndicatorContainer.innerText = `${messageData.data} is typing...`;
//   console.log(messageData, typingIndicatorContainer);
//   setTimeout(() => {
//     typingIndicatorContainer.innerText = '';
//   }, 2000)
// }
//
// function handleMessageLike(messageData) {
//   const messageDiv = document.querySelector(`div[data-id="${messageData.id}"]`);
//   if(messageDiv){
//     messageDiv.querySelector('span').innerText = ` Likes: ${messageData.likeCount}`
//   }
// }

// Simple game
const gameBoard = document.querySelector('#game-board');
const ctx = gameBoard.getContext('2d');

const gameSpeed = 3;
const squareSize = 50;
const targetSize = 20;

let squareX = 0;
let squareY = 400;
let targetX = 100;
let targetY = 200;

let dirUp = false;
let dirDown = false;
let dirRight = false;
let dirLeft = false;

startGame();

function startGame() {
  moveSquare();
  moveTarget();
  draw();
  document.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp') {
      dirUp = true;
    }
    if (e.code === 'ArrowDown') {
      dirDown = true;
    }
    if (e.code === 'ArrowLeft') {
      dirLeft = true;
    }
    if (e.code === 'ArrowRight') {
      dirRight = true;
    }
  })
  document.addEventListener('keyup', e => {
    if (e.code === 'ArrowUp') {
      dirUp = false;
    }
    if (e.code === 'ArrowDown') {
      dirDown = false;
    }
    if (e.code === 'ArrowLeft') {
      dirLeft = false;
    }
    if (e.code === 'ArrowRight') {
      dirRight = false;
    }
  })
}

function draw() {
  clearBoard();
  ctx.fillStyle = 'red';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);

  ctx.fillStyle = 'green';
  ctx.fillRect(targetX, targetY, targetSize, targetSize);
}

function clearBoard() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

function moveSquare() {
  if (dirUp) {
    squareY -= gameSpeed;
  }
  if(dirDown) {
    squareY += gameSpeed;
  }
  if(dirLeft) {
    squareX -= gameSpeed;
  }
  if(dirRight) {
    squareX += gameSpeed;
  }
  if(squareX + squareSize > gameBoard.width){
    squareX = gameBoard.width - squareSize;
  }
  if(squareY + squareSize > gameBoard.height){
    squareY = gameBoard.height - squareSize;
  }
  squareX = Math.max(0, squareX);
  squareY = Math.max(0, squareY);
  if(isEaten()){
    moveTarget();
  }
  draw();
  requestAnimationFrame(moveSquare);
}

function moveTarget() {
  targetX = Math.floor(Math.random() * (gameBoard.width - targetSize));
  targetY = Math.floor(Math.random() * (gameBoard.height - targetSize));
}

function isEaten() {
  const squareRight = squareX + squareSize;
  const squareBottom = squareY + squareSize;
  const targetRight = targetX + targetSize;
  const targetBottom = targetY + targetSize;

  const inX = squareRight > targetRight && targetX > squareX;
  const inY = squareBottom > targetBottom && targetY > squareY;

  return inX && inY;
}
