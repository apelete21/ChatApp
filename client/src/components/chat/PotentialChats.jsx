import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext'

function PotentialChats() {

    const { potentialChats, createChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)

    return (
        <>
            <div className="all-users">
                {potentialChats && potentialChats.map((u, index) => {
                    return (
                        <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
                            {u.name}
                            <div className="user-online"></div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PotentialChats
