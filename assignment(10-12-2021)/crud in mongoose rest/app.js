import express from 'express';

import connectDB from './db/connectdb.js';
import web from './routes/web.js';
const app = express()
const port = process.env.PORT || '3000'
const Database_URL = process.env.Database_URL || "mongodb://localhost:27017";
connectDB(Database_URL);

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.use("/student",web);
app.listen(port,()=>{
    console.log(`server listinning at http://localhost:${port}`)
})