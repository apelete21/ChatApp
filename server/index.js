// modules calling
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

// initialising api server
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
})

// Mongodb connection uri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connection estblished')
}).catch((error) => {
    console.log('Connection Failed: ' + error.message)
})

// Routes gestions
app.get('/', (req, res) => {
    res.send("Welcome to our chat application!")
})

// Router modules import
const userRoute = require("./routes/user.route")
const chatRoute = require("./routes/chat.route")
const messageRoutes = require("./routes/message.route")

// Using router imported modules
app.use('/api/users', userRoute)
app.use('/api/chats', chatRoute)
app.use("/api/messages", messageRoutes)
