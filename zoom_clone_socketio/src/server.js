import http from "http"
// import WebSocket from "ws";
// import SocketIO  from "socket.io";
import { Server } from "socket.io";
// import { count } from "console";
import { instrument } from "@socket.io/admin-ui";
import express from "express";

const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname+'/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => {
  console.log('server start ->');
  console.log(`http://localhost:${PORT} or ws://localhost:${PORT}`);
}
// app.listen(PORT, handleListen);

// const server = http.createServer(app);
//const wss = new WebSocket.Server({server});
/*
wss.on('connection', (socket) => {
  console.log('connection to browser ✅ ');

  socket._nickName = 'Anno';

  socket.on('close', () => console.log('disconnect from browser ❌'));
  socket.on('message', (msg) => {
    let parseMsg = JSON.parse(msg.toString());
    // console.log(`recv message origin , `, msg);
    // console.log(`recv message toString , `, msg.toString());
    // console.log(`recv message toString parse , `, JSON.parse(msg.toString()));

    switch (parseMsg.type) {
      case 'nickname':
        socket._nickName = parseMsg.payload;
        break;
      case 'message':
        socket.send(`${socket._nickName}: ${parseMsg.payload}`);
        break;
    }
  });

  socket.send('-- hello --');
})
*/
// server.listen(PORT, handleListen);


/*********************************************************
 * socket.io
 */

const httpServer = http.createServer(app);
// const wsServer = SocketIO(httpServer);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
})

instrument(wsServer, {
  auth: false
});

function publicRooms() {
  // const {sockets: {adapter: {sids, rooms}}} = wsServer;
  const {sids, rooms} = wsServer.sockets.adapter;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    console.log(`[public] room key[${key}] - sid key[${sids.get(key)}]`)
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countUserInRoom(roomName) {
  console.log(`[countUserInRoom] ${roomName} size[${wsServer.sockets.adapter.rooms.get(roomName)?.size}]`);
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on('connection', (socket) => {
  console.log('connection to browser ✅ ');
  // console.log(wsServer.sockets.adapter);

  socket['nickname'] = 'Anon';

  socket.onAny((event, ...args) => {
    console.log(`Socekt Event: ${event}`);

    publicRooms();
  });

  socket.on('enter_room', (msg, done) => {
    console.log('enter room - ', msg);
    socket.join(msg.roomName);
    console.log('enter room socket.room ', socket.rooms);
    // setTimeout(done, 1000);
    done();

    socket.to(msg.roomName).emit('welcome', socket.nickname, countUserInRoom(msg.roomName));
    wsServer.sockets.emit('room_change', publicRooms());
  })

  // 연결이 끊어져 room 에서 나가기 전 이벤트
  socket.on("disconnecting", (reason) => {
    console.log('disconnection ', socket.rooms);
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye', socket.nickname, countUserInRoom(room)-1);
    })
  });

  socket.on("disconnect", (reason) => {
    console.log('disconnect');
    wsServer.sockets.emit('room_change', publicRooms());
  });

  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on('nickname', (nickname) => {
    socket['nickname'] = nickname;
  })
})

httpServer.listen(PORT, handleListen);