import express from "express";
import {createServer} from "node:http"
import { Server } from "socket.io";
import {config} from "dotenv"
const app=express();
const server=createServer(app);
config({path:"./.env"})
const io=new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URI
    }
})

const PORT=process.env.PORT|| 5000
const ROOM='group'




io.on('connection',(socket)=>{
console.log("User is connected",socket.id)

socket.on('joinRoom',async (userName)=>{
console.log(`${userName} is Joining Group`)

await socket.join(ROOM)

// io.to(ROOM).emit('roomNotice',userName)
socket.to(ROOM).emit('roomNotice',userName)
})



socket.on('chatMessage',(msg)=>{
    socket.to(ROOM).emit('chatMessage',msg)
})

socket.on('typing',(userName)=>{
    socket.to(ROOM).emit('typing',userName)
})

socket.on('stopTyping',(userName)=>{
    socket.to(ROOM).emit('stopTyping',userName)
})

})



app.get("/",(req,res)=>{
    res.send(`<h1>Hello World</h1>`)
})

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})