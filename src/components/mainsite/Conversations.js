import React, { useState, useEffect, useRef } from 'react'
import { getMessages } from '../../api/MessagesApi'
import { miniApiUrl } from '../../api/ApiConfig'
import ActionCable from 'actioncable'

export default function Conversations({ otherUserId, token, currentUserId }) {
  const cable = ActionCable.createConsumer(`${miniApiUrl}/cable`)
  
  const [ messages, setMessages ] = useState([])

  const bottomDiv = useRef(null)

  useEffect(() => {
    // if(otherUserId !== '0'){
    getMessages(otherUserId, token)
      .then((response) => response.json())
      .then(data => {
        setMessages(data)})
      // }


    const subscription = cable.subscriptions.create({
      channel: 'ConversationsChannel', convo_name: currentUserId
    },
    {
      received(data){
        setMessages(prevMessages => [...prevMessages, data]);
      }
    }
    ) 
    return () => {
      subscription.unsubscribe();
    };
    
  }, [otherUserId, currentUserId]);

  const scrollToBottom = () => {
    bottomDiv?.current.scrollIntoView({ behavior: 'smooth' });

  }

  useEffect(() => {
    if(messages.length) scrollToBottom();
  }, [messages])

  return (
    
    <div>
      <div className='message-container'
      >
      {messages.map((message) => {
        return (
        <div
        ref={bottomDiv} 
          className={message.user_id === currentUserId ? 'sent-message' : 'received-message'}
          key={message.id}>
            <p className='message-content'>{message.content}</p>
            <p className='message-sender'>{message.user_id === currentUserId ? 'You': message.sender}</p>
        </div>)
      })}
      </div>
    </div>
  )
}