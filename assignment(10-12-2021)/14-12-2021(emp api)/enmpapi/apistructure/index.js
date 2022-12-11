const express = require('express');
const PORT = 8899;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const router = require('./routes/user.js')
app.use('/user', router);
const connectDB = require('./config/db')
connectDB();
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`working on port :${PORT}`)
})