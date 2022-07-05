import http from "http"
import { Server } from "socket.io";
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


/*********************************************************
 * socket.io
 */
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});
instrument(wsServer, { auth: false });

wsServer.on('connection', (socket) => {
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  })

  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  })

  socket.on('answer', (answer, roonName) => {
    socket.to(roomName).emit('answer', answer);
  })
})

httpServer.listen(PORT, handleListen);