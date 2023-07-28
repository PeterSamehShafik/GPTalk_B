import dotenv from 'dotenv'
dotenv.config({ path: ('./config/.env') })
import express from 'express'
import { appRouter } from './src/modules/index.router.js';
import { Server } from 'socket.io';


const app = express()
const port = process.env.PORT
appRouter(app);

const server = app.listen(port, () => console.log(`Server is running on port ${port}!`));
export const io = new Server(server, {
    cors: '*'
});

io.on('connection', (socket) => {

    socket.on("joinRoom", (data) => {
        socket.join(data)
    })

    socket.on("sendMessage", (data) => {
        socket.to(data).emit("displayChat", data)
    })

});