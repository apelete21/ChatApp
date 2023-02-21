const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = []

//   listen to a connection
io.on("connection", (socket) => {
    console.log("New connection", socket.id)
    // adding online users
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user => user.userId === userId)) &&

            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        io.emit("getOnlineUsers", onlineUsers)
    })
    // add messages
    socket.on("sendMessage", (message) => {
        const user = onlineUsers?.find(user => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }
    })

    // sending disconnected users
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers?.filter(user => {
            user?.socketId !== socket.id
        })
        io.emit("getOnlineUsers", onlineUsers)
    })
});

// starting socket server
io.listen(3000);