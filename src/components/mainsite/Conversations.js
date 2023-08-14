import React, { useState, useEffect } from 'react'
import { getMessages, sendMessage } from '../../api/MessagesApi'
import { miniApiUrl } from '../../api/ApiConfig'
import ActionCable from 'actioncable'

export default function Conversations({ otherUserId, token, currentUserId }) {
  const cable = ActionCable.createConsumer(`ws://${miniApiUrl}/cable`)
  const [ messageInput, setMessageInput ] = useState('')
  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    getMessages(otherUserId, token)
      .then((response) => response.json())
      .then(data => {
        setMessages(data)})

    const subscription = cable.subscriptions.create({
      channel: 'ConversationsChannel', convo_name: currentUserId
    },
    {
      received(data){
        console.log(data)
        setMessages(prevMessages => [...prevMessages, data]);
      }
    }
    ) 
    return () => {
      subscription.unsubscribe();
    };
  }, [otherUserId, currentUserId]);
  
  const handleMessageInput = (e) => {
    setMessageInput(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(messageInput, otherUserId, token)
    setMessageInput('')
  }

  return (
    
    <div >
      <div className='message-container'>
      {messages.map((message) => {
        return (
        <div 
          className={message.user_id === currentUserId ? 'sent-message' : 'received-message'}
          key={message.id}>
            <p className='message-content'>{message.content}</p>
            <p className='message-sender'>{message.user_id === currentUserId ? 'You': message.sender}</p>
        </div>)
      })}
      </div>
      {otherUserId === '0' ? null: 
      <form
      className='message-form'
        onSubmit={submitMessage}
      >
        <input type='text' className='input' 
        value = {messageInput}
        onChange={handleMessageInput}
        placeholder='Message...'
        />
        <button
        type='submit'
        className='message-submit'
        >Send</button>
      </form>}
    </div>
  )
}