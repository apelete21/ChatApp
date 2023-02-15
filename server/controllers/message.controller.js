const messageModel = require("../models/message.model")

// create a message

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body

    const message = new messageModel({
        chatId, senderId, text
    })

    try {

        const response = await message.save()

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get Messages

const getMessages = async (req, res) => {
    const {chatId} = req.params

    try {

        const messages = await messageModel.find({
            chatId
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

module.exports = { getMessages, createMessage }