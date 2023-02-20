import React from 'react'
import { useContext } from 'react'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../components/chat/UserChat'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import PotentialChats from '../components/chat/PotentialChats'

function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext)

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null :
        <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='flex-grow-0'>
            <Stack className='messages-box flex-grow-0 pe-3'>
              {isUserChatsLoading && <p>Loading Chats</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <UserChat chat={chat} user={user} />
                  </div>
                )
              })}
            </Stack>
          </Stack>
          <p>Chatbox</p>
        </Stack>
      }
    </Container>
  )
}

export default Chat
