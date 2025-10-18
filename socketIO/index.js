const express = require('express');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.emit('SERVER_SOCKET_ID', socket.id);

  socket.on("CLIENT_SEND_MSG", (msg) => {
    console.log("Message from client:", msg);

    // A gửi lên, chỉ A nhận được
    // Ví dụ: Tin nhắn lỗi, chỉ gửi lại cho người gửi
    // socket.emit("SERVER_RETURN_MSG", msg);

    // A gửi lên, cả A, B, C đều nhận được
    // Ví dụ: Tin nhắn chung, gửi cho tất cả mọi người
    // io.emit("SERVER_RETURN_MSG", msg);

    // A gửi lên, B, C nhận được, trừ A
    socket.broadcast.emit("SERVER_RETURN_MSG", msg);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});