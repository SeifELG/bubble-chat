const path = require('path')
const http = require('http')
const express = require("express")
const socketio= require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'BOT'

// run when client connects
io.on('connection', socket => {
    console.log('New WS connection...')

    // when you first join
    socket.emit('systemMessage', 'Welcome to the chat!')

    // broadcast when user connects
    socket.broadcast.emit('systemMessage',  'Some one has joined the session')

    // when client disconnects
    socket.on('disconnect', ()=> {
        io.emit('systemMessage', 'user left the session')
    })

    // when someone sends a message
    socket.on('chatMessage', (message)=> {
        io.emit('message', {message, id:socket.id})
    })
})

app.get("/test", (req, res) => {
    res.send('hello world')
})

const PORT = 3001 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

