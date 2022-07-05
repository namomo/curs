const msgList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const msgForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);


socket.addEventListener('open', () => {
  console.log('connect to server ✅ ');
})

socket.addEventListener('message', (msg) => {
  console.log('message : ', msg.data, ' from server');

  const li = document.createElement('li');
  li.innerText = msg.data;
  msgList.append(li);
})

socket.addEventListener('close', () => {
  console.log('disconnect from Server ❌');
})

/*
setTimeout(() => {
  socket.send('hello ~ from the browser');
}, 4000)
*/


function makeMessage(type, payload) {
  return JSON.stringify({type: type, payload: payload});
}

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = msgForm.querySelector('input');
  // socket.send(input.value);
  // console.log(`input -> ${input.value}`)

  socket.send(makeMessage('message', input.value));
  input.value = '';
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = nickForm.querySelector('input');
  //socket.send(input.value);

  socket.send(makeMessage('nickname', input.value));
  input.value = '';
});