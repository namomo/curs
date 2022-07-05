import http from "http"
import express from "express";
import WebSocket from "ws";

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

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

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


server.listen(PORT, handleListen);