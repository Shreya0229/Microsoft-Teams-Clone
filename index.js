const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

app.use('/', (req, res) => {
    res.send({
      token: 'testlog'
    });
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send('Running my server');
});

io.on('connection', (socket)=>{
    socket.emit('me', socket.id);

    socket.on('disconnect', ()=>{
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({userToCall, signalData, from, name})=>{
        io.to(userToCall).emit("callUser", {signal: signalData, from, name});
    });

    socket.on("answerCall", (data)=>{
        io.to(data.to).emit("callAccepted", data.signal);
    }); 

    socket.on("message", (message) => {
        io.to( req.params.room).emit("createMessage", message, userName);
      });
}); 

server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));