import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipientUser'
import moment from "moment"

function ChatBox() {

    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext)

    const { recipientUser } = useFetchRecipientUser(currentChat, user)

    console.log("messages", messages)
    if (!recipientUser) {
        return (
            <b style={{ textAlign: "center", width: '100%' }}>No conversations selected yet...</b>
        )
    }

    if (isMessagesLoading) {
        return (
            <b style={{ textAlign: "center", width: '100%' }}>Loading Chat...</b>
        )
    }

    return (
        <Stack gap={4} className='chat-box'>
            <div className="chat-header">
                <strong> {recipientUser?.name} </strong>
            </div>
            <Stack gap={3} className='messages'>
                {messages && messages.map((message, index) => {return (
                    <Stack key={index} className={message?.senderId === user?._id ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0' }>
                        <span> {message.text} </span>
                        <span className='message-footer'> {moment(message.createdAt().calendar)} </span>
                    </Stack>
                )})}
            </Stack>
        </Stack>
    )
}

export default ChatBox
