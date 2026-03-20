const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 2100;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data); 
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});