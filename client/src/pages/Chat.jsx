import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'

function Chat() {
  const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext)

  console.log(userChats)

  return (
    <>
      Fucked Up Chat App
    </>
  )
}

export default Chat
