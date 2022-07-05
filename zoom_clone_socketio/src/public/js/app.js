const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.querySelector('#room');
const roomTitle = room.querySelector('h3');

room.hidden = true;

let roomName;

function handleRoomSubmit(e) {
  e.preventDefault();

  const input = form.querySelector('input');
  roomName = `${input.value}`;
  input.value = '';

  socket.emit('enter_room', { roomName: roomName }, () => {
    console.log('enter room !');

    roomTitle.innerText = `Room: #${roomName}`;

    welcome.hidden = true;
    room.hidden = false;

    const msgForm = room.querySelector('#msg');
    msgForm.addEventListener('submit', handleMessageSubmit);

    const nameForm = room.querySelector('#name');
    nameForm.addEventListener('submit', handleNicknameSubmit);
  });
}
form.addEventListener('submit', handleRoomSubmit);

function handleNicknameSubmit(e) {
  e.preventDefault();

  const input = room.querySelector('#name input');
  const msg = input.value;
  input.value = '';
  socket.emit('nickname', msg);
}

function handleMessageSubmit(e) {
  e.preventDefault();

  const input = room.querySelector('#msg input');
  const msg = input.value;
  input.value = '';
  socket.emit('new_message', msg, roomName, () => {
    addMessage(`You: ${msg}`)
  })
}

function addMessage(msg) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = msg;
  ul.appendChild(li);
}

function chgRoomTitle(roomName, cnt) {
  console.log(`chgRoomTitle ${roomName} cnt(${cnt})`);
  roomTitle.innerText = `Room: #${roomName} (${cnt})`;
}

socket.onAny((event, ...args) => {
  console.log(`Socekt Event: ${event}`);
});

socket.on('welcome', (nickname, cnt) => {
  addMessage(`${nickname} joined!`)
  chgRoomTitle(roomName, cnt);
});

socket.on('bye', (nickname, cnt) => {
  addMessage(`${nickname} left`)
  chgRoomTitle(roomName, cnt);
});

socket.on('new_message', addMessage);
// socket.on('room_change', console.log);
socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');

  roomList.innerHTML = '';

  rooms.forEach( (room) => {
    const li = document.createElement('li')
    li.innerText = room;
    roomList.append(li)
  })
});