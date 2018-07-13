var express = require("express");
var http = require("http");
var cors = require("cors");
var static = require("serve-static");
var path = require("path");
var socketio = require("socket.io");

var app = express();

app.use(cors());
app.use("/public", static(path.join(__dirname, "public")));

app.get("/", function(request, response){
    response.end("Hello nodejs socketio");
});

/*
app.listen('10001', function(){
    console.log("10001서버 구동중");
});
*/
var server = http.createServer(app).listen(10001, function(){
    console.log("10001서버 구동중");
});

var io = socketio.listen(server);


//_peername - 설정정보

io.sockets.on("connection", function(socket){
    console.log("connection : ", socket.request.connection._peername);
    socket.remoteAddress = socket.request.connection._peername.port;
    socket.remotePort = socket.request.connection._peername.port;
});

