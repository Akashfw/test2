const express = require("express");
const socket= require("socket.io");
const http = require("http");
const app= express();
app.use(express.json())

const server= http.createServer(app);
const io= socket(server);
let score={
    run:45,
    over:4,
    wicket:1
}
app.get("/updateScore",(req,res)=>{
    // score=req.body
    res.send("score updated");
   
})

io.on("connection",(socket)=>{
    console.log("one user joined");
    socket.emit("scores",score)
})





const PORT= 8080
server.listen(PORT, ()=>{
    console.log("server is running on port",`${PORT}`)
})