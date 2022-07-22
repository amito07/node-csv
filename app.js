import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import userRouter from './Routers/userRouter.js';
import http from 'http';


const app = express();
app.use(bodyParser.json({limit:"100mb"}));
app.use(cors());
app.use(helmet());
const server = http.createServer(app)

app.use('/api/user',userRouter)


export default server;