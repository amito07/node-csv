import server from "./app.js";
import dotenv from 'dotenv';
import { sequelize } from "./Models/index.js";
import {Server} from 'socket.io';
import userModel from "./Models/userModel.js";
userModel.sync()

dotenv.config();

const PORT = process.env.PORT || 8080;
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection',(socket)=>{
    console.log("Socket id",socket.id)
})

sequelize.authenticate()
.then(()=>{
    console.log("Connection has been established successfully.");
    server.listen(PORT,()=>{
        console.log(`The server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error(`Unable to connect to the database `,err)
})