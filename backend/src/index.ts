const express = require('express');;
const bodyParser = require('body-parser');
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import { Request, Response } from "express"

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req: Request,res:Response)=>{
    res.json({"msg": "Welcome"})
})
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
// app.use('/post', postRoutes);


app.listen(PORT, ()=>{
    console.log('Server is running on port 3000');
})

//sadasd
//hello